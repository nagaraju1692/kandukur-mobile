import React, { useEffect, useRef, useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import BottomNav from './BottomNav'
import { getBusinessImage } from '../utils/categoryImages'
import MobileHeader from './MobileHeader'
import { fetchGoldRate, fetchWeather, GoldRate, WeatherReport } from '../services/api'
import { businesses } from '../data/localData'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useReviews } from '../context/ReviewContext'
import { useNearby } from '../context/NearbyContext'

const cards = [
  { id: '1', name: 'Education' },
  { id: '2', name: 'Hospitals' },
  { id: '3', name: 'Medical shops' },
  { id: '4', name: 'Restaurants' },
  { id: '21', name: 'Real Estate' },
  { id: '22', name: 'Agriculture' },
  { id: '6', name: 'Lodges' },
  { id: '7', name: 'Bus stand' },
]

const categoryIcons: Record<string, string> = {
  Education: '🎓', Hospitals: '🏥', 'Medical shops': '💊', Restaurants: '🍽️', 'Real Estate': '🏘️', Agriculture: '🌾', Lodges: '🛏️', 'Bus stand': '🚌',
}

const updates = [
  { title: 'New movie at Raghava Multiplex', detail: 'Opening this Friday · Raghava Multiplex, Kandukur', description: 'Book your seats for the new Telugu movie releasing this Friday at Raghava Multiplex. Show timings and ticket availability will be updated by the theatre.', type: 'Movie', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80' },
  { title: 'New show at Yuvraj Theatre', detail: 'Coming soon · Yuvraj Theatre, Kandukur', description: 'A new show is coming soon to Yuvraj Theatre. Check back for show timings and ticket availability.', type: 'Movie', image: 'https://images.unsplash.com/photo-1503095396549-807530d5d4b7?auto=format&fit=crop&w=600&q=80' },
  { title: 'Fresh Mart opening soon', detail: 'Opening next week · Market Road, Kandukur', description: 'Fresh Mart is opening soon with daily essentials, groceries, and household supplies for families around Kandukur.', type: 'Shop', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' },
  { title: 'New Style Studio opening', detail: 'Opening this month · Pamuru Road, Kandukur', description: 'Style Studio will offer clothing, accessories, and seasonal collections from its new Pamuru Road location in Kandukur.', type: 'Shop', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
]

const fallbackWeather: WeatherReport = { temp: '31°C', condition: 'Overcast', humidity: '58% humidity', wind: '18 km/h wind', rainSoon: false, rainMinutes: null, updatedAt: '' }
const fallbackGold: GoldRate = { pricePerSavaram: 106814, updatedAt: '' }

function localPopularBusinesses() {
  return ['2', '4', '3'].flatMap((categoryId) => businesses
    .filter((business) => business.categoryId === categoryId)
    .sort((first, second) => Number(!first.address.toLowerCase().includes('kandukur')) - Number(!second.address.toLowerCase().includes('kandukur')))
    .slice(0, 2))
}

export default function Home({ navigation }: any) {
  const { favorites, toggleFavorite, isLoggedIn } = useAuth()
  const { getReviewStats } = useReviews()
  const { distances, ready, ensureAddresses, sortNearest } = useNearby()
  const { t, category: categoryLabel } = useLanguage()
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState<WeatherReport>(fallbackWeather)
  const [gold, setGold] = useState<GoldRate>(fallbackGold)
  const [popularBusinesses, setPopularBusinesses] = useState<any[]>(localPopularBusinesses)
  const [selectedInfo, setSelectedInfo] = useState<'weather' | 'gold' | null>(null)
  const [selectedUpdate, setSelectedUpdate] = useState<typeof updates[number] | null>(null)
  const announcementRailRef = useRef<ScrollView>(null)
  const { width } = useWindowDimensions()
  const isPhone = width < 600
  const horizontalPadding = isPhone ? 18 : 24
  const columns = width >= 480 ? 3 : 2
  const cardGap = 12
  const cardWidth = (width - horizontalPadding * 2 - cardGap * (columns - 1)) / columns

  useEffect(() => {
    fetchWeather().then(setWeather).catch(() => undefined)
    fetchGoldRate().then(setGold).catch(() => undefined)
  }, [])

  useEffect(() => { if (ready) ensureAddresses(popularBusinesses.map((business) => business.address)) }, [popularBusinesses.length, ready, ensureAddresses])

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />

      <ScrollView style={styles.contentWrap} contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('Search...', 'శోధించండి...')}
            placeholderTextColor="#5F6070"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => search.trim() && navigation.navigate('Search', { query: search.trim() })}
            underlineColorAndroid="transparent"
            selectionColor="#D35B50"
          />
        </View>

        <View style={styles.locationRow}><Text style={styles.locationPin}>📍</Text><Text style={styles.locationText}>{t('Kandukur, Andhra Pradesh', 'కందుకూరు, ఆంధ్రప్రదేశ్')}</Text></View>

        <View style={styles.infoRow}>
          <Pressable style={[styles.infoCard, styles.weatherCard]} onPress={() => setSelectedInfo('weather')}>
            <Text style={styles.infoLabel}>🌤️ WEATHER</Text>
            <Text style={styles.infoValue}>{weather.temp}</Text>
            <Text style={styles.infoText}>{weather.condition} · {weather.humidity}</Text>
            <Text style={styles.infoText}>{weather.wind}</Text>
          </Pressable>
          <Pressable style={styles.infoCard} onPress={() => setSelectedInfo('gold')}>
            <Text style={styles.infoLabel}>🥇 🥈 RATES</Text>
            <Text style={styles.infoValue}>Gold: ₹{gold.pricePerSavaram.toLocaleString('en-IN')} <Text style={styles.infoSmall}>/ savaram</Text></Text>
            <Text style={styles.infoText}><Text style={styles.silver}>Silver:</Text> ₹98,000 / kg · Kandukur</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{t('Latest in Kandukur', 'కందుకూరులో తాజా సమాచారం')}</Text><Text style={styles.updateCount}>{updates.length} {t('updates', 'అప్‌డేట్లు')}</Text></View>
        <View style={styles.announcementWrap}>
          <Pressable style={[styles.announcementArrow, styles.announcementArrowLeft]} onPress={() => announcementRailRef.current?.scrollTo({ x: 0, animated: true })}><Text style={styles.announcementArrowText}>‹</Text></Pressable>
          <ScrollView ref={announcementRailRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.updateRail}>
            {updates.map((update) => (
              <Pressable key={update.title} style={styles.updateCard} onPress={() => setSelectedUpdate(update)}>
                <Image source={{ uri: update.image }} style={styles.updateImage} resizeMode="cover" />
                <View style={styles.updateShade} />
                <View style={styles.updateCopy}><Text style={styles.updateTitle}>{update.title}</Text><Text style={styles.updateDetail}>{update.detail}</Text><Text style={styles.updateLocation}>Kandukur, Andhra Pradesh</Text></View>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={[styles.announcementArrow, styles.announcementArrowRight]} onPress={() => announcementRailRef.current?.scrollToEnd({ animated: true })}><Text style={styles.announcementArrowText}>›</Text></Pressable>
        </View>

        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{t('Explore Categories', 'వర్గాలను అన్వేషించండి')}</Text><Pressable onPress={() => navigation.navigate('Categories')}><Text style={styles.viewAll}>{t('View all', 'అన్నీ చూడండి')} →</Text></Pressable></View>

        <View style={styles.grid}>
          {cards.map((category) => (
            <Pressable
              key={category.id}
              style={[styles.card, { width: cardWidth }, isPhone && styles.phoneCard]}
              onPress={() => navigation.navigate('Businesses', { categoryId: category.id })}
            >
              <View style={styles.categoryIconBadge}><Text style={styles.categoryIcon}>{categoryIcons[category.name] || '📌'}</Text></View>

              <View style={styles.cardRow}>
                <Text style={[styles.cardName, isPhone && styles.phoneCardName]}>{categoryLabel(category.name)}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
              <Text style={styles.categoryCount}>{businesses.filter((business) => business.categoryId === category.id || (category.id === '1' && business.categoryId.startsWith('edu-'))).length} {t('Listings', 'లిస్టింగ్‌లు')}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{t('Popular Near You', 'మీకు సమీపంలోని ప్రసిద్ధ ప్రదేశాలు')}</Text><Pressable onPress={() => navigation.navigate('Businesses')}><Text style={styles.viewAll}>{t('View all', 'అన్నీ చూడండి')} →</Text></Pressable></View>
        <View style={styles.popularList}>
          {sortNearest(popularBusinesses).map((business) => {
            const isFavorite = favorites.includes(business.id)
            const reviewStats = getReviewStats(business.id)
            const imageSource = getBusinessImage(business.image, business.categoryName)
            return (
              <Pressable key={business.id} style={styles.businessCard} onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}>
                <View style={styles.businessImageWrap}>
                  <Image source={imageSource} style={styles.businessImage} resizeMode="cover" />
                  <View style={styles.openBadge}><Text style={styles.openText}>Open</Text></View>
                  <Pressable style={styles.favoriteBadge} onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}>
                    <Text style={[styles.favoriteText, isFavorite && styles.favoriteActive]}>{isFavorite ? '♥' : '♡'}</Text>
                  </Pressable>
                </View>
                <View style={styles.businessContent}>
                  <Text style={styles.businessName}>{business.name}</Text>
                  <View style={styles.businessMeta}><Text style={styles.businessCategory}>{categoryLabel(business.categoryName)}</Text><Text style={styles.trending}>{t('Trending', 'ట్రెండింగ్')}</Text></View>
                  <Text style={styles.rating}>⭐ {reviewStats.rating.toFixed(1)} <Text style={styles.reviewCount}>({reviewStats.count} reviews)</Text></Text>
                  <Text style={styles.businessAddress}>📍 {business.address}</Text><Text style={styles.businessDistance}>{distances[business.address] !== undefined ? `${distances[business.address].toFixed(1)} km away` : 'Finding distance…'}</Text>
                </View>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
      <Modal visible={selectedInfo !== null} transparent animationType="fade" onRequestClose={() => setSelectedInfo(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.detailModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalBadge}>{selectedInfo === 'weather' ? '🌤️ Weather details' : '🥇 Gold rate details'}</Text>
              <Pressable style={styles.modalClose} onPress={() => setSelectedInfo(null)}><Text style={styles.modalCloseText}>×</Text></Pressable>
            </View>
            {selectedInfo === 'weather' ? (
              <>
                <Text style={styles.modalTitle}>{weather.temp} · {weather.condition}</Text>
                <Text style={styles.modalLine}>humidity: {weather.humidity.replace(' humidity', '')}</Text>
                <Text style={styles.modalLine}>wind: {weather.wind.replace(' wind', '')}</Text>
                <Text style={styles.modalLine}>Updated: {weather.updatedAt ? new Date(weather.updatedAt).toLocaleString() : 'Just now'}</Text>
                <View style={styles.outlookBox}>
                  <Text style={styles.outlookTitle}>RAIN OUTLOOK</Text>
                  <Text style={styles.outlookText}>{weather.rainSoon ? `Rain expected in about ${weather.rainMinutes ?? 15} minutes.` : 'No rain expected in the next 15 minutes.'}</Text>
                </View>
                <Text style={styles.modalFooter}>Live Kandukur weather</Text>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>₹{gold.pricePerSavaram.toLocaleString('en-IN')} / savaram</Text>
                <Text style={styles.modalLine}>Gold rate for Kandukur</Text>
                <Text style={styles.modalLine}>Updated: {gold.updatedAt ? new Date(gold.updatedAt).toLocaleString() : 'Just now'}</Text>
                <Text style={styles.modalFooter}>Live market rate</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={selectedUpdate !== null} transparent animationType="fade" onRequestClose={() => setSelectedUpdate(null)}>
        <View style={styles.modalBackdrop}>
          {selectedUpdate && (
            <View style={styles.announcementModal}>
              <Image source={{ uri: selectedUpdate.image }} style={styles.announcementModalImage} resizeMode="cover" />
              <View style={styles.announcementModalBody}>
                <View style={styles.announcementModalTop}>
                  <Text style={styles.announcementType}>{selectedUpdate.type}</Text>
                  <Pressable style={styles.modalClose} onPress={() => setSelectedUpdate(null)}><Text style={styles.modalCloseText}>×</Text></Pressable>
                </View>
                <Text style={styles.announcementModalTitle}>{selectedUpdate.title}</Text>
                <Text style={styles.announcementModalDetail}>{selectedUpdate.detail}</Text>
                <Text style={styles.announcementModalDescription}>{selectedUpdate.description}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
      <BottomNav navigation={navigation} active="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E8E9F8',
  },
  header: {
    paddingTop: 26,
    paddingBottom: 28,
    paddingHorizontal: 20,
    backgroundColor: '#4A4AD5',
  },
  brand: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 46,
  },
  phoneBrand: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  tagline: {
    marginTop: 8,
    color: '#E0E0FF',
    fontSize: 23,
    fontWeight: '500',
    lineHeight: 32,
  },
  phoneTagline: {
    marginTop: 4,
    fontSize: 16,
    lineHeight: 22,
  },
  contentWrap: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 120,
  },
  searchBar: { flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingHorizontal: 16, borderRadius: 25, borderWidth: 1, borderColor: '#D9CFC7', backgroundColor: '#FFFDFB', shadowColor: '#2C2621', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  searchIcon: { marginRight: 10, fontSize: 18 },
  searchInput: { flex: 1, height: 42, paddingVertical: 0, paddingHorizontal: 0, borderWidth: 0, outlineWidth: 0, outlineStyle: 'solid', outlineColor: 'transparent', backgroundColor: 'transparent', color: '#2D2F43', fontSize: 15, fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 12 },
  locationPin: { marginRight: 8, fontSize: 15 },
  locationText: { color: '#3C3D4C', fontSize: 14, fontWeight: '600' },
  infoRow: { flexDirection: 'row', gap: 10 },
  infoCard: { flex: 1, minHeight: 111, padding: 12, borderRadius: 13, borderWidth: 1, borderColor: '#E6DED8', backgroundColor: '#FFFDFB' },
  weatherCard: { backgroundColor: '#F5F8FA' },
  infoLabel: { color: '#454653', fontSize: 12, fontWeight: '800', letterSpacing: 0.6 },
  infoValue: { marginTop: 8, color: '#252637', fontSize: 17, fontWeight: '800' },
  infoSmall: { fontSize: 10, fontWeight: '500' },
  infoText: { marginTop: 4, color: '#444755', fontSize: 11, lineHeight: 16 },
  modalBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: 'rgba(24, 24, 32, 0.56)' },
  detailModal: { width: '100%', maxWidth: 440, padding: 18, borderRadius: 22, backgroundColor: '#FFFDFB' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, overflow: 'hidden', color: '#42647D', backgroundColor: '#DDF0FA', fontSize: 12, fontWeight: '800' },
  modalClose: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: '#F3F0EB' },
  modalCloseText: { color: '#5C5A57', fontSize: 24, lineHeight: 26 },
  modalTitle: { marginTop: 24, color: '#302C2A', fontSize: 26, fontWeight: '800' },
  modalLine: { marginTop: 13, color: '#5F5B58', fontSize: 15 },
  outlookBox: { marginTop: 22, padding: 15, borderRadius: 17, borderWidth: 1, borderColor: '#CFD9C8', backgroundColor: '#EEF2EA' },
  outlookTitle: { color: '#4E6C4D', fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  outlookText: { marginTop: 10, color: '#4E6C4D', fontSize: 15, fontWeight: '700', lineHeight: 20 },
  modalFooter: { marginTop: 22, color: '#77716D', fontSize: 13 },
  announcementModal: { width: '100%', maxWidth: 480, overflow: 'hidden', borderRadius: 22, backgroundColor: '#FFFDFB' },
  announcementModalImage: { width: '100%', height: 220, backgroundColor: '#222' },
  announcementModalBody: { padding: 20 },
  announcementModalTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  announcementType: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, color: '#9A542D', backgroundColor: '#FFE5BE', fontSize: 12, fontWeight: '800' },
  announcementModalTitle: { marginTop: 16, color: '#302C2A', fontSize: 24, fontWeight: '800', lineHeight: 30 },
  announcementModalDetail: { marginTop: 7, color: '#D35B50', fontSize: 14, fontWeight: '800', lineHeight: 20 },
  announcementModalDescription: { marginTop: 16, color: '#5F5B58', fontSize: 15, lineHeight: 23 },
  silver: { color: '#5661B8', fontWeight: '800' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 12 },
  sectionTitle: { color: '#202332', fontSize: 20, fontWeight: '800' },
  updateCount: { color: '#414352', fontSize: 12, fontWeight: '700' },
  viewAll: { color: '#D35B50', fontSize: 13, fontWeight: '800' },
  updateRail: { gap: 12, paddingRight: 4 },
  announcementWrap: { position: 'relative' },
  announcementArrow: { position: 'absolute', top: 42, zIndex: 2, width: 30, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' },
  announcementArrowLeft: { left: -14 },
  announcementArrowRight: { right: -14 },
  announcementArrowText: { color: '#D35B50', fontSize: 29, lineHeight: 31 },
  updateCard: { width: 150, height: 126, overflow: 'hidden', borderRadius: 18, backgroundColor: '#222' },
  updateImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  updateShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  updateCopy: { flex: 1, justifyContent: 'flex-end', padding: 12 },
  updateTitle: { color: '#FFF', fontSize: 14, lineHeight: 17, fontWeight: '800' },
  updateDetail: { marginTop: 5, color: '#FFF', fontSize: 11 },
  updateLocation: { marginTop: 3, color: '#E6E6E6', fontSize: 10 },
  eyebrow: {
    color: '#2D2F43',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  phoneEyebrow: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  title: {
    marginTop: 8,
    color: '#1F2235',
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: -1.1,
    lineHeight: 54,
  },
  phoneTitle: {
    marginTop: 5,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
  },
  grid: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    minHeight: 166,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#F7F8FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDDFF5',
    justifyContent: 'space-between',
  },
  phoneCard: {
    minHeight: 170,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  categoryIconBadge: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#F8E8DE' },
  categoryIcon: { fontSize: 30, lineHeight: 34 },
  categoryCount: { marginTop: 5, color: '#5F606B', fontSize: 11, fontWeight: '600' },
  imageWrap: {
    height: 88,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E7E9FA',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardName: {
    color: '#1F2235',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 25,
    flex: 1,
  },
  popularList: { gap: 14, paddingBottom: 8 },
  businessCard: { overflow: 'hidden', borderRadius: 20, borderWidth: 1, borderColor: '#E7CFC5', backgroundColor: '#FFFDFB', shadowColor: '#8C5B4B', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  businessImageWrap: { height: 190, position: 'relative', backgroundColor: '#E7E9FA' },
  businessImage: { width: '100%', height: '100%' },
  openBadge: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, backgroundColor: 'rgba(93, 141, 81, 0.75)' },
  openText: { color: '#E8F5E3', fontSize: 11, fontWeight: '800' },
  favoriteBadge: { position: 'absolute', top: '50%', right: -1, width: 30, height: 42, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: '#FFFDFB' },
  favoriteText: { color: '#E4585D', fontSize: 23 },
  favoriteActive: { color: '#E34E5B' },
  businessContent: { padding: 14 },
  businessName: { color: '#2D2A2B', fontSize: 18, fontWeight: '800', lineHeight: 23 },
  businessMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 },
  businessCategory: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 13, color: '#C95E49', backgroundColor: '#FFF0E9', fontSize: 12, fontWeight: '800' },
  trending: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 13, color: '#BD694D', backgroundColor: '#FFF0E3', fontSize: 12, fontWeight: '800' },
  rating: { marginTop: 10, color: '#D89B00', fontSize: 14, fontWeight: '800' },
  reviewCount: { color: '#5E5A5A', fontWeight: '500' },
  businessAddress: { marginTop: 9, color: '#676263', fontSize: 13, lineHeight: 18 },
  businessDistance: { marginTop: 4, color: '#4D8052', fontSize: 11, fontWeight: '700' },
  phoneCardName: {
    fontSize: 16,
    lineHeight: 21,
  },
  arrow: {
    color: '#2B2A40',
    fontSize: 34,
    fontWeight: '400',
    lineHeight: 34,
    marginLeft: 12,
  },
})
