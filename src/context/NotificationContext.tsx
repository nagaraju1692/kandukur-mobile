import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  }, [announcements, dismissed])

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
