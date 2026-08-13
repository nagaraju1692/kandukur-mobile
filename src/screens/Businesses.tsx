import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { businesses, categories } from '../data/localData'

export default function Businesses({ navigation, route }: any) {
  const categoryId = route.params?.categoryId || '1'
  const category = categories.find(item => item.id === categoryId)
  const subcategoryIds = categories.filter(item => item.parentId === categoryId).map(item => item.id)
  const selectedBusinesses = businesses.filter(business => business.categoryId === categoryId || subcategoryIds.includes(business.categoryId))

  if (category?.name === 'Education') {
    return (
      <View style={styles.container}>
        <View style={styles.header}><Text style={styles.headerTitle}>Education</Text><Text style={styles.headerSub}>Choose an institution type</Text></View>
        <ScrollView contentContainerStyle={styles.listContent}>{categories.filter(item => item.parentId === '1').map(item => <Pressable key={item.id} style={styles.categoryRow} onPress={() => navigation.navigate('Businesses', { categoryId: item.id })}><Text style={styles.title}>{item.name}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category?.name || 'Listings'}</Text>
        <Text style={styles.headerSub}>{selectedBusinesses.length} places found</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {selectedBusinesses.map((business) => (
          <Pressable
            key={business.id}
            style={styles.card}
            onPress={() => navigation.navigate('BusinessDetails', { id: business.id })}
          >
            <View style={styles.cardContent}>
              <View style={styles.avatar}><Text>{business.categoryName?.charAt(0) || 'M'}</Text></View>
              <Text style={styles.title}>{business.name}</Text>
              <Text style={styles.category}>{business.categoryName}</Text>
              <Text style={styles.phone}>{business.address}</Text>
            </View>
          </Pressable>
        ))}
        {selectedBusinesses.length === 0 && <View style={styles.centerContent}><Text style={styles.emptyText}>No listings available yet.</Text></View>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FF' },
  header: { paddingTop: 58, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#4F49D5' },
  headerTitle: { fontSize: 25, fontWeight: '800', color: '#FFF' }, headerSub: { marginTop: 4, color: '#D8D7FF', fontSize: 13 },
  listContent: { padding: 16, paddingBottom: 48 },
  card: { backgroundColor: '#FFF', padding: 15, marginBottom: 11, borderRadius: 9, borderWidth: 1, borderColor: '#E4E5F2' },
  cardContent: { paddingLeft: 48, minHeight: 46, position: 'relative' }, avatar: { position: 'absolute', left: 0, top: 0, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#EEEFFD' },
  title: { fontSize: 15, fontWeight: '800', color: '#343447', marginBottom: 4 }, category: { color: '#5B55D9', fontSize: 11, fontWeight: '700', marginBottom: 5 },
  phone: { fontSize: 11, color: '#757587', lineHeight: 16 }, categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, marginBottom: 10, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E4E5F2', borderRadius: 9 }, arrow: { color: '#5B55D9', fontSize: 22 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
})
