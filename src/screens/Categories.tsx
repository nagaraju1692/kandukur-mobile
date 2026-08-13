import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { categories } from '../data/localData'

const icons: Record<string, string> = {
  Education: '🎓', Hospitals: '✚', 'Medical shops': '✦', Restaurants: '⌂',
  Lodges: '▣', 'Bus stand': '▤', 'Police station': '⌁', Temples: '◉',
  Banks: '₹', 'Movie Theaters': '▶', 'Shopping clothes': '◈', 'Retail marts': '▦',
}

export default function Categories({ navigation }: any) {
  const rootCategories = categories.filter(category => !category.parentId)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>LOCAL DIRECTORY</Text>
      <Text style={styles.title}>Explore Kandukur</Text>
      <Text style={styles.subtitle}>Find trusted local places and services.</Text>
      <View style={styles.grid}>
        {rootCategories.map(category => (
          <Pressable key={category.id} style={styles.card} onPress={() => navigation.navigate('Businesses', { categoryId: category.id })}>
            <Text style={styles.icon}>{icons[category.name] || '●'}</Text>
            <Text style={styles.name}>{category.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8FF' },
  content: { padding: 20, paddingBottom: 96 },
  eyebrow: { color: '#5B55D9', fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  title: { marginTop: 6, color: '#28283A', fontSize: 27, fontWeight: '800' },
  subtitle: { marginTop: 6, color: '#747486', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 },
  card: { width: '47.8%', minHeight: 118, padding: 15, borderWidth: 1, borderColor: '#E4E5F2', borderRadius: 10, backgroundColor: '#FFF', justifyContent: 'space-between' },
  icon: { color: '#5B55D9', fontSize: 25 },
  name: { color: '#3B3B4D', fontSize: 14, fontWeight: '700', lineHeight: 18 },
})