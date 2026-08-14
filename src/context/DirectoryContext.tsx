import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchJson } from '../services/api'

export type Category = { id: string; name: string; parentId: string | null }
export type Business = {
  id: string
  name: string
  categoryId: string
  categoryName: string
  address: string
  latitude?: number | null
  longitude?: number | null
  phone?: string
  website?: string
  description?: string
  image?: string
  gallery?: string[]
  status?: string
  submittedBy?: string
}
export type Announcement = {
  id: string
  title: string
  detail: string
  description: string
  type: string
  image: string
}

type DirectoryContextValue = {
  categories: Category[]
  businesses: Business[]
  announcements: Announcement[]
  loading: boolean
  error: string | null
  refreshBusinesses: () => Promise<void>
}

const DirectoryContext = createContext<DirectoryContextValue | undefined>(undefined)

export function DirectoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshBusinesses = async () => {
    const response = await fetchJson<{ data: Business[] }>('/api/businesses')
    setBusinesses(response.data)
  }

  useEffect(() => {
    let active = true
    Promise.all([
      fetchJson<{ data: Category[] }>('/api/categories'),
      fetchJson<{ data: Business[] }>('/api/businesses'),
      fetchJson<{ data: Announcement[] }>('/api/announcements'),
    ]).then(([categoryResponse, businessResponse, announcementResponse]) => {
      if (!active) return
      setCategories(categoryResponse.data)
      setBusinesses(businessResponse.data)
      setAnnouncements(announcementResponse.data)
    }).catch((requestError: Error) => {
      if (active) setError(requestError.message)
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [])

  const value = useMemo(() => ({ categories, businesses, announcements, loading, error, refreshBusinesses }), [categories, businesses, announcements, loading, error])
  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>
}

export function useDirectory() {
  const context = useContext(DirectoryContext)
  if (!context) throw new Error('useDirectory must be used within DirectoryProvider')
  return context
}