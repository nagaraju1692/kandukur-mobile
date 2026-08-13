import React from 'react'
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { businesses } from '../data/localData'

export default function BusinessDetails({ route, navigation }: any) {
  const { id } = route.params || {}
  const business = businesses.find(item => item.id === id)

  if (!business) return <View style={styles.empty}><Text>Listing not found.</Text></View>

  const openMap = () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`)
  const call = () => business.phone && business.phone !== 'N/A' ? Linking.openURL(`tel:${business.phone.replace(/\s/g, '')}`) : Alert.alert('Phone unavailable', 'This listing does not have a verified phone number.')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}><Text style={styles.heroIcon}>{business.categoryName === 'Hospitals' ? '✚' : '●'}</Text></View>
      <View style={styles.body}><Text style={styles.category}>{business.categoryName}</Text><Text style={styles.title}>{business.name}</Text><Text style={styles.description}>{business.description}</Text>
        <View style={styles.info}><Text style={styles.infoLabel}>LOCATION</Text><Text style={styles.infoText}>{business.address}</Text><Text style={styles.infoLabel}>CONTACT</Text><Text style={styles.infoText}>{business.phone || 'Not available'}</Text></View>
        <View style={styles.actions}><Pressable style={styles.secondary} onPress={call}><Text style={styles.secondaryText}>Call</Text></Pressable><Pressable style={styles.primary} onPress={openMap}><Text style={styles.primaryText}>Directions</Text></Pressable></View>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>Back to listings</Text></Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F7F8FF' }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center' }, hero: { height: 190, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F49D5' }, heroIcon: { color: '#FFF', fontSize: 54 }, body: { padding: 20 }, category: { color: '#5B55D9', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 7, color: '#2F2F41', fontSize: 25, fontWeight: '800', lineHeight: 31 }, description: { marginTop: 14, color: '#686879', fontSize: 14, lineHeight: 21 }, info: { marginTop: 22, padding: 16, borderRadius: 9, borderWidth: 1, borderColor: '#E4E5F2', backgroundColor: '#FFF' }, infoLabel: { marginTop: 8, color: '#858596', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, infoText: { marginTop: 5, color: '#3F3F50', fontSize: 13, lineHeight: 19 }, actions: { flexDirection: 'row', gap: 10, marginTop: 22 }, primary: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, backgroundColor: '#514BD5' }, primaryText: { color: '#FFF', fontSize: 13, fontWeight: '800' }, secondary: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 7, borderWidth: 1, borderColor: '#DCDDEA', backgroundColor: '#FFF' }, secondaryText: { color: '#514BD5', fontSize: 13, fontWeight: '800' }, back: { alignSelf: 'center', marginTop: 20, padding: 8 }, backText: { color: '#5B55D9', fontSize: 12, fontWeight: '800' },
})
