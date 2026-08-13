import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Profile({ navigation }: any) {
  const rows = ['Submit a business', 'About Mana Kandukur', 'Help & support']
  return (
    <View style={styles.screen}>
      <View style={styles.header}><Text style={styles.kicker}>ACCOUNT</Text><Text style={styles.title}>Profile</Text></View>
      <View style={styles.identity}><View style={styles.avatar}><Text style={styles.avatarText}>G</Text></View><View><Text style={styles.name}>Guest user</Text><Text style={styles.phone}>Discover everything local</Text></View></View>
      <View style={styles.card}><Text style={styles.section}>GET STARTED</Text><Text style={styles.heading}>Build your local list</Text><Text style={styles.copy}>Browse categories and open listings to find useful places around Kandukur.</Text><Pressable style={styles.button} onPress={() => navigation.navigate('Categories')}><Text style={styles.buttonText}>Explore directory</Text></Pressable></View>
      <Text style={styles.more}>MORE</Text>
      <View style={styles.list}>{rows.map(row => <Pressable key={row} style={styles.row} onPress={() => navigation.navigate('Categories')}><Text style={styles.rowText}>{row}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingBottom: 88, backgroundColor: '#F7F8FF' }, header: { paddingHorizontal: 20, paddingVertical: 18, backgroundColor: '#4F49D5' }, kicker: { color: '#D8D7FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 3, color: '#FFF', fontSize: 24, fontWeight: '800' }, identity: { flexDirection: 'row', alignItems: 'center', gap: 12, margin: 20 }, avatar: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: '#914DD2' }, avatarText: { color: '#FFF', fontWeight: '800', fontSize: 19 }, name: { color: '#303043', fontSize: 17, fontWeight: '800' }, phone: { marginTop: 3, color: '#737385', fontSize: 12 }, card: { marginHorizontal: 20, padding: 22, borderRadius: 10, borderWidth: 1, borderColor: '#E4E5F2', backgroundColor: '#FFF' }, section: { color: '#5B55D9', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, heading: { marginTop: 8, color: '#303043', fontSize: 18, fontWeight: '800' }, copy: { marginTop: 8, color: '#737385', fontSize: 13, lineHeight: 19 }, button: { alignSelf: 'flex-start', marginTop: 18, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6, backgroundColor: '#514BD5' }, buttonText: { color: '#FFF', fontSize: 12, fontWeight: '800' }, more: { marginHorizontal: 20, marginTop: 22, marginBottom: 8, color: '#5A5A6A', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, list: { marginHorizontal: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#E4E5F2', borderRadius: 8, backgroundColor: '#FFF' }, row: { minHeight: 47, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F0F0F5' }, rowText: { color: '#414153', fontSize: 13, fontWeight: '700' }, arrow: { color: '#AEAFBA', fontSize: 20 },
})