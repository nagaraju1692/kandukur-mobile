import React, { useState } from 'react'
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { buildGoogleMapsDirectionsUrl } from '../services/api'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { getBusinessImage } from '../utils/categoryImages'
import { useReviews } from '../context/ReviewContext'
import { useNearby } from '../context/NearbyContext'
import { useSubmittedListings } from '../context/SubmittedListingsContext'
import { useDirectory } from '../context/DirectoryContext'
import DirectoryState from './DirectoryState'
import { colors } from '../ui/theme'

const subcategoryIcons: Record<string, string> = {
  'Plots for Sale': '📐', 'Property Agents': '🤝', 'Tobacco Boards': '🌿', 'Vegetable Markets': '🥕',
  'Fish Markets': '🐟', 'Fruit Markets': '🍎', 'Mutton Shops': '🍖', 'Chicken Shops': '🍗', 'Sweet Shops': '🍬',
  'Cars for Rent': '🚗', 'Autos for Rent': '🛺', 'Lorries for Rent': '🚛', 'Tractors for Rent': '🚜', 'JCBs for Rent': '🏗️',
  'Rallapadu Reservoir': '🌊', Malakonda: '⛰️', Swagameswaram: '🛕', Sand: '⛱️', Kankara: '🪨', Cement: '🏗️', Bricks: '🧱',
  'MRO Office': '🏢', 'Municipality Office': '🏛️', 'Registration Office': '📄', Mestri: '👷', Plumber: '🔧', Electricians: '⚡',
  'Tiles Work': '◼️', 'False Ceiling': '🏠', 'Bore Points': '💧', 'Bike Show Rooms': '🏍️', 'Car Show Rooms': '🚘', 'Vehicle Wash': '🚿',
  'Computer Training': '💻', 'Spoken English': '🗣️', 'Driving Schools': '🚗', 'Skill Development': '🧰',
}

export default function Businesses({ navigation, route }: any) {
  const { t, category: categoryLabel } = useLanguage()
  const { favorites, toggleFavorite, isLoggedIn, user } = useAuth()
  const { getReviewStats } = useReviews()
  const { distances, ready, ensureAddresses, sortNearest, location } = useNearby()
  const { markSoldOut } = useSubmittedListings()
  const { businesses, categories, loading, error, retry } = useDirectory()
  const [sortMode, setSortMode] = useState<'nearest' | 'rating' | 'newest'>('nearest')
  const [minRating, setMinRating] = useState(0)
  const [distanceFilter, setDistanceFilter] = useState(20)
  const categoryId = route.params?.categoryId || null
  const category = categories.find(item => item.id === categoryId)
  const subcategoryIds = categoryId ? categories.filter(item => item.parentId === categoryId).map(item => item.id) : []
  const allBusinesses: any[] = businesses
  const selectedBusinesses: any[] = allBusinesses.filter(
    business => !categoryId || business.categoryId === categoryId || subcategoryIds.includes(business.categoryId),
  )
  const filteredBusinesses = selectedBusinesses.filter((business) => {
    const reviewStats = getReviewStats(business.id)
    const distance = distances[business.id] ?? distances[business.address]
    const withinDistance = distance === undefined || distance <= distanceFilter
    const hasMinRating = reviewStats.rating >= minRating
    return withinDistance && hasMinRating
  })
  const orderedBusinesses = (() => {
    const cloned = filteredBusinesses.slice()
    if (sortMode === 'rating') {
      return cloned.sort((first, second) => {
        const firstRating = getReviewStats(first.id).rating
        const secondRating = getReviewStats(second.id).rating
        return secondRating - firstRating
      })
    }
    if (sortMode === 'newest') {
      return cloned.sort((first, second) => (second.id > first.id ? 1 : -1))
    }
    return sortNearest(cloned)
  })()
  React.useEffect(() => { if (ready) ensureAddresses(selectedBusinesses.map((business) => ({ id: business.id, address: business.address, latitude: business.latitude, longitude: business.longitude }))) }, [selectedBusinesses.length, categoryId, ready])

  const childCategories = categories.filter(item => item.parentId === categoryId)
  if (childCategories.length > 0) {
    return (
      <View style={styles.container}>
        <MobileHeader navigation={navigation} />
        <View style={styles.subHeader}>
          <Pressable style={styles.headerBack} onPress={() => navigation.goBack()}><Text style={styles.headerBackText}>←</Text></Pressable>
          <Text style={styles.headerTitle}>{categoryLabel(category?.name || t('Categories', 'వర్గాలు'))}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {childCategories.map(item => (
            <Pressable
              key={item.id}
              style={styles.listRow}
              onPress={() => navigation.navigate('Businesses', { categoryId: item.id })}
            >
              <View style={styles.subcategoryIcon}><Text style={styles.subcategoryIconText}>{subcategoryIcons[item.name] || '📌'}</Text></View>
              <View style={styles.subcategoryCopy}><Text style={styles.listRowText}>{categoryLabel(item.name)}</Text><Text style={styles.subcategoryCount}>{businesses.filter((business) => business.categoryId === item.id).length} {t('Listings', 'లిస్టింగ్‌లు')}</Text></View>
              <Text style={styles.listArrow}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
        <BottomNav navigation={navigation} active="Categories" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MobileHeader navigation={navigation} />
      <View style={styles.subHeader}>
        <Pressable style={styles.headerBack} onPress={() => navigation.goBack()}><Text style={styles.headerBackText}>←</Text></Pressable>
        <View style={styles.headerCopy}><Text style={styles.headerKicker}>{t('DIRECTORY', 'డైరెక్టరీ')}</Text><Text style={styles.headerTitle}>{categoryLabel(category?.name || t('All Listings', 'అన్ని లిస్టింగ్‌లు'))}</Text></View>
        <Text style={styles.headerCount}>{selectedBusinesses.length} {t('Listings', 'లిస్టింగ్‌లు')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <DirectoryState loading={loading} error={error} onRetry={retry} />
        <View style={styles.filterBar}>
          <View style={styles.filterChipRow}>
            {(['nearest', 'rating', 'newest'] as const).map((mode) => (
              <Pressable key={mode} style={[styles.filterChip, sortMode === mode && styles.filterChipActive]} onPress={() => setSortMode(mode)}>
                <Text style={[styles.filterChipText, sortMode === mode && styles.filterChipTextActive]}>{mode === 'nearest' ? t('Nearest', 'సమీపం') : mode === 'rating' ? t('Rating', 'రేటింగ్') : t('Newest', 'తాజా')}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>{t('Min rating', 'కనిష్ఠ రేటింగ్')}: {minRating.toFixed(1)}</Text>
            <TextInput value={String(minRating)} keyboardType="numeric" onChangeText={(value) => setMinRating(Math.min(5, Math.max(0, Number(value || 0))))} style={styles.sliderInput} />
          </View>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>{t('Distance limit', 'దూర పరిమితి')}: {distanceFilter} km</Text>
            <TextInput value={String(distanceFilter)} keyboardType="numeric" onChangeText={(value) => setDistanceFilter(Math.min(100, Math.max(1, Number(value || 1))))} style={styles.sliderInput} />
          </View>
        </View>
        {orderedBusinesses.map((business) => (
          <Pressable
            key={business.id}
            style={styles.card}
            onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}
          >
            <View style={styles.cardMain}><View style={styles.businessImageWrap}><Image source={getBusinessImage(business.image, business.categoryName)} style={styles.businessImage} resizeMode="cover" /></View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}><Text style={styles.cardTitle}>{business.name}</Text><Pressable onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={styles.favorite}>{favorites.includes(business.id) ? '♥' : '♡'}</Text></Pressable><Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)}><Text style={styles.pin}>📍</Text></Pressable></View>
              <View style={styles.ratingRow}><Text style={styles.rating}>{getReviewStats(business.id).rating.toFixed(1)}</Text><Text style={styles.stars}>★★★★★</Text><Text style={styles.reviews}>({getReviewStats(business.id).count})</Text><Text style={styles.typePill}>{categoryLabel(business.categoryName)}</Text></View>
              <Text style={styles.cardPhone}>{business.phone || 'N/A'}</Text>
              {business.status === 'Sold out' && <Text style={[styles.openStatus, styles.soldOutStatus]}>{t('Sold out', 'అమ్ముడైంది')}</Text>}
              <Text style={styles.cardAddress}>{business.address}</Text>
              <Text style={styles.cardDistance}>{(distances[business.id] ?? distances[business.address]) !== undefined ? `📍 ${((distances[business.id] ?? distances[business.address]) as number).toFixed(1)} km away` : '📍 Finding distance…'}</Text>
              <Text style={styles.cardDescription} numberOfLines={3}>{business.description}</Text>
            </View></View>
            <View style={styles.cardActions}><Pressable style={styles.directionButton} onPress={() => Linking.openURL(buildGoogleMapsDirectionsUrl({ latitude: business.latitude, longitude: business.longitude }, location ?? undefined))}><Text style={styles.directionText}>{t('Directions', 'దిశలు')}</Text></Pressable><Pressable style={styles.websiteButton} onPress={() => business.website && business.website !== 'N/A' ? Linking.openURL(business.website) : Alert.alert(t('Website unavailable', 'వెబ్‌సైట్ అందుబాటులో లేదు'), t('This listing does not have a website.', 'ఈ లిస్టింగ్‌కు వెబ్‌సైట్ లేదు.'))}><Text style={styles.websiteText}>{t('Website', 'వెబ్‌సైట్')}</Text></Pressable>{business.submittedBy === user?.phone && business.status !== 'Sold out' && <Pressable style={styles.soldOutButton} onPress={() => markSoldOut(business.id)}><Text style={styles.soldOutText}>{t('Mark sold out', 'అమ్ముడైనట్లు గుర్తించండి')}</Text></Pressable>}</View>
          </Pressable>
        ))}

        {selectedBusinesses.length === 0 && (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>{t('No listings available yet.', 'ఇంకా లిస్టింగ్‌లు అందుబాటులో లేవు.')}</Text>
          </View>
        )}
      </ScrollView>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  subHeader: { minHeight: 80, paddingHorizontal: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: '#4A4AD5' },
  headerBack: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.18)' },
  headerBackText: { color: '#FFF', fontSize: 24, lineHeight: 27, textAlign: 'center' },
  kicker: {
    color: '#D7D9FF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    color: '#FFF',
    marginTop: 0,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 46,
  },
  headerCopy: { flex: 1 },
  headerKicker: { color: '#D7D9FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerCount: { color: '#FFF', fontSize: 11, fontWeight: '800', marginLeft: 8 },
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 110,
  },
  card: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 14,
    backgroundColor: '#F7F8FF',
    borderWidth: 1,
    borderColor: '#DDE2F5',
  },
  cardMain: { flexDirection: 'row', alignItems: 'flex-start' },
  businessImageWrap: { width: 98, height: 98, borderRadius: 12, overflow: 'hidden', backgroundColor: '#E7E9FA', marginRight: 12 },
  businessImage: { width: '100%', height: '100%' },
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EEF0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardIcon: {
    color: '#2F2F44',
    fontSize: 25,
    fontWeight: '700',
  },
  cardBody: {
    flex: 1,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  cardTitle: {
    color: '#202332',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  cardMeta: {
    marginTop: 4,
    color: '#5D5EE8',
    fontSize: 14,
    fontWeight: '700',
  },
  favorite: { color: '#E4585D', fontSize: 22, marginLeft: 4 },
  pin: { fontSize: 17, marginLeft: 5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 7, gap: 4 },
  rating: { color: '#D89B00', fontSize: 12, fontWeight: '800' },
  stars: { color: '#D89B00', fontSize: 11 },
  reviews: { color: '#5E5A5A', fontSize: 11 },
  typePill: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 9, color: '#C95E49', backgroundColor: '#FFF0E9', fontSize: 9, fontWeight: '800' },
  filterBar: { marginBottom: 18, padding: 10, borderRadius: 12, backgroundColor: '#FFFDFB', borderWidth: 1, borderColor: '#E5E5F2' },
  filterChipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: '#F0F2FF', borderWidth: 1, borderColor: '#D9DDF8' },
  filterChipActive: { backgroundColor: '#514BD5', borderColor: '#514BD5' },
  filterChipText: { color: '#2F2F41', fontSize: 11, fontWeight: '800' },
  filterChipTextActive: { color: '#FFF' },
  sliderRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sliderLabel: { color: '#4F4F5F', fontSize: 12, fontWeight: '700' },
  sliderInput: { width: 80, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: '#DCE0F2', backgroundColor: '#F7F8FF', color: '#2D2F43', textAlign: 'center' },
  cardPhone: { marginTop: 5, color: '#636B82', fontSize: 11 },
  openStatus: { marginTop: 4, color: '#4D8052', fontSize: 11, fontWeight: '800' },
  soldOutStatus: { color: '#C4515B' },
  cardAddress: {
    marginTop: 7,
    color: '#636B82',
    fontSize: 11,
    lineHeight: 16,
  },
  cardDistance: { marginTop: 4, color: '#4D8052', fontSize: 11, fontWeight: '700' },
  cardDescription: { marginTop: 6, color: '#4F515F', fontSize: 11, lineHeight: 16 },
  cardArrow: {
    color: '#2A2B3A',
    fontSize: 32,
    fontWeight: '400',
    marginLeft: 8,
  },
  cardActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  directionButton: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9, borderWidth: 1, borderColor: '#B8D4FF', backgroundColor: '#F4F8FF' },
  directionText: { color: '#236CE8', fontSize: 13, fontWeight: '800' },
  websiteButton: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' },
  websiteText: { color: '#302C2A', fontSize: 13, fontWeight: '800' },
  soldOutButton: { flexBasis: '100%', alignItems: 'center', paddingVertical: 9, borderRadius: 9, backgroundColor: '#FFF0E9' },
  soldOutText: { color: '#C4515B', fontSize: 12, fontWeight: '800' },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FF',
    borderWidth: 1,
    borderColor: '#DDE2F5',
  },
  listRowText: {
    flex: 1,
    color: '#1F2235',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 23,
  },
  subcategoryIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginRight: 14, borderRadius: 14, backgroundColor: '#F8E8DE' },
  subcategoryIconText: { fontSize: 25 },
  subcategoryCopy: { flex: 1 },
  subcategoryCount: { marginTop: 4, color: '#6D7288', fontSize: 12, fontWeight: '700' },
  listArrow: {
    color: '#2A2B3A',
    fontSize: 30,
    fontWeight: '400',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#5B6279',
    fontSize: 16,
    fontWeight: '600',
  },
})
