import React, { useState } from 'react'
import { Alert, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { businesses, categories } from '../data/localData'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { getBusinessImage } from '../utils/categoryImages'
import { useReviews } from '../context/ReviewContext'
import { useNearby } from '../context/NearbyContext'
import { useSubmittedListings } from '../context/SubmittedListingsContext'

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
  const { distances, ready, ensureAddresses, sortNearest } = useNearby()
  const { listings: submittedListings, markSoldOut } = useSubmittedListings()
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [propertyForm, setPropertyForm] = useState({ name: '', phone: '', type: 'Direct owner', gadhulu: '', face: '', location: '' })
  const categoryId = route.params?.categoryId || null
  const category = categories.find(item => item.id === categoryId)
  const subcategoryIds = categoryId ? categories.filter(item => item.parentId === categoryId).map(item => item.id) : []
  const allBusinesses: any[] = [...businesses, ...submittedListings]
  const selectedBusinesses: any[] = allBusinesses.filter(
    business => !categoryId || business.categoryId === categoryId || subcategoryIds.includes(business.categoryId),
  )
  const orderedBusinesses = sortNearest(selectedBusinesses)
  React.useEffect(() => { if (ready) ensureAddresses(selectedBusinesses.map((business) => business.address)) }, [selectedBusinesses.length, categoryId, ready])

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
          {category?.name === 'Real Estate' && <Pressable style={styles.sellPropertyButton} onPress={() => setShowPropertyForm(true)}><Text style={styles.sellPropertyIcon}>＋</Text><View><Text style={styles.sellPropertyTitle}>{t('Sell a property', 'ఆస్తిని అమ్మండి')}</Text><Text style={styles.sellPropertyCopy}>{t('Add plot, owner and location details', 'ప్లాట్, యజమాని మరియు ప్రదేశ వివరాలు జోడించండి')}</Text></View></Pressable>}
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
        <Modal visible={showPropertyForm} transparent animationType="slide" onRequestClose={() => setShowPropertyForm(false)}>
          <View style={styles.formBackdrop}><View style={styles.propertyForm}>
            <View style={styles.formHeader}><Text style={styles.formTitle}>{t('Sell a property', 'ఆస్తిని అమ్మండి')}</Text><Pressable onPress={() => setShowPropertyForm(false)}><Text style={styles.formClose}>×</Text></Pressable></View>
            {([
              ['name', t('Name', 'పేరు')], ['phone', t('Mobile number', 'మొబైల్ నంబర్')], ['location', t('Location', 'ప్రదేశం')], ['gadhulu', t('No. of gadhulu', 'గదుల సంఖ్య')], ['face', t('Plot face', 'ప్లాట్ ముఖదిశ')],
            ] as const).map(([field, label]) => <TextInput key={field} style={styles.formInput} placeholder={label} placeholderTextColor="#777" value={propertyForm[field]} onChangeText={(value) => setPropertyForm((current) => ({ ...current, [field]: value }))} />)}
            <Text style={styles.formLabel}>{t('Seller type', 'విక్రేత రకం')}</Text><View style={styles.typeOptions}>{(['Direct owner', 'Agent'] as const).map((type) => <Pressable key={type} style={[styles.typeOption, propertyForm.type === type && styles.typeOptionActive]} onPress={() => setPropertyForm((current) => ({ ...current, type }))}><Text style={styles.typeOptionText}>{t(type, type === 'Agent' ? 'ఏజెంట్' : 'ప్రత్యక్ష యజమాని')}</Text></Pressable>)}</View>
            <Pressable style={styles.formSubmit} onPress={() => { setShowPropertyForm(false); Alert.alert(t('Submitted', 'సమర్పించబడింది'), t('Your property will be reviewed before publishing.', 'ప్రచురించే ముందు మీ ఆస్తి వివరాలను పరిశీలిస్తాము.')) }}><Text style={styles.formSubmitText}>{t('Submit property', 'ఆస్తిని సమర్పించండి')}</Text></Pressable>
          </View></View>
        </Modal>
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
              <Text style={[styles.openStatus, business.status === 'Sold out' && styles.soldOutStatus]}>{business.status === 'Sold out' ? t('Sold out', 'అమ్ముడైంది') : business.status === 'Pending review' ? t('Pending review', 'సమీక్షలో ఉంది') : t('Open · Closes 10 pm', 'తెరిచి ఉంది · రాత్రి 10కి మూసివేస్తుంది')}</Text>
              <Text style={styles.cardAddress}>{business.address}</Text>
              <Text style={styles.cardDistance}>{distances[business.address] !== undefined ? `📍 ${distances[business.address].toFixed(1)} km away` : '📍 Finding distance…'}</Text>
              <Text style={styles.cardDescription} numberOfLines={3}>{business.description}</Text>
            </View></View>
            <View style={styles.cardActions}><Pressable style={styles.directionButton} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)}><Text style={styles.directionText}>{t('Directions', 'దిశలు')}</Text></Pressable><Pressable style={styles.websiteButton} onPress={() => business.website && business.website !== 'N/A' ? Linking.openURL(business.website) : Alert.alert(t('Website unavailable', 'వెబ్‌సైట్ అందుబాటులో లేదు'), t('This listing does not have a website.', 'ఈ లిస్టింగ్‌కు వెబ్‌సైట్ లేదు.'))}><Text style={styles.websiteText}>{t('Website', 'వెబ్‌సైట్')}</Text></Pressable>{business.submittedBy === user?.name && business.status !== 'Sold out' && <Pressable style={styles.soldOutButton} onPress={() => markSoldOut(business.id)}><Text style={styles.soldOutText}>{t('Mark sold out', 'అమ్ముడైనట్లు గుర్తించండి')}</Text></Pressable>}</View>
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
  sellPropertyButton: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 14, borderRadius: 14, borderWidth: 1, borderColor: '#E5B8A8', backgroundColor: '#FFF2EA' },
  sellPropertyIcon: { width: 38, height: 38, marginRight: 12, borderRadius: 19, color: '#C95E49', backgroundColor: '#FFE1D1', fontSize: 25, lineHeight: 36, textAlign: 'center' },
  sellPropertyTitle: { color: '#A84F3E', fontSize: 16, fontWeight: '800' },
  sellPropertyCopy: { marginTop: 3, color: '#75615B', fontSize: 11 },
  formBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(25,24,25,0.58)' },
  propertyForm: { padding: 20, borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: '#FFFDFB' },
  formHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  formTitle: { color: '#302C2A', fontSize: 21, fontWeight: '800' },
  formClose: { color: '#5C5A57', fontSize: 28 },
  formInput: { minHeight: 44, marginTop: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', color: '#302C2A', backgroundColor: '#FFFCFA' },
  formLabel: { marginTop: 14, color: '#5C554F', fontSize: 12, fontWeight: '800' },
  typeOptions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  typeOption: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1' },
  typeOptionActive: { borderColor: '#D35B50', backgroundColor: '#FFF0E9' },
  typeOptionText: { color: '#5C554F', fontSize: 12, fontWeight: '700' },
  formSubmit: { marginTop: 18, alignItems: 'center', paddingVertical: 13, borderRadius: 8, backgroundColor: '#514BD5' },
  formSubmitText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
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
    paddingHorizontal: 16,
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
