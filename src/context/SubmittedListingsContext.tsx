import React, { createContext, useContext, useMemo } from 'react'
import { fetchJson } from '../services/api'
import { Business, useDirectory } from './DirectoryContext'
import { useAuth } from './AuthContext'

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
  createdBy: string
  status: 'Pending review' | 'Sold out'
}

type SubmittedListingsValue = {
  listings: SubmittedListing[]
  addListing: (listing: Omit<SubmittedListing, 'id' | 'status'>) => Promise<void>
  markSoldOut: (listingId: string) => Promise<void>
}

const SubmittedListingsContext = createContext<SubmittedListingsValue | undefined>(undefined)

export function SubmittedListingsProvider({ children }: { children: React.ReactNode }) {
  const { businesses, refreshBusinesses } = useDirectory()
  const { user } = useAuth()
  const listings = businesses.filter((business) => business.submittedBy) as SubmittedListing[]

  const addListing = async (listing: Omit<SubmittedListing, 'id' | 'status'>) => {
    const document: SubmittedListing = { ...listing, id: `submitted-${Date.now()}`, status: 'Pending review' }
    await fetchJson<{ data: Business }>('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document),
    })
    await refreshBusinesses()
  }

  const markSoldOut = async (listingId: string) => {
    await fetchJson<{ data: Business }>(`/api/businesses/${encodeURIComponent(listingId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Sold out', updatedBy: user?.phone ?? null }),
    })
    await refreshBusinesses()
  }

  const value = useMemo(() => ({ listings, addListing, markSoldOut }), [listings])
  return <SubmittedListingsContext.Provider value={value}>{children}</SubmittedListingsContext.Provider>
}

export function useSubmittedListings() {
  const context = useContext(SubmittedListingsContext)
  if (!context) throw new Error('useSubmittedListings must be used within SubmittedListingsProvider')
  return context
}
