import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Language = 'en' | 'te'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (english: string, telugu: string) => string
  category: (name: string) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const categoryTranslations: Record<string, string> = {
  Education: 'విద్య', Hospitals: 'ఆసుపత్రులు', 'Medical shops': 'మెడికల్ షాపులు', Restaurants: 'రెస్టారెంట్లు',
  Lodges: 'లాడ్జీలు', 'Bus stand': 'బస్ స్టాండ్', 'Police station': 'పోలీస్ స్టేషన్', Temples: 'దేవాలయాలు',
  Banks: 'బ్యాంకులు', 'Beauty clinics': 'బ్యూటీ క్లినిక్స్', 'Movie Theaters': 'సినిమా థియేటర్లు',
  'Shopping clothes': 'బట్టల షాపులు', 'Retail marts': 'రిటైల్ మార్ట్స్', 'Wine shops': 'వైన్ షాపులు',
  'Jewellery shops': 'జువెలరీ షాపులు', RealEstate: 'రియల్ ఎస్టేట్', 'ATM machines': 'ఏటీఎం కేంద్రాలు',
  'Agricultural info': 'వ్యవసాయ సమాచారం', 'Engineering colleges': 'ఇంజనీరింగ్ కాలేజీలు', 'Degree colleges': 'డిగ్రీ కాలేజీలు',
  Intermediate: 'ఇంటర్మీడియట్', 'Polytechnic colleges': 'పాలిటెక్నిక్ కాలేజీలు', Schools: 'పాఠశాలలు',
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  useEffect(() => {
    AsyncStorage.getItem('mana-kandukur-mobile-language').then((saved) => {
      if (saved === 'en' || saved === 'te') setLanguage(saved)
    }).catch(() => undefined)
  }, [])
  useEffect(() => {
    AsyncStorage.setItem('mana-kandukur-mobile-language', language).catch(() => undefined)
  }, [language])
  const value = useMemo(() => ({ language, setLanguage, t: (english: string, telugu: string) => language === 'te' ? telugu : english, category: (name: string) => language === 'te' ? categoryTranslations[name] || name : name }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
