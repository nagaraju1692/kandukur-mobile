import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Review = {
  id: string
  businessId: string
  rating: number
  comment: string
  createdAt: string
}

type ReviewContextValue = {
  getReviewStats: (businessId: string) => { rating: number; count: number }
  getReviews: (businessId: string) => Review[]
  submitReview: (businessId: string, rating: number, comment: string) => Promise<void>
}

const ReviewContext = createContext<ReviewContextValue | undefined>(undefined)
const storageKey = 'mana-kandukur-mobile-reviews'

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((value) => {
      if (!value) return
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) setReviews(parsed)
      } catch {
        setReviews([])
      }
    }).catch(() => undefined)
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(reviews)).catch(() => undefined)
  }, [reviews])

  const getReviewStats = (businessId: string) => {
    const businessReviews = reviews.filter((review) => review.businessId === businessId)
    if (businessReviews.length === 0) return { rating: 0, count: 0 }
    const average = businessReviews.reduce((total, review) => total + review.rating, 0) / businessReviews.length
    return { rating: Number(average.toFixed(1)), count: businessReviews.length }
  }

  const getReviews = (businessId: string) => reviews.filter((review) => review.businessId === businessId)

  const submitReview = async (businessId: string, rating: number, comment: string) => {
    setReviews((current) => [...current, {
      id: `${businessId}-${Date.now()}`,
      businessId,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    }])
  }

  const value = useMemo(() => ({ getReviewStats, getReviews, submitReview }), [reviews])
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (!context) throw new Error('useReviews must be used within ReviewProvider')
  return context
}
