import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchGoldRate, fetchWeather } from '../services/api'
import { useDirectory } from './DirectoryContext'

export type MobileNotification = {
  id: string
  title: string
  message: string
  time: string
}

type NotificationContextValue = {
  notifications: MobileNotification[]
  clearNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)
const dismissedKey = 'mana-kandukur-mobile-dismissed-notifications'

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<MobileNotification[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])
  const { announcements } = useDirectory()

  useEffect(() => {
    let active = true
    AsyncStorage.getItem(dismissedKey).then((value) => {
      if (!active || !value) return
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) setDismissed(parsed)
      } catch {
        setDismissed([])
      }
    }).catch(() => undefined)
    return () => { active = false }
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(dismissedKey, JSON.stringify(dismissed)).catch(() => undefined)
  }, [dismissed])

  useEffect(() => {
    if (dismissed.length === 0) {
      setNotifications(announcements.map((announcement) => ({
        id: `announcement-${announcement.id}`,
        title: announcement.type === 'movie' ? 'New movie update' : 'New shop opening',
        message: `${announcement.title} · ${announcement.detail}.`,
        time: 'New',
      })))
    } else {
      setNotifications(announcements.filter((announcement) => !dismissed.includes(`announcement-${announcement.id}`)).map((announcement) => ({
        id: `announcement-${announcement.id}`,
        title: announcement.type === 'movie' ? 'New movie update' : 'New shop opening',
        message: `${announcement.title} · ${announcement.detail}.`,
        time: 'New',
      })))
    }
  }, [dismissed])

  useEffect(() => {
    let active = true
    const loadWeather = async () => {
      try {
        const weather = await fetchWeather()
        if (!active || !weather.rainSoon) return
        const today = new Date().toISOString().slice(0, 10)
        const id = `weather-rain-${today}`
        if (dismissed.includes(id)) return
        setNotifications((current) => current.some((item) => item.id === id) ? current : [...current, {
          id,
          title: 'Rain alert',
          message: `Rain may begin in about ${weather.rainMinutes ?? 15} minutes.`,
          time: 'Just now',
        }])
      } catch {
        // Keep existing notifications when weather is unavailable.
      }
    }
    loadWeather()
    const timer = setInterval(loadWeather, 120000)
    return () => { active = false; clearInterval(timer) }
  }, [dismissed])

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setTimeout>
    const loadGold = async () => {
      try {
        const gold = await fetchGoldRate()
        if (!active) return
        const today = new Date().toISOString().slice(0, 10)
        const id = `gold-${today}`
        if (dismissed.includes(id)) return
        setNotifications((current) => current.some((item) => item.id === id) ? current : [...current, {
          id,
          title: 'Gold rate update',
          message: `₹${gold.pricePerSavaram.toLocaleString('en-IN')} per savaram.`,
          time: 'Today, 7:00 AM',
        }])
      } catch {
        // Keep existing notifications when the market service is unavailable.
      }
    }
    const schedule = () => {
      const next = new Date()
      next.setHours(7, 0, 0, 0)
      if (next.getTime() <= Date.now()) {
        loadGold()
        next.setDate(next.getDate() + 1)
      }
      timer = setTimeout(() => { loadGold(); schedule() }, next.getTime() - Date.now())
    }
    schedule()
    return () => { active = false; clearTimeout(timer) }
  }, [dismissed])

  const clearNotifications = async () => {
    const ids = notifications.map((item) => item.id)
    setDismissed((current) => Array.from(new Set([...current, ...ids])))
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
