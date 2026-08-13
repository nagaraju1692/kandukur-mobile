import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useLanguage } from '../context/LanguageContext'

const items = [
  { route: 'Home', icon: '🏠', label: 'Home' },
  { route: 'Search', icon: '🔍', label: 'Search' },
  { route: 'Categories', icon: '📂', label: 'Categories' },
  { route: 'Favorites', icon: '❤️', label: 'Favorites' },
  { route: 'Profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav({ navigation, active }: { navigation: any; active: string }) {
  const { t } = useLanguage()
  const labels: Record<string, string> = { Home: t('Home', 'హోమ్'), Search: t('Search', 'శోధన'), Categories: t('Categories', 'వర్గాలు'), Favorites: t('Favorites', 'ఇష్టమైనవి'), Profile: t('Profile', 'ప్రొఫైల్') }
  return (
    <View style={styles.bar}>
      {items.map((item) => (
        <Pressable
          key={item.route}
          style={[styles.item, active === item.route && styles.activeItem]}
          onPress={() => navigation.navigate(item.route)}
        >
          <Text style={[styles.icon, active === item.route && styles.activeText]}>{item.icon}</Text>
          <Text style={[styles.label, active === item.route && styles.activeText]}>{labels[item.route]}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    right: 6,
    bottom: 8,
    left: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0DDD6',
    backgroundColor: '#FFF9F4',
    shadowColor: '#25254A',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  item: {
    flex: 1,
    minWidth: 66,
    alignItems: 'center',
    minHeight: 64,
    paddingVertical: 8,
    borderRadius: 14,
  },
  activeItem: {
    backgroundColor: '#FFE8DF',
  },
  icon: {
    color: '#5B55D9',
    fontSize: 25,
    lineHeight: 28,
  },
  label: {
    marginTop: 2,
    color: '#686071',
    fontSize: 12,
    fontWeight: '700',
  },
  activeText: {
    color: '#D35B50',
  },
})
