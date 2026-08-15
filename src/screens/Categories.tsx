import React, { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import BottomNav from './BottomNav'
import getCategoryImage from '../utils/categoryImages'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'
import { useDirectory } from '../context/DirectoryContext'
import { useAuth } from '../context/AuthContext'
import DirectoryState from './DirectoryState'
import { colors } from '../ui/theme'

const icons: Record<string, string> = {
  Education: '🎓', Hospitals: '✚', 'Medical shops': '✦', Restaurants: '⌂',
  Lodges: '▣', 'Bus stand': '▤', 'Police station': '⌁', Temples: '◉',
  Banks: '₹', 'Movie Theaters': '▶', 'Shopping clothes': '◈', 'Retail marts': '▦',
  'Beauty clinics': '✧', 'RealEstate': '▣', 'Agricultural info': '🌾',
  'Real Estate': '🏘️', Agriculture: '🌾', 'Food & Meat Markets': '🥬', 'Rental Transport': '🚚',
  'Tourist Places': '🗺️', 'Rental Houses': '🏠', 'Construction Materials': '🧱', 'Government Offices': '🏛️',
  'Cold Storages': '❄️', 'Manpower Services': '🛠️', 'Show Rooms': '🏬', 'Bike & Car Mechanics': '🔧',
  'Plots for Sale': '📐', 'Property Agents': '🤝', 'Tobacco Boards': '🌿', 'Vegetable Markets': '🥕',
  'Fish Markets': '🐟', 'Fruit Markets': '🍎', 'Mutton Shops': '🍖', 'Chicken Shops': '🍗', 'Sweet Shops': '🍬',
  'Cars for Rent': '🚗', 'Autos for Rent': '🛺', 'Lorries for Rent': '🚛', 'Tractors for Rent': '🚜', 'JCBs for Rent': '🏗️',
  'Rallapadu Reservoir': '🌊', Malakonda: '⛰️', Swagameswaram: '🛕', Sand: '⛱️', Kankara: '🪨', Cement: '🏗️', Bricks: '🧱',
  'MRO Office': '🏢', 'Municipality Office': '🏛️', 'Registration Office': '📄', Mestri: '👷',
  'Training Institutions': '🎓', 'Computer Training': '💻', 'Spoken English': '🗣️', 'Driving Schools': '🚗', 'Skill Development': '🧰',
  Plumber: '🔧', Electricians: '⚡', 'Tiles Work': '◼️', 'False Ceiling': '🏠', 'Bore Points': '💧', 'Bike Show Rooms': '🏍️',
  'Car Show Rooms': '🚘', 'Vehicle Wash': '🚿',
}

const categoryPriority = [
  'Education', 'Hospitals', 'Medical shops', 'Restaurants', 'Real Estate', 'Agriculture',
  'Food & Meat Markets', 'Rental Transport', 'Rental Houses', 'Construction Materials',
  'Training Institutions', 'Government Offices', 'Manpower Services', 'Show Rooms',
  'Bike & Car Mechanics', 'Tourist Places', 'Cold Storages', 'Lodges', 'Bus stand',
  'Police station', 'Temples', 'Banks', 'Beauty clinics', 'Movie Theaters', 'Shopping clothes',
  'Retail marts', 'Wine shops', 'Jewellery shops',
]

function CategoryThumbnail({ name }: { name: string }) {
  const [source, setSource] = useState(getCategoryImage(name))
  const fallback = getCategoryImage()
  return <Image source={{ uri: source }} style={styles.image} resizeMode="cover" onError={() => source !== fallback && setSource(fallback)} />
}

export default function Categories({ navigation }: any) {
  const { t, category: categoryLabel } = useLanguage()
  const { categories, businesses, loading, error, retry } = useDirectory()
  const { favorites } = useAuth()
  const [listingFilter, setListingFilter] = useState<'all' | 'withListings' | 'empty' | 'favorites'>('all')
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const rootCategories = categories
    .filter(category => {
      if (category.parentId) return false
      const childIds = categories.filter((child) => child.parentId === category.id).map((child) => child.id)
      const categoryBusinesses = businesses.filter((business) => business.categoryId === category.id || childIds.includes(business.categoryId))
      if (listingFilter === 'favorites') return categoryBusinesses.some((business) => favorites.includes(business.id))
      return listingFilter === 'all' || (listingFilter === 'withListings' ? categoryBusinesses.length > 0 : categoryBusinesses.length === 0)
    })
    .sort((first, second) => categoryPriority.indexOf(first.name) - categoryPriority.indexOf(second.name))

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />
      <View style={styles.pageHeader}>
        <Pressable style={styles.pageBack} onPress={() => navigation.goBack()}><Text style={styles.pageBackText}>←</Text></Pressable>
        <View style={styles.pageHeaderCopy}>
          <Text style={styles.pageKicker}>{t('CATEGORIES', 'వర్గాలు')}</Text>
          <Text style={styles.pageTitle}>{t('Categories', 'వర్గాలు')}</Text>
        </View>
        <Pressable style={styles.filterButton} onPress={() => setShowFilterOptions(true)} accessibilityLabel={t('Filter categories', 'Filter categories')}>
          <Text style={styles.filterButtonText}>≡</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DirectoryState loading={loading} error={error} onRetry={retry} />
        <View style={styles.list}>
          {rootCategories.map((category) => {
            const childIds = categories.filter((child) => child.parentId === category.id).map((child) => child.id)
            const count = businesses.filter((business) => business.categoryId === category.id || childIds.includes(business.categoryId)).length

            return (
              <Pressable
                key={category.id}
                style={styles.card}
                onPress={() => navigation.navigate('Businesses', { categoryId: category.id })}
              >
                <View style={styles.categoryImageWrap}>
                  <CategoryThumbnail name={category.name} />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.name}>{categoryLabel(category.name)}</Text>
                  <Text style={styles.count}>{count} {t('Listings', 'లిస్టింగ్‌లు')}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
      <Modal visible={showFilterOptions} transparent animationType="fade" onRequestClose={() => setShowFilterOptions(false)}>
        <Pressable style={styles.filterOverlay} onPress={() => setShowFilterOptions(false)}>
          <View style={styles.filterMenu}>
            <Text style={styles.filterTitle}>{t('Filter categories', 'Filter categories')}</Text>
            {([
              ['all', t('All categories', 'All categories')],
              ['withListings', t('With listings', 'With listings')],
              ['favorites', t('Favorites', 'Favorites')],
              ['empty', t('Empty categories', 'Empty categories')],
            ] as const).map(([value, label]) => (
              <Pressable key={value} style={[styles.filterOption, listingFilter === value && styles.filterOptionActive]} onPress={() => { setListingFilter(value); setShowFilterOptions(false) }}>
                <Text style={[styles.filterOptionText, listingFilter === value && styles.filterOptionTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageHeader: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#EFEAFE',
  },
  pageBack: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: '#E1D9FF',
  },
  pageBackText: {
    color: '#4A4AD5',
    fontSize: 22,
    lineHeight: 24,
    textAlign: 'center',
  },
  pageHeaderCopy: {
    flex: 1,
  },
  filterButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#E1D9FF' },
  filterButtonText: { color: '#4A4AD5', fontSize: 23, fontWeight: '800', lineHeight: 25 },
  filterOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(24, 25, 43, 0.38)' },
  filterMenu: { padding: 18, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#FFF' },
  filterTitle: { marginBottom: 8, color: '#1F2235', fontSize: 16, fontWeight: '800' },
  filterOption: { minHeight: 46, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F1F6', paddingHorizontal: 8 },
  filterOptionActive: { backgroundColor: '#F0EEFF' },
  filterOptionText: { color: '#3E4355', fontSize: 14, fontWeight: '600' },
  filterOptionTextActive: { color: '#4F47B8', fontWeight: '800' },
  pageKicker: {
    color: '#5B52D1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pageTitle: {
    marginTop: 2,
    color: '#2F2F43',
    fontSize: 22,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 110,
  },
  list: { gap: 12 },
  card: {
    minHeight: 84,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
    borderRadius: 16,
    shadowColor: '#8C5B4B',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryImageWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E7E9FA',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EFE0D8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBody: { flex: 1,
  },
  name: {
    color: '#1F2235',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    flex: 1,
  },
  arrow: {
    color: '#2C2E3F',
    fontSize: 30,
    fontWeight: '400',
  },
  count: {
    marginTop: 4,
    color: '#6D7288',
    fontSize: 12,
    fontWeight: '700',
  },
})