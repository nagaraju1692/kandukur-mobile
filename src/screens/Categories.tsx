import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { categories, businesses } from '../data/localData'
import BottomNav from './BottomNav'
import getCategoryImage from '../utils/categoryImages'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'

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
  const rootCategories = categories
    .filter(category => !category.parentId)
    .sort((first, second) => categoryPriority.indexOf(first.name) - categoryPriority.indexOf(second.name))

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E9EBF9',
  },
  header: {
    paddingTop: 28,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#4A4AD5',
  },
  kicker: {
    color: '#D7D9FF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 4,
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 110,
  },
  list: { gap: 12 },
  card: {
    minHeight: 84,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FF',
    borderWidth: 1,
    borderColor: '#DDE2F5',
    borderRadius: 12,
  },
  categoryImageWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E7E9FA',
    marginRight: 14,
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