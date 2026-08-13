import React from 'react'
import { Alert, Image, Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native'
import { businesses } from '../data/localData'
import { useAuth } from '../context/AuthContext'
import { getBusinessImage } from '../utils/categoryImages'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'

export default function BusinessDetails({ route, navigation }: any) {
  const { id } = route.params || {}
  const business = businesses.find(item => item.id === id)
  const { favorites, toggleFavorite, isLoggedIn } = useAuth()
  const { t, category: categoryLabel } = useLanguage()

  if (!business) return <View style={styles.empty}><Text>Listing not found.</Text></View>

  const openMap = () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)
  const share = () => Share.share({ title: business.name, message: `${business.name} - ${business.address}` })
  const openWebsite = () => business.website && business.website !== 'N/A' ? Linking.openURL(business.website) : Alert.alert(t('Website unavailable', 'వెబ్‌సైట్ అందుబాటులో లేదు'), t('This listing does not have a website.', 'ఈ లిస్టింగ్‌కు వెబ్‌సైట్ లేదు.'))
  const call = () => business.phone && business.phone !== 'N/A' ? Linking.openURL(`tel:${business.phone.replace(/\s/g, '')}`) : Alert.alert(t('Phone unavailable', 'ఫోన్ అందుబాటులో లేదు'), t('This listing does not have a verified phone number.', 'ఈ లిస్టింగ్‌కు ధృవీకరించిన ఫోన్ నంబర్ లేదు.'))

  const isFavorite = favorites.includes(business.id)
  const imageSource = getBusinessImage(business.image, business.categoryName)

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroShade} />
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}><Text style={styles.backButtonText}>‹</Text></Pressable>
          <Pressable style={styles.favoriteButton} onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={styles.favoriteButtonText}>{isFavorite ? '♥' : '♡'}</Text></Pressable>
        </View>
        <View style={styles.body}>
          <Text style={styles.category}>{categoryLabel(business.categoryName)}</Text>
          <Text style={styles.title}>{business.name}</Text>
          <Text style={styles.description}>{business.description}</Text>
          <View style={styles.actions}><Pressable style={styles.secondary} onPress={call}><Text style={styles.actionIcon}>📞</Text><Text style={styles.secondaryText}>{t('Call', 'కాల్')}</Text></Pressable><Pressable style={styles.primary} onPress={openMap}><Text style={styles.actionIcon}>📍</Text><Text style={styles.primaryText}>{t('Directions', 'దిశలు')}</Text></Pressable><Pressable style={styles.secondary} onPress={share}><Text style={styles.actionIcon}>🔗</Text><Text style={styles.secondaryText}>{t('Share', 'షేర్')}</Text></Pressable><Pressable style={styles.secondary} onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={styles.actionIcon}>{isFavorite ? '♥' : '♡'}</Text><Text style={styles.secondaryText}>{isFavorite ? t('Saved', 'సేవ్ చేశారు') : t('Save', 'సేవ్')}</Text></Pressable></View>
          <View style={styles.info}><Text style={styles.infoLabel}>{t('ABOUT THIS PLACE', 'ఈ ప్రదేశం గురించి')}</Text><Text style={styles.infoText}>{business.description || t('Discover everything this business has to offer.', 'ఈ వ్యాపారం అందించే సేవలను తెలుసుకోండి.')}</Text><Text style={styles.infoLabel}>{t('CONTACT INFORMATION', 'సంప్రదింపు సమాచారం')}</Text><Text style={styles.infoText}>📞 {business.phone || t('Not available', 'అందుబాటులో లేదు')}</Text><Text style={styles.infoText}>📍 {business.address}</Text>{business.website && <Pressable onPress={openWebsite}><Text style={styles.websiteLink}>🌐 {business.website}</Text></Pressable>}</View>
          <View style={styles.sectionCard}><Text style={styles.infoLabel}>{t('POPULAR SERVICES', 'ప్రసిద్ధ సేవలు')}</Text><View style={styles.serviceRow}>{['General Services', 'Consultation', 'Support', 'Premium', 'Extended Hours'].map((service) => <Text key={service} style={styles.serviceTag}>{t(service, service)}</Text>)}</View></View>
          <View style={styles.sectionCard}><Text style={styles.infoLabel}>{t('HOURS', 'పని వేళలు')}</Text><Text style={styles.infoText}>Monday - Friday: 9:00 AM - 6:00 PM</Text><Text style={styles.infoText}>Saturday: 9:00 AM - 2:00 PM</Text><Text style={styles.infoText}>Sunday: Closed</Text></View>
          <View style={styles.sectionCard}><Text style={styles.infoLabel}>{t(`PHOTOS (${(business.gallery || []).length || 4})`, `ఫోటోలు (${(business.gallery || []).length || 4})`)}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>{(business.gallery || []).slice(0, 4).map((image: any, index: number) => <Image key={`${business.id}-${index}`} source={getBusinessImage(image, business.categoryName)} style={styles.galleryImage} resizeMode="cover" />)}</ScrollView></View>
          <Pressable style={styles.reviewButton} onPress={() => Alert.alert(t('Reviews', 'సమీక్షలు'), t('Review submission will be available soon.', 'సమీక్ష సమర్పణ త్వరలో అందుబాటులో ఉంటుంది.'))}><Text style={styles.reviewButtonText}>{t('Write a Review', 'సమీక్ష రాయండి')}</Text></Pressable>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EAEAF9' },
  container: { flexGrow: 1, paddingBottom: 100 }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 230, position: 'relative', backgroundColor: '#4A4AD5' }, heroImage: { width: '100%', height: '100%' }, heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(25, 25, 70, 0.25)' },
  backButton: { position: 'absolute', top: 18, left: 16, width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.92)' }, backButtonText: { color: '#25263A', fontSize: 30, lineHeight: 33, textAlign: 'center' },
  favoriteButton: { position: 'absolute', top: 18, right: 16, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)' }, favoriteButtonText: { color: '#E34E5B', fontSize: 23 },
  body: { padding: 20, backgroundColor: '#EAEAF9' }, category: { color: '#5B55D9', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 7, color: '#2F2F41', fontSize: 25, fontWeight: '800', lineHeight: 31 }, description: { marginTop: 14, color: '#686879', fontSize: 14, lineHeight: 21 }, info: { marginTop: 16, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#DDE2F5', backgroundColor: '#F8F9FF' }, infoLabel: { marginTop: 8, color: '#858596', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, infoText: { marginTop: 5, color: '#3F3F50', fontSize: 13, lineHeight: 19 }, actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 22 }, primary: { flexBasis: '46%', flexGrow: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, backgroundColor: '#514BD5' }, primaryText: { color: '#FFF', fontSize: 13, fontWeight: '800' }, secondary: { flexBasis: '46%', flexGrow: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, borderWidth: 1, borderColor: '#DCDDEA', backgroundColor: '#F8F9FF' }, secondaryText: { color: '#514BD5', fontSize: 13, fontWeight: '800' }, actionIcon: { fontSize: 14, marginBottom: 2 }, websiteLink: { marginTop: 6, color: '#3D71D9', fontSize: 13 }, sectionCard: { marginTop: 16, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#DDE2F5', backgroundColor: '#F8F9FF' }, serviceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }, serviceTag: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14, color: '#514BD5', backgroundColor: '#E9E9FF', fontSize: 11, fontWeight: '700' }, gallery: { gap: 10, marginTop: 10 }, galleryImage: { width: 112, height: 84, borderRadius: 8 }, reviewButton: { marginTop: 20, marginBottom: 20, alignItems: 'center', paddingVertical: 13, borderRadius: 8, backgroundColor: '#514BD5' }, reviewButtonText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
})
