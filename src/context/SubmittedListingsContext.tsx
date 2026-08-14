import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type SubmittedListing = {
  id: string
  name: string
  categoryName: string
  categoryId: string
  address: string
  phone: string
  description: string
  website: string
  submittedBy: string
  status: 'Pending review' | 'Sold out'
}

type SubmittedListingsValue = {
  listings: SubmittedListing[]
  addListing: (listing: Omit<SubmittedListing, 'id' | 'status'>) => Promise<void>
  markSoldOut: (listingId: string) => Promise<void>
}

const SubmittedListingsContext = createContext<SubmittedListingsValue | undefined>(undefined)
const storageKey = 'mana-kandukur-mobile-submitted-listings'

export function SubmittedListingsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<SubmittedListing[]>([])

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((value) => {
      if (!value) return
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) setListings(parsed)
      } catch {
        setListings([])
      }
    }).catch(() => undefined)
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(listings)).catch(() => undefined)
  }, [listings])

  const addListing = async (listing: Omit<SubmittedListing, 'id' | 'status'>) => {
    setListings((current) => [...current, { ...listing, id: `submitted-${Date.now()}`, status: 'Pending review' }])
  }

  const markSoldOut = async (listingId: string) => {
    setListings((current) => current.map((listing) => listing.id === listingId ? { ...listing, status: 'Sold out' as const } : listing))
  }

  const value = useMemo(() => ({ listings, addListing, markSoldOut }), [listings])
  return <SubmittedListingsContext.Provider value={value}>{children}</SubmittedListingsContext.Provider>
}

export function useSubmittedListings() {
  const context = useContext(SubmittedListingsContext)
  if (!context) throw new Error('useSubmittedListings must be used within SubmittedListingsProvider')
  return context
}
