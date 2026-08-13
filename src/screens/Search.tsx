import React, { useMemo, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { businesses } from '../data/localData'
import BottomNav from './BottomNav'
import MobileHeader from './MobileHeader'
import { getBusinessImage } from '../utils/categoryImages'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Search({ navigation, route }: any) {
  const [query, setQuery] = useState(route.params?.query || '')
  const { favorites, toggleFavorite, isLoggedIn } = useAuth()
  const { t, category: categoryLabel } = useLanguage()
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return businesses.slice(0, 30)
    return businesses.filter((business) => `${business.name} ${business.categoryName} ${business.address}`.toLowerCase().includes(normalized)).slice(0, 30)
  }, [query])

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.pageHeading}><Pressable style={styles.backButton} onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></Pressable><View><Text style={styles.kicker}>{t('SEARCH', 'శోధన')}</Text><Text style={styles.title}>{t('Find places', 'ప్రదేశాలను కనుగొనండి')}</Text></View></View>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('Search businesses, categories...', 'వ్యాపారాలు, వర్గాలను శోధించండి...')}
            placeholderTextColor="#77798A"
            style={styles.input}
            underlineColorAndroid="transparent"
            selectionColor="#D35B50"
          />
        </View>

        {query.trim() && results.length === 0 && <Text style={styles.empty}>{t('No matching places found.', 'సరిపోలే ప్రదేశాలు కనుగొనబడలేదు.')}</Text>}
        {results.map((business) => (
          <Pressable key={business.id} style={styles.resultCard} onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}>
            <View style={styles.resultImageWrap}><Image source={getBusinessImage(business.image, business.categoryName)} style={styles.image} /><Pressable style={styles.favoriteButton} onPress={() => isLoggedIn ? toggleFavorite(business.id) : navigation.navigate('Profile')}><Text style={[styles.favorite, favorites.includes(business.id) && styles.favoriteActive]}>{favorites.includes(business.id) ? '♥' : '♡'}</Text></Pressable></View>
            <View style={styles.resultBody}><Text style={styles.name}>{business.name}</Text><Text style={styles.category}>{categoryLabel(business.categoryName)}</Text><Text style={styles.address}>📍 {business.address}</Text></View>
          </Pressable>
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} active="Search" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBFAF6' },
  content: { padding: 8, paddingBottom: 120 },
  pageHeading: { flexDirection: 'row', alignItems: 'center', minHeight: 62, marginBottom: 16, paddingHorizontal: 2 },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 14, borderRadius: 22, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' },
  backText: { color: '#302C2A', fontSize: 24, lineHeight: 27, textAlign: 'center' },
  kicker: { color: '#5B55D9', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 3, color: '#202332', fontSize: 29, fontWeight: '800', lineHeight: 34 },
  searchBar: { flexDirection: 'row', alignItems: 'center', minHeight: 58, paddingHorizontal: 18, borderRadius: 29, borderWidth: 1, borderColor: '#D9CFC7', backgroundColor: '#FFFDFB', shadowColor: '#2C2621', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  searchIcon: { marginRight: 9, fontSize: 18 },
  input: { flex: 1, height: 46, paddingVertical: 0, paddingHorizontal: 0, borderWidth: 0, outlineWidth: 0, outlineStyle: 'solid', outlineColor: 'transparent', backgroundColor: 'transparent', color: '#252637', fontSize: 14, fontWeight: '600' },
  empty: { marginTop: 25, color: '#55596D', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  resultCard: { overflow: 'hidden', marginTop: 16, borderRadius: 22, borderWidth: 1, borderColor: '#E7CFC5', backgroundColor: '#FFFDFB', shadowColor: '#8C5B4B', shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  resultImageWrap: { height: 202, position: 'relative', backgroundColor: '#E7E9FA' },
  image: { width: '100%', height: '100%' },
  favoriteButton: { position: 'absolute', top: '50%', right: -1, width: 38, height: 48, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#FFFDFB' },
  favorite: { color: '#E4585D', fontSize: 24 },
  favoriteActive: { color: '#E34E5B' },
  resultBody: { padding: 14, paddingTop: 13 },
  name: { color: '#202332', fontSize: 17, fontWeight: '800', lineHeight: 23 },
  category: { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 13, color: '#C95E49', backgroundColor: '#FFF0E9', fontSize: 11, fontWeight: '800' },
  address: { marginTop: 10, color: '#636B82', fontSize: 12, lineHeight: 18 },
})
