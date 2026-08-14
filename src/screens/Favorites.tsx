import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import BottomNav from './BottomNav'
import { useLanguage } from '../context/LanguageContext'
import { useNearby } from '../context/NearbyContext'
import { useDirectory } from '../context/DirectoryContext'
import { colors } from '../ui/theme'

export default function Favorites({ navigation }: any) {
  const { favorites, isLoggedIn, user, logout } = useAuth()
  const { t, category: categoryLabel } = useLanguage()
  const { distances, ready, ensureAddresses, sortNearest } = useNearby()
  const { businesses } = useDirectory()
  const savedBusinesses = businesses.filter((business) => favorites.includes(business.id))
  React.useEffect(() => { if (ready) ensureAddresses(savedBusinesses.map((business) => ({ id: business.id, address: business.address, latitude: business.latitude, longitude: business.longitude }))) }, [savedBusinesses.length, ready])

  return (
    <View style={styles.screen}>
      <View style={styles.pageHeader}>
      <Pressable style={styles.pageBack} onPress={() => navigation.goBack()}><Text style={styles.pageBackText}>←</Text></Pressable>
      <View style={styles.pageHeaderCopy}><Text style={styles.pageKicker}>{t('MY LIST', 'నా జాబితా')}</Text><Text style={styles.pageTitle}>{t('Favorites', 'ఇష్టమైనవి')}</Text></View>
        <View style={styles.countBubble}><Text style={styles.countBubbleText}>{favorites.length}</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userRow}>
          <View style={styles.userAvatar}><Text style={styles.userAvatarText}>{user?.name?.charAt(0).toUpperCase() || 'G'}</Text></View>
          <Text style={styles.userName}>{user?.name || 'Guest user'}</Text>
          {isLoggedIn && <Pressable onPress={logout}><Text style={styles.logout}>{t('Logout', 'లాగ్ అవుట్')}</Text></Pressable>}
        </View>
        {!isLoggedIn || savedBusinesses.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.heart}><Text style={styles.heartText}>♥</Text></View>
            <Text style={styles.heading}>{isLoggedIn ? t('No favourites saved yet', 'ఇంకా ఇష్టమైనవి సేవ్ కాలేదు') : t('Build your local list', 'మీ స్థానిక జాబితాను రూపొందించండి')}</Text>
            <Text style={styles.copy}>{isLoggedIn ? t('Tap the heart on any local listing to add it here.', 'స్థానిక లిస్టింగ్‌లోని హార్ట్‌ను నొక్కి ఇక్కడ జోడించండి.') : t('Open Profile to sign in, then save useful local businesses for later.', 'ప్రొఫైల్ తెరిచి సైన్ ఇన్ చేసి ఉపయోగకరమైన వ్యాపారాలను సేవ్ చేయండి.')}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate(isLoggedIn ? 'Categories' : 'Profile')}>
              <Text style={styles.buttonText}>{isLoggedIn ? t('Browse categories', 'వర్గాలను చూడండి') : t('Open profile', 'ప్రొఫైల్ తెరవండి')}</Text>
            </Pressable>
          </View>
        ) : (
          sortNearest(savedBusinesses).map((business) => (
            <Pressable key={business.id} style={styles.businessCard} onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}>
              <View style={styles.businessIcon}><Text style={styles.businessIconText}>{business.categoryName?.charAt(0) || 'M'}</Text></View>
              <View style={styles.businessBody}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.businessCategory}>{categoryLabel(business.categoryName)}</Text>
                <Text style={styles.businessAddress}>{business.address}</Text><Text style={styles.businessDistance}>{(distances[business.id] ?? distances[business.address]) !== undefined ? `${((distances[business.id] ?? distances[business.address]) as number).toFixed(1)} km away` : 'Finding distance…'}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
      <BottomNav navigation={navigation} active="Favorites" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  pageHeader: { minHeight: 82, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#4A4AD5' },
  pageBack: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 2, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.18)' },
  pageBackText: { color: '#FFF', fontSize: 24, lineHeight: 27, textAlign: 'center' },
  pageHeaderCopy: { flex: 1, marginLeft: 14 },
  pageKicker: { color: '#D8D7FF', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  pageTitle: { marginTop: 2, color: '#FFF', fontSize: 27, fontWeight: '800' },
  countBubble: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)' },
  countBubbleText: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  userAvatar: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#5B55D9' },
  userAvatarText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  userName: { flex: 1, marginLeft: 10, color: '#303043', fontSize: 15, fontWeight: '800' },
  logout: { color: '#E34E5B', fontSize: 13, fontWeight: '800' },
  kicker: { color: '#D8D7FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 3, color: '#FFF', fontSize: 32, fontWeight: '800' },
  content: { paddingBottom: 120 },
  emptyCard: { minHeight: 250, marginHorizontal: 0, paddingHorizontal: 24, paddingVertical: 34, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#DDE2F5', backgroundColor: '#FFF' },
  heart: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 29, backgroundColor: '#FFECEF' },
  heartText: { color: '#E34E5B', fontSize: 25 },
  label: { marginTop: 15, color: '#5B55D9', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heading: { marginTop: 18, color: '#202332', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  copy: { marginTop: 9, color: '#737385', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  button: { marginTop: 20, paddingHorizontal: 18, paddingVertical: 11, borderRadius: 7, backgroundColor: '#514BD5' },
  buttonText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  businessCard: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  businessIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: '#EEF0FF' },
  businessIconText: { color: '#514BD5', fontSize: 18, fontWeight: '800' },
  businessBody: { flex: 1 },
  businessName: { color: '#202332', fontSize: 16, fontWeight: '800', lineHeight: 22 },
  businessCategory: { marginTop: 3, color: '#5D5EE8', fontSize: 11, fontWeight: '700' },
  businessAddress: { marginTop: 4, color: '#636B82', fontSize: 11, lineHeight: 16 },
  businessDistance: { marginTop: 3, color: '#4D8052', fontSize: 11, fontWeight: '700' },
  arrow: { color: '#2A2B3A', fontSize: 28, marginLeft: 8 },
})