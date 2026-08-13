import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Favorites({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}><Text style={styles.kicker}>MY LIST</Text><Text style={styles.title}>Favorites</Text></View>
      <View style={styles.card}>
        <View style={styles.heart}><Text>♥</Text></View>
        <Text style={styles.label}>YOUR SAVED PLACES</Text>
        <Text style={styles.heading}>Keep your favourites close</Text>
        <Text style={styles.copy}>Sign in in a later release to save local businesses and find them here.</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Categories')}><Text style={styles.buttonText}>Browse categories</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8FF' },
  header: { paddingHorizontal: 20, paddingVertical: 18, backgroundColor: '#4F49D5' },
  kicker: { color: '#D8D7FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { marginTop: 3, color: '#FFF', fontSize: 24, fontWeight: '800' },
  card: { margin: 22, padding: 28, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#E4E5F2', backgroundColor: '#FFF' },
  heart: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 27, backgroundColor: '#FFF0F3' },
  label: { marginTop: 15, color: '#5B55D9', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heading: { marginTop: 8, color: '#303043', fontSize: 19, fontWeight: '800', textAlign: 'center' },
  copy: { marginTop: 9, color: '#737385', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  button: { marginTop: 20, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 6, backgroundColor: '#514BD5' },
  buttonText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
})