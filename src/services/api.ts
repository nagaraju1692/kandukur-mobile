export type WeatherReport = {
  temp: string
  condition: string
  humidity: string
  wind: string
  updatedAt: string
  hourly: Array<{ time: string; temp: number; code: number }>
  daily: Array<{ date: string; max: number; min: number; code: number }>
}

export type GoldRate = {
  pricePerSavaram22K: number
  pricePerSavaram: number
  updatedAt: string
}

const weatherConditions: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Foggy', 48: 'Rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy rain showers', 95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with hail',
}

export async function fetchWeather(): Promise<WeatherReport> {
  const params = new URLSearchParams({
    latitude: '15.2154', longitude: '79.9072',
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    forecast_days: '7',
    temperature_unit: 'celsius', wind_speed_unit: 'kmh', timezone: 'Asia/Kolkata',
  })
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) throw new Error(`Weather request failed: ${response.status}`)
  const data = await response.json()
  return {
    temp: `${Math.round(data.current.temperature_2m)}°C`,
    condition: weatherConditions[data.current.weather_code] || 'Current conditions',
    humidity: `${Math.round(data.current.relative_humidity_2m)}% humidity`,
    wind: `${Math.round(data.current.wind_speed_10m)} km/h wind`,
    updatedAt: data.current.time,
    hourly: (data.hourly?.time || []).slice(0, 12).map((time: string, index: number) => ({ time, temp: Math.round(data.hourly.temperature_2m[index]), code: data.hourly.weather_code[index] })),
    daily: (data.daily?.time || []).map((date: string, index: number) => ({ date, max: Math.round(data.daily.temperature_2m_max[index]), min: Math.round(data.daily.temperature_2m_min[index]), code: data.daily.weather_code[index] })),
  }
}

export async function fetchGoldRate(): Promise<GoldRate> {
  const response = await fetch('https://api.gold-api.com/price/XAU/INR')
  if (!response.ok) throw new Error(`Gold rate request failed: ${response.status}`)
  const data = await response.json()
  const pricePerGram24K = Math.round(data.price / 31.1034768)
  const pricePerGram22K = Math.round(pricePerGram24K * 22 / 24)
  return {
    pricePerSavaram22K: pricePerGram22K * 8,
    pricePerSavaram: pricePerGram24K * 8,
    updatedAt: data.updatedAt,
  }
}

function fallbackCoordinatesByAddress(address: string): { latitude: number; longitude: number } | null {
  const normalized = address.toLowerCase()

  if (normalized.includes('trr government degree college') || normalized.includes('trr degree')) {
    return { latitude: 15.2084, longitude: 79.8982 }
  }

  if (normalized.includes('gayatri degree college') || normalized.includes('gayatri')) {
    return { latitude: 15.2278, longitude: 79.9186 }
  }

  return null
}

export async function geocodeAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
  const fallback = fallbackCoordinatesByAddress(address)
  if (!address || !address.trim()) return null

  try {
    const params = new URLSearchParams({ format: 'jsonv2', limit: '1', q: `${address}, Andhra Pradesh, India` })
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'ManaKandukurApp/1.0' },
    })
    if (!response.ok) return fallback
    const results = await response.json()
    if (!Array.isArray(results) || !results[0]) return fallback
    return { latitude: Number(results[0].lat), longitude: Number(results[0].lon) }
  } catch {
    return fallback
  }
}

export function buildGoogleMapsDirectionsUrl(
  destination: { latitude: number | null | undefined; longitude: number | null | undefined },
  origin?: { latitude: number; longitude: number } | null,
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling' = 'driving',
) {
  const destinationLatitude = Number(destination.latitude)
  const destinationLongitude = Number(destination.longitude)
  if (!Number.isFinite(destinationLatitude) || !Number.isFinite(destinationLongitude)) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kandukur Andhra Pradesh')}`
  }

  const originQuery = origin ? `${origin.latitude},${origin.longitude}` : ''
  const params = new URLSearchParams({ api: '1', destination: `${destinationLatitude},${destinationLongitude}`, travelmode: travelMode })
  if (originQuery) params.set('origin', originQuery)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL

if (!apiBaseUrl) {
  console.warn('EXPO_PUBLIC_API_URL is not configured. Directory data cannot be loaded.')
}

export async function fetchJson<T>(path: string, options?: RequestInit, userPhone?: string | null): Promise<T> {
  if (!apiBaseUrl) throw new Error('EXPO_PUBLIC_API_URL is not configured')
  const headers = new Headers(options?.headers)
  if (userPhone) headers.set('x-user-phone', userPhone)
  const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}${path}`, { ...options, headers })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export async function recordAppUsage(deviceId: string, userPhone?: string | null) {
  if (!apiBaseUrl) return
  try {
    await fetchJson<{ data: { id: string; deviceId: string; visitedAt: string } }>('/api/usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, userPhone: userPhone || null }),
    })
  } catch {
    // Ignore analytics failures so app does not break for anonymous usage tracking.
  }
}

export default fetchJson
