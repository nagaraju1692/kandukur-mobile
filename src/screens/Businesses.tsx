import React from 'react'
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { businesses, categories } from '../data/localData'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { getBusinessImage } from '../utils/categoryImages'

export default function Businesses({ navigation, route }: any) {
  const { t, category: categoryLabel } = useLanguage()
  const { favorites, toggleFavorite, isLoggedIn } = useAuth()
  const categoryId = route.params?.categoryId || null
  const category = categories.find(item => item.id === categoryId)
  const subcategoryIds = categoryId ? categories.filter(item => item.parentId === categoryId).map(item => item.id) : []
  const selectedBusinesses: any[] = businesses.filter(
    business => !categoryId || business.categoryId === categoryId || subcategoryIds.includes(business.categoryId),
  )

  if (category?.name === 'Education') {
    return (
      <View style={styles.container}>
        <MobileHeader navigation={navigation} />
        <View style={styles.subHeader}>
          <Pressable style={styles.headerBack} onPress={() => navigation.goBack()}><Text style={styles.headerBackText}>←</Text></Pressable>
          <Text style={styles.headerTitle}>{t('Education', 'విద్య')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {categories.filter(item => item.parentId === '1').map(item => (
            <Pressable
              key={item.id}
              style={styles.listRow}
              onPress={() => navigation.navigate('Businesses', { categoryId: item.id })}
            >
              <Text style={styles.listRowText}>{item.name}</Text>
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
        {selectedBusinesses.map((business) => (
          <Pressable
            key={business.id}
            style={styles.card}
            onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}
          >
            <View style={styles.cardMain}><View style={styles.businessImageWrap}><Image source={getBusinessImage(business.image, business.categoryName)} style={styles.businessImage} resizeMode="cover" /></View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}><Text style={styles.cardTitle}>{business.name}</Text><Pressable onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={styles.favorite}>{favorites.includes(business.id) ? '♥' : '♡'}</Text></Pressable><Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)}><Text style={styles.pin}>📍</Text></Pressable></View>
              <View style={styles.ratingRow}><Text style={styles.rating}>{business.rating || '4.0'}</Text><Text style={styles.stars}>★★★★★</Text><Text style={styles.reviews}>({business.reviews || 279})</Text><Text style={styles.typePill}>{categoryLabel(business.categoryName)}</Text></View>
              <Text style={styles.cardPhone}>{business.phone || 'N/A'}</Text>
              <Text style={styles.openStatus}>{t('Open · Closes 10 pm', 'తెరిచి ఉంది · రాత్రి 10కి మూసివేస్తుంది')}</Text>
              <Text style={styles.cardAddress}>{business.address}</Text>
              <Text style={styles.cardDescription} numberOfLines={3}>{business.description}</Text>
            </View></View>
            <View style={styles.cardActions}><Pressable style={styles.directionButton} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)}><Text style={styles.directionText}>{t('Directions', 'దిశలు')}</Text></Pressable><Pressable style={styles.websiteButton} onPress={() => business.website && business.website !== 'N/A' ? Linking.openURL(business.website) : Alert.alert(t('Website unavailable', 'వెబ్‌సైట్ అందుబాటులో లేదు'), t('This listing does not have a website.', 'ఈ లిస్టింగ్‌కు వెబ్‌సైట్ లేదు.'))}><Text style={styles.websiteText}>{t('Website', 'వెబ్‌సైట్')}</Text></Pressable></View>
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
    backgroundColor: '#EAEAF9',
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
  cardPhone: { marginTop: 5, color: '#636B82', fontSize: 11 },
  openStatus: { marginTop: 4, color: '#4D8052', fontSize: 11, fontWeight: '800' },
  cardAddress: {
    marginTop: 7,
    color: '#636B82',
    fontSize: 11,
    lineHeight: 16,
  },
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
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FF',
    borderWidth: 1,
    borderColor: '#DDE2F5',
  },
  listRowText: {
    color: '#1F2235',
    fontSize: 22,
    fontWeight: '800',
  },
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
