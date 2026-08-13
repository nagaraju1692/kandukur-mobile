export type Announcement = {
  id: string
  type: 'movie' | 'shop'
  title: string
  date: string
}

export const announcements: Announcement[] = [
  { id: 'movie-raghava-premiere', type: 'movie', title: 'New movie at Raghava Multiplex', date: 'Opening this Friday' },
  { id: 'movie-yuvaraj-show', type: 'movie', title: 'New show at Yuvaraj Theatre', date: 'Coming soon' },
  { id: 'shop-fresh-mart', type: 'shop', title: 'Fresh Mart opening soon', date: 'Opening next week' },
  { id: 'shop-style-studio', type: 'shop', title: 'New Style Studio opening', date: 'Opening this month' },
]
