import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDirectory } from './DirectoryContext'
import { fetchWeather, WeatherReport } from '../services/api'

export type MobileNotification = {
  id: string
  title: string
  message: string
  time: string
  type: string
  announcementTitle: string
  detail: string
  description: string
  image?: string
}

type NotificationContextValue = {
  notifications: MobileNotification[]
  clearNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)
const dismissedKey = 'mana-kandukur-mobile-dismissed-notifications'
const clearedAtKey = 'mana-kandukur-mobile-notifications-cleared-at'
const rainCodes = new Set([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99])

function formatRainTime(time: string | Date) {
  return new Date(time).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
}

function createRainNotification(weather: WeatherReport): MobileNotification | null {
  const now = Date.now()
  const upcomingHours = weather.hourly
    .map((hour, index) => ({ hour, index }))
    .filter(({ hour }) => new Date(hour.time).getTime() >= now)
  const rainStartPosition = upcomingHours.findIndex(({ hour }) => rainCodes.has(hour.code))
  const rainStart = rainStartPosition < 0 ? -1 : upcomingHours[rainStartPosition].index
  if (rainStart < 0) return null

  let rainEnd = rainStart
  while (rainEnd + 1 < weather.hourly.length
    && new Date(weather.hourly[rainEnd + 1].time).getTime() >= now
    && rainCodes.has(weather.hourly[rainEnd + 1].code)) rainEnd += 1
  const start = weather.hourly[rainStart]
  const end = weather.hourly[rainEnd]
  const dateKey = start.time.slice(0, 10)
  const rainEndTime = new Date(new Date(end.time).getTime() + 60 * 60 * 1000)
  const timeRange = `${formatRainTime(start.time)} to ${formatRainTime(rainEndTime)}`

  return {
    id: `weather-rain-${dateKey}`,
    title: 'Rain alert',
    message: `Rain may occur in Kandukur between ${timeRange}.`,
    time: 'Weather alert',
    type: 'Weather',
    announcementTitle: 'Rain expected in Kandukur',
    detail: `Possible rain: ${timeRange}`,
    description: 'If you are going outside, carry an umbrella. Prefer a car when possible; if travelling by bike, use rain gear and ride carefully.',
    image: 'https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=80',
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<MobileNotification[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])
  const [dismissedLoaded, setDismissedLoaded] = useState(false)
  const [clearedAt, setClearedAt] = useState<number | null>(null)
  const [rainNotification, setRainNotification] = useState<MobileNotification | null>(null)
  const { announcements } = useDirectory()

  useEffect(() => {
    let active = true
    Promise.all([AsyncStorage.getItem(dismissedKey), AsyncStorage.getItem(clearedAtKey)]).then(([value, clearedValue]) => {
      if (!active) return
      try {
        const parsed = value ? JSON.parse(value) : []
        if (Array.isArray(parsed)) setDismissed(parsed)
      } catch {
        setDismissed([])
      } finally {
        const parsedClearedAt = clearedValue ? Number(clearedValue) : NaN
        if (Number.isFinite(parsedClearedAt)) setClearedAt(parsedClearedAt)
        if (active) setDismissedLoaded(true)
      }
    }).catch(() => {
      if (active) setDismissedLoaded(true)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!dismissedLoaded) return
    AsyncStorage.setItem(dismissedKey, JSON.stringify(dismissed)).catch(() => undefined)
  }, [dismissed, dismissedLoaded])

  useEffect(() => {
    let active = true
    const loadRainAlert = async () => {
      try {
        const weather = await fetchWeather()
        if (active) setRainNotification(createRainNotification(weather))
      } catch {
        if (active) setRainNotification(null)
      }
    }
    loadRainAlert()
    const refresh = setInterval(loadRainAlert, 5 * 60 * 1000)
    return () => {
      active = false
      clearInterval(refresh)
    }
  }, [])

  useEffect(() => {
    if (!dismissedLoaded) return
    const announcementNotifications = announcements.filter((announcement) => {
      if (dismissed.includes(`announcement-${announcement.id}`)) return false
      if (clearedAt === null || !announcement.createdAt) return true
      return new Date(announcement.createdAt).getTime() > clearedAt
    }).map((announcement) => ({
      id: `announcement-${announcement.id}`,
      title: announcement.title,
      message: `${announcement.detail}.`,
      time: 'New',
      type: announcement.type,
      announcementTitle: announcement.title,
      detail: announcement.detail,
      description: announcement.description,
      image: announcement.image,
    }))
    const weatherNotifications = rainNotification && !dismissed.includes(rainNotification.id) ? [rainNotification] : []
    setNotifications([...weatherNotifications, ...announcementNotifications])
  }, [announcements, clearedAt, dismissed, dismissedLoaded, rainNotification])

  const clearNotifications = async () => {
    const ids = notifications.map((item) => item.id)
    const clearedTimestamp = Date.now()
    setDismissed((current) => Array.from(new Set([...current, ...ids])))
    setClearedAt(clearedTimestamp)
    await AsyncStorage.setItem(clearedAtKey, String(clearedTimestamp)).catch(() => undefined)
    setNotifications([])
  }

  const value = useMemo(() => ({ notifications, clearNotifications }), [notifications])
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
