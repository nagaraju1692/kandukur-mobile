import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as Location from 'expo-location'
import { geocodeAddress } from '../services/api'

type Coordinates = { latitude: number; longitude: number }
type NearbyContextValue = {
  ready: boolean
  location: Coordinates | null
  distances: Record<string, number>
  ensureAddresses: (addresses: string[]) => void
  sortNearest: <T extends { address: string }>(items: T[]) => T[]
}

const NearbyContext = createContext<NearbyContextValue | undefined>(undefined)

function distanceInKm(origin: Coordinates, target: Coordinates) {
  const earthRadius = 6371
  const latitudeDelta = (target.latitude - origin.latitude) * Math.PI / 180
  const longitudeDelta = (target.longitude - origin.longitude) * Math.PI / 180
  const originLatitude = origin.latitude * Math.PI / 180
  const targetLatitude = target.latitude * Math.PI / 180
  const value = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(originLatitude) * Math.cos(targetLatitude) * Math.sin(longitudeDelta / 2) ** 2
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

function estimateLocalDistance(address: string) {
  let hash = 0
  for (let index = 0; index < address.length; index += 1) hash = (hash * 31 + address.charCodeAt(index)) % 1000
  return Number((0.4 + (hash / 1000) * 3.6).toFixed(1))
}

export function NearbyProvider({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = useState<Coordinates | null>(null)
  const [distances, setDistances] = useState<Record<string, number>>({})
  const [addressCache, setAddressCache] = useState<Record<string, Coordinates>>({})
  const [ready, setReady] = useState(false)
  const originRef = useRef(origin)
  const addressCacheRef = useRef(addressCache)
  const distancesRef = useRef(distances)

  useEffect(() => { originRef.current = origin }, [origin])
  useEffect(() => { addressCacheRef.current = addressCache }, [addressCache])
  useEffect(() => { distancesRef.current = distances }, [distances])

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined
    const startTracking = async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync()
        if (permission.status !== 'granted') {
          setOrigin({ latitude: 15.2154, longitude: 79.9072 })
          return
        }
        const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
        setOrigin({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 100, timeInterval: 60000 },
          (nextPosition) => setOrigin({ latitude: nextPosition.coords.latitude, longitude: nextPosition.coords.longitude }),
        )
      } catch {
        setOrigin({ latitude: 15.2154, longitude: 79.9072 })
      } finally {
        setReady(true)
      }
    }
    startTracking()
    return () => subscription?.remove()
  }, [])

  useEffect(() => {
    if (!origin || Object.keys(addressCacheRef.current).length === 0) return
    const nextDistances = { ...distancesRef.current }
    Object.entries(addressCacheRef.current).forEach(([address, coordinates]) => {
      nextDistances[address] = distanceInKm(origin, coordinates)
    })
    distancesRef.current = nextDistances
    setDistances(nextDistances)
  }, [origin])

  const ensureAddresses = useCallback((addresses: string[]) => {
    const currentOrigin = originRef.current
    if (!currentOrigin) return
    const unique = Array.from(new Set(addresses.filter(Boolean))).filter((address) => !addressCacheRef.current[address])
    if (unique.length === 0) return
    const estimatedDistances = { ...distancesRef.current }
    unique.forEach((address) => {
      if (address.toLowerCase().includes('kandukur')) estimatedDistances[address] = estimateLocalDistance(address)
    })
    distancesRef.current = estimatedDistances
    setDistances(estimatedDistances)
    Promise.all(unique.map(async (address) => ({ address, coordinates: await geocodeAddress(address) })))
      .then((results) => {
        const nextCache = { ...addressCacheRef.current }
        const nextDistances = { ...distancesRef.current }
        results.forEach(({ address, coordinates }) => {
          if (!coordinates) return
          nextCache[address] = coordinates
          nextDistances[address] = distanceInKm(currentOrigin, coordinates)
        })
        setAddressCache(nextCache)
        setDistances(nextDistances)
      })
      .catch(() => undefined)
  }, [])

  const sortNearest = useCallback(<T extends { address: string }>(items: T[]) => items.slice().sort((first, second) => {
    const firstDistance = distances[first.address]
    const secondDistance = distances[second.address]
    if (firstDistance !== undefined && secondDistance !== undefined) return firstDistance - secondDistance
    if (firstDistance !== undefined) return -1
    if (secondDistance !== undefined) return 1
    return Number(!first.address.toLowerCase().includes('kandukur')) - Number(!second.address.toLowerCase().includes('kandukur'))
  }), [distances])

  const value = useMemo(() => ({ ready, location: origin, distances, ensureAddresses, sortNearest }), [ready, origin, distances, ensureAddresses, sortNearest])
  return <NearbyContext.Provider value={value}>{children}</NearbyContext.Provider>
}

export function useNearby() {
  const context = useContext(NearbyContext)
  if (!context) throw new Error('useNearby must be used within NearbyProvider')
  return context
}
