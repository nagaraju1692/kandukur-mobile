import { businesses, categories } from '../data/localData'

export async function fetchJson(path: string) {
  const url = new URL(path, 'http://localhost')
  const pathname = url.pathname

  if (pathname === '/api/categories') {
    return { data: categories }
  }

  if (pathname === '/api/businesses') {
    const categoryId = url.searchParams.get('categoryId')
    const filtered = categoryId
      ? (() => {
          const category = categories.find(c => c.id === categoryId)
          if (category?.name === 'Education') {
            const educationIds = categories.filter(c => c.parentId === categoryId).map(c => c.id)
            return businesses.filter(b => b.categoryId === categoryId || educationIds.includes(b.categoryId))
          }
          return businesses.filter(b => b.categoryId === categoryId)
        })()
      : businesses
    return { data: filtered }
  }

  if (pathname.startsWith('/api/businesses/')) {
    const id = pathname.replace('/api/businesses/', '')
    const business = businesses.find(b => b.id === id) || null
    return { data: business }
  }

  return { data: null }
}

export default fetchJson
