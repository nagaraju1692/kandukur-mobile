import React, { useState } from 'react'
import { Alert, Image, Linking, Modal, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { getBusinessImage } from '../utils/categoryImages'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { useLanguage } from '../context/LanguageContext'
import { useReviews } from '../context/ReviewContext'
import { useNearby } from '../context/NearbyContext'
import { useDirectory } from '../context/DirectoryContext'
import DirectoryState from './DirectoryState'
import { colors } from '../ui/theme'
import { buildGoogleMapsDirectionsUrl } from '../services/api'

export default function BusinessDetails({ route, navigation }: any) {
  const { id } = route.params || {}
  const { businesses, loading, error, retry } = useDirectory()
  const business = businesses.find(item => item.id === id)
  const { favorites, toggleFavorite, isLoggedIn } = useAuth()
  const { t, category: categoryLabel } = useLanguage()
  const { getReviewStats, getReviews, submitReview, loading: reviewsLoading, error: reviewsError, retry: retryReviews } = useReviews()
  const { distances, ready, ensureAddresses, location } = useNearby()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [comment, setComment] = useState('')

  React.useEffect(() => {
    if (business && ready) ensureAddresses([{ id: business.id, address: business.address, latitude: business.latitude, longitude: business.longitude }])
  }, [business, ready, ensureAddresses])

  if (!business) return <View style={styles.empty}><DirectoryState loading={loading} error={error || 'Listing not found.'} onRetry={retry} /></View>

  const openMap = () => Linking.openURL(buildGoogleMapsDirectionsUrl({ latitude: business.latitude, longitude: business.longitude }, location ?? undefined))
  const share = () => Share.share({ title: business.name, message: `${business.name} - ${business.address}` })
  const openWebsite = () => business.website && business.website !== 'N/A' ? Linking.openURL(business.website) : Alert.alert(t('Website unavailable', 'వెబ్‌సైట్ అందుబాటులో లేదు'), t('This listing does not have a website.', 'ఈ లిస్టింగ్‌కు వెబ్‌సైట్ లేదు.'))
  const call = () => business.phone && business.phone !== 'N/A' ? Linking.openURL(`tel:${business.phone.replace(/\s/g, '')}`) : Alert.alert(t('Phone unavailable', 'ఫోన్ అందుబాటులో లేదు'), t('This listing does not have a verified phone number.', 'ఈ లిస్టింగ్‌కు ధృవీకరించిన ఫోన్ నంబర్ లేదు.'))
  const openWhatsApp = () => {
    const phone = business.phone?.replace(/\D/g, '')
    if (!phone) {
      Alert.alert(t('WhatsApp unavailable', 'వాట్స్అప్ అందుబాటులో లేదు'), t('This listing does not have a valid contact number.', 'ఈ లిస్టింగ్‌కు సరైన కాంటాక్ట్ నంబర్ లేదు.'))
      return
    }
    Linking.openURL(`https://wa.me/${phone}`)
  }
  const isFavorite = favorites.includes(business.id)
  const reviewStats = getReviewStats(business.id)
  const businessReviews = getReviews(business.id)
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
          <Text style={styles.ratingSummary}>{reviewStats.rating.toFixed(1)} ({reviewStats.count} reviews)</Text>
          <Text style={styles.distance}>{(distances[business.id] ?? distances[business.address]) !== undefined ? `${((distances[business.id] ?? distances[business.address]) as number).toFixed(1)} km from your location` : 'Calculating distance…'}</Text>
          <Text style={styles.description}>{business.description}</Text>
          <View style={styles.actions}><Pressable style={styles.secondary} onPress={call}><Text style={styles.actionIcon}>📞</Text><Text style={styles.secondaryText}>{t('Call', 'కాల్')}</Text></Pressable><Pressable style={styles.primary} onPress={openMap}><Text style={styles.actionIcon}>📍</Text><Text style={styles.primaryText}>{t('Directions', 'దిశలు')}</Text></Pressable><Pressable style={styles.secondary} onPress={share}><Text style={styles.actionIcon}>🔗</Text><Text style={styles.secondaryText}>{t('Share', 'షేర్')}</Text></Pressable><Pressable style={styles.secondary} onPress={openWhatsApp}><Text style={styles.actionIcon}>💬</Text><Text style={styles.secondaryText}>{t('WhatsApp', 'వాట్స్అప్')}</Text></Pressable><Pressable style={styles.secondary} onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={styles.actionIcon}>{isFavorite ? '♥' : '♡'}</Text><Text style={styles.secondaryText}>{isFavorite ? t('Saved', 'సేవ్ చేశారు') : t('Save', 'సేవ్')}</Text></Pressable></View>
          <View style={styles.info}><Text style={styles.infoLabel}>{t('ABOUT THIS PLACE', 'ఈ ప్రదేశం గురించి')}</Text><Text style={styles.infoText}>{business.description || t('Discover everything this business has to offer.', 'ఈ వ్యాపారం అందించే సేవలను తెలుసుకోండి.')}</Text><Text style={styles.infoLabel}>{t('CONTACT INFORMATION', 'సంప్రదింపు సమాచారం')}</Text><Text style={styles.infoText}>📞 {business.phone || t('Not available', 'అందుబాటులో లేదు')}</Text><Text style={styles.infoText}>📍 {business.address}</Text>{business.website && <Pressable onPress={openWebsite}><Text style={styles.websiteLink}>🌐 {business.website}</Text></Pressable>}</View>
          <View style={styles.sectionCard}><Text style={styles.infoLabel}>{t(`PHOTOS (${(business.gallery || []).length || 4})`, `ఫోటోలు (${(business.gallery || []).length || 4})`)}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>{(business.gallery || []).slice(0, 4).map((image: any, index: number) => <Image key={`${business.id}-${index}`} source={getBusinessImage(image, business.categoryName)} style={styles.galleryImage} resizeMode="cover" />)}</ScrollView></View>
          <Pressable style={styles.reviewButton} onPress={() => isLoggedIn ? setShowReviewForm(true) : navigation.navigate('Profile')}><Text style={styles.reviewButtonText}>{t('Write a Review', 'సమీక్ష రాయండి')}</Text></Pressable>
          <View style={styles.sectionCard}><Text style={styles.infoLabel}>{t('REVIEWS', 'సమీక్షలు')} ({businessReviews.length})</Text>{reviewsLoading ? <Text style={styles.noReviews}>{t('Loading reviews…', 'సమీక్షలు లోడ్ అవుతున్నాయి…')}</Text> : reviewsError ? <><Text style={styles.noReviews}>{t('Reviews could not be loaded.', 'సమీక్షలను లోడ్ చేయలేకపోయాము.')}</Text><Pressable onPress={retryReviews}><Text style={styles.websiteLink}>{t('Retry', 'మళ్లీ ప్రయత్నించండి')}</Text></Pressable></> : businessReviews.length === 0 ? <Text style={styles.noReviews}>{t('No reviews yet.', 'ఇంకా సమీక్షలు లేవు.')}</Text> : businessReviews.slice().reverse().map((review) => <View key={review.id} style={styles.reviewItem}><Text style={styles.reviewRating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>{review.comment ? <Text style={styles.reviewComment}>{review.comment}</Text> : null}<Text style={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</Text></View>)}</View>
        </View>
      </ScrollView>
      <Modal visible={showReviewForm} transparent animationType="fade" onRequestClose={() => setShowReviewForm(false)}>
        <View style={styles.reviewBackdrop}>
          <View style={styles.reviewModal}>
            <View style={styles.reviewHeading}><Text style={styles.reviewTitle}>{t('Write a Review', 'సమీక్ష రాయండి')}</Text><Pressable onPress={() => setShowReviewForm(false)}><Text style={styles.reviewClose}>×</Text></Pressable></View>
            <Text style={styles.reviewPrompt}>{t('Your rating', 'మీ రేటింగ్')}</Text>
            <View style={styles.ratingPicker}>{[1, 2, 3, 4, 5].map((rating) => <Pressable key={rating} onPress={() => setSelectedRating(rating)}><Text style={[styles.ratingStar, rating <= selectedRating && styles.ratingStarSelected]}>★</Text></Pressable>)}</View>
            <TextInput style={styles.commentInput} multiline placeholder={t('Write your review...', 'మీ సమీక్ష రాయండి...')} placeholderTextColor="#888" value={comment} onChangeText={setComment} />
            <Pressable style={[styles.submitReview, selectedRating === 0 && styles.submitReviewDisabled]} disabled={selectedRating === 0} onPress={async () => { await submitReview(business.id, selectedRating, comment); setSelectedRating(0); setComment(''); setShowReviewForm(false) }}><Text style={styles.submitReviewText}>{t('Submit review', 'సమీక్ష సమర్పించండి')}</Text></Pressable>
          </View>
        </View>
      </Modal>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  ratingSummary: { marginTop: 8, color: '#D89B00', fontSize: 13, fontWeight: '800' },
  distance: { marginTop: 7, color: '#4D8052', fontSize: 12, fontWeight: '700' },
  noReviews: { marginTop: 10, color: '#77716D', fontSize: 13 },
  reviewItem: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E7E2DE' },
  reviewRating: { color: '#E5A900', fontSize: 14, letterSpacing: 1 },
  reviewComment: { marginTop: 6, color: '#4F4B49', fontSize: 13, lineHeight: 19 },
  reviewDate: { marginTop: 5, color: '#8A827C', fontSize: 10 },
  reviewBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: 'rgba(25,24,25,0.58)' },
  reviewModal: { width: '100%', padding: 20, borderRadius: 20, backgroundColor: '#FFFDFB' },
  reviewHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewTitle: { color: '#302C2A', fontSize: 20, fontWeight: '800' },
  reviewClose: { color: '#555', fontSize: 26 },
  reviewPrompt: { marginTop: 20, color: '#555', fontSize: 13, fontWeight: '700' },
  ratingPicker: { flexDirection: 'row', gap: 10, marginTop: 8 },
  ratingStar: { color: '#D9D9D9', fontSize: 30 },
  ratingStarSelected: { color: '#E5A900' },
  commentInput: { minHeight: 90, marginTop: 18, padding: 12, borderRadius: 9, borderWidth: 1, borderColor: '#D9D9E5', color: '#333', textAlignVertical: 'top' },
  submitReview: { marginTop: 16, alignItems: 'center', paddingVertical: 12, borderRadius: 8, backgroundColor: '#514BD5' },
  submitReviewDisabled: { opacity: 0.45 },
  submitReviewText: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  container: { flexGrow: 1, paddingBottom: 100 }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 230, position: 'relative', backgroundColor: '#4A4AD5' }, heroImage: { width: '100%', height: '100%' }, heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(25, 25, 70, 0.25)' },
  backButton: { position: 'absolute', top: 18, left: 16, width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.92)' }, backButtonText: { color: '#25263A', fontSize: 30, lineHeight: 33, textAlign: 'center' },
  favoriteButton: { position: 'absolute', top: 18, right: 16, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)' }, favoriteButtonText: { color: '#E34E5B', fontSize: 23 },
  body: { padding: 20, backgroundColor: colors.background }, category: { color: '#5B55D9', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 7, color: '#2F2F41', fontSize: 25, fontWeight: '800', lineHeight: 31 }, description: { marginTop: 14, color: '#686879', fontSize: 14, lineHeight: 21 }, info: { marginTop: 16, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#DDE2F5', backgroundColor: '#F8F9FF' }, infoLabel: { marginTop: 8, color: '#858596', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, infoText: { marginTop: 5, color: '#3F3F50', fontSize: 13, lineHeight: 19 }, actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 22 }, primary: { flexBasis: '46%', flexGrow: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, backgroundColor: '#514BD5' }, primaryText: { color: '#FFF', fontSize: 13, fontWeight: '800' }, secondary: { flexBasis: '46%', flexGrow: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, borderWidth: 1, borderColor: '#DCDDEA', backgroundColor: '#F8F9FF' }, secondaryText: { color: '#514BD5', fontSize: 13, fontWeight: '800' }, actionIcon: { fontSize: 14, marginBottom: 2 }, websiteLink: { marginTop: 6, color: '#3D71D9', fontSize: 13 }, sectionCard: { marginTop: 16, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#DDE2F5', backgroundColor: '#F8F9FF' }, serviceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }, serviceTag: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14, color: '#514BD5', backgroundColor: '#E9E9FF', fontSize: 11, fontWeight: '700' }, gallery: { gap: 10, marginTop: 10 }, galleryImage: { width: 112, height: 84, borderRadius: 8 }, reviewButton: { marginTop: 20, marginBottom: 20, alignItems: 'center', paddingVertical: 13, borderRadius: 8, backgroundColor: '#514BD5' }, reviewButtonText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
})
