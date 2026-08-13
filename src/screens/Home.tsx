import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { categories } from '../data/localData'

const featured = ['1', '2', '3', '4']
const icons: Record<string, string> = { Education: '🎓', Hospitals: '✚', 'Medical shops': '✦', Restaurants: '⌂' }

export default function Home({ navigation }: any) {
  const items = categories.filter(category => featured.includes(category.id))
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.brand}>Mana Kandukur</Text>
        <Text style={styles.tagline}>Discover everything local</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>LOCAL DIRECTORY</Text>
        <Text style={styles.title}>What do you need?</Text>
        <View style={styles.grid}>
          {items.map(category => <Pressable key={category.id} style={styles.card} onPress={() => navigation.navigate('Businesses', { categoryId: category.id })}><Text style={styles.icon}>{icons[category.name]}</Text><Text style={styles.cardName}>{category.name}</Text><Text style={styles.arrow}>›</Text></Pressable>)}
        </View>
        <Pressable style={styles.directory} onPress={() => navigation.navigate('Categories')}><Text style={styles.directoryText}>View all categories</Text><Text style={styles.arrow}>›</Text></Pressable>
        <View style={styles.bottomNav}><Pressable onPress={() => navigation.navigate('Home')}><Text style={styles.activeNav}>⌂{`\n`}Home</Text></Pressable><Pressable onPress={() => navigation.navigate('Categories')}><Text style={styles.nav}>▦{`\n`}Categories</Text></Pressable><Pressable onPress={() => navigation.navigate('Favorites')}><Text style={styles.nav}>♥{`\n`}Favorites</Text></Pressable><Pressable onPress={() => navigation.navigate('Profile')}><Text style={styles.nav}>●{`\n`}Profile</Text></Pressable></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8FF' }, header: { paddingTop: 62, paddingHorizontal: 22, paddingBottom: 28, backgroundColor: '#4F49D5' }, brand: { color: '#FFF', fontSize: 28, fontWeight: '800' }, tagline: { marginTop: 5, color: '#D8D7FF', fontSize: 14 }, content: { padding: 20, paddingBottom: 96 }, eyebrow: { color: '#5B55D9', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 6, color: '#29293B', fontSize: 25, fontWeight: '800' }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 22 }, card: { width: '47.8%', minHeight: 128, padding: 15, borderWidth: 1, borderColor: '#E4E5F2', borderRadius: 10, backgroundColor: '#FFF' }, icon: { fontSize: 26 }, cardName: { marginTop: 26, color: '#3B3B4D', fontSize: 14, fontWeight: '800' }, arrow: { color: '#5B55D9', fontSize: 20, fontWeight: '700' }, directory: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, padding: 16, borderRadius: 8, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E4E5F2' }, directoryText: { color: '#514BD5', fontSize: 14, fontWeight: '800' }, bottomNav: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, paddingVertical: 13, borderRadius: 11, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E4E5F2' }, nav: { color: '#77778A', fontSize: 11, lineHeight: 19, textAlign: 'center' }, activeNav: { color: '#514BD5', fontSize: 11, fontWeight: '800', lineHeight: 19, textAlign: 'center' },
})
