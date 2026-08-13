const images: Record<string, string> = {
  'Hospitals': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
  'Medical shops': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
  'Restaurants': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'Food Hotels': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Engineering colleges': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  'Degree colleges': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'Polytechnic colleges': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'Schools': 'https://images.unsplash.com/photo-1517486808906-6ca8b3d0b8df?auto=format&fit=crop&w=1200&q=80',
  'Lodges': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'Bus stand': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  'Police station': 'https://images.unsplash.com/photo-1526481280698-9e25f9dbea8b?auto=format&fit=crop&w=1200&q=80',
  'Theaters': 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80',
  'Movie Theaters': 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80',
  'Banks': 'https://images.unsplash.com/photo-1522204502412-6f0f0a8d2d3b?auto=format&fit=crop&w=1200&q=80',
  'Beauty clinics': 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  'Shopping clothes': 'https://images.unsplash.com/photo-1520975912126-9ba1e9a0b7f1?auto=format&fit=crop&w=1200&q=80',
  'Retail marts': 'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1200&q=80',
  'Wine shops': 'https://images.unsplash.com/photo-1547592166-4b6f2b7c0d8b?auto=format&fit=crop&w=1200&q=80',
  'Jewellery shops': 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
  'RealEstate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  'ATM machines': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  'Agricultural info': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  'Tobacoco Boards': 'https://images.unsplash.com/photo-1523742810-6d6a13f3f6a5?auto=format&fit=crop&w=1200&q=80',
  'Vegitable Market': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  'Fish Market': 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80',
}

const defaultImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'

export function getCategoryImage(categoryName?: string) {
  if (!categoryName) return defaultImage
  return images[categoryName] || defaultImage
}

export function getBusinessImage(image: unknown, categoryName?: string) {
  if (typeof image === 'number') return image
  if (typeof image === 'string' && image.startsWith('http')) return { uri: image }
  return { uri: getCategoryImage(categoryName) }
}

export default getCategoryImage
