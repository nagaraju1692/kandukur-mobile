import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useSubmittedListings } from '../context/SubmittedListingsContext'
import MobileHeader from './MobileHeader'
import BottomNav from './BottomNav'

export default function SubmitBusiness({ navigation }: any) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addListing } = useSubmittedListings()
  const [form, setForm] = useState({ name: '', categoryName: '', address: '', phone: user?.phone || '', description: '', website: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {}
    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(form.name.trim())) nextErrors.name = t('Enter a valid business name.', 'చెల్లుబాటు అయ్యే వ్యాపార పేరు నమోదు చేయండి.')
    if (form.categoryName.trim().length < 2) nextErrors.categoryName = t('Enter a category.', 'వర్గాన్ని నమోదు చేయండి.')
    if (form.address.trim().length < 5) nextErrors.address = t('Enter a complete location.', 'పూర్తి ప్రదేశాన్ని నమోదు చేయండి.')
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = t('Enter a valid 10-digit mobile number.', 'చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.')
    if (form.description.trim().length < 10) nextErrors.description = t('Add at least 10 characters about your service.', 'మీ సేవ గురించి కనీసం 10 అక్షరాలు నమోదు చేయండి.')
    if (form.website.trim() && !/^https?:\/\//i.test(form.website.trim())) nextErrors.website = t('Website must start with http:// or https://.', 'వెబ్‌సైట్ http:// లేదా https:// తో ప్రారంభం కావాలి.')
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    await addListing({ ...form, categoryId: `submitted-${form.categoryName.toLowerCase().replace(/\s+/g, '-')}`, submittedBy: user?.name || 'Guest user', createdBy: user?.phone || '' })
    setSubmitted(true)
  }

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.headingRow}><Pressable style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></Pressable><View><Text style={styles.kicker}>{t('DIRECTORY', 'డైరెక్టరీ')}</Text><Text style={styles.title}>{t('Submit a business', 'వ్యాపారాన్ని సమర్పించండి')}</Text></View></View>
        {submitted ? (
          <View style={styles.success}><Text style={styles.successIcon}>✓</Text><Text style={styles.successTitle}>{t('Submitted for review', 'సమీక్ష కోసం సమర్పించబడింది')}</Text><Text style={styles.successCopy}>{t('Your business information was saved and will be reviewed before publishing.', 'మీ వ్యాపార సమాచారం సేవ్ చేయబడింది. ప్రచురించే ముందు పరిశీలిస్తాము.',)}</Text><Pressable style={styles.primary} onPress={() => navigation.navigate('Home')}><Text style={styles.primaryText}>{t('Back to Home', 'హోమ్‌కు తిరిగి వెళ్లండి')}</Text></Pressable></View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.intro}>{t('Add your shop or service so local people can find you.', 'స్థానిక ప్రజలు మిమ్మల్ని కనుగొనేలా మీ షాప్ లేదా సేవను జోడించండి.')}</Text>
            {([['name', 'Business name', 'వ్యాపారం పేరు'], ['categoryName', 'Category', 'వర్గం'], ['address', 'Location / address', 'ప్రదేశం / చిరునామా'], ['phone', 'Mobile number', 'మొబైల్ నంబర్'], ['website', 'Website (optional)', 'వెబ్‌సైట్ (ఐచ్ఛికం)']] as const).map(([field, english, telugu]) => <View key={field} style={styles.field}><Text style={styles.fieldLabel}>{t(english, telugu)}{field !== 'website' ? ' *' : ''}</Text><TextInput style={[styles.input, errors[field] && styles.inputError]} placeholder={t(english, telugu)} placeholderTextColor="#888" value={form[field]} onChangeText={(value) => { update(field, value); if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined })) }} keyboardType={field === 'phone' ? 'phone-pad' : field === 'website' ? 'url' : 'default'} autoCapitalize={field === 'website' ? 'none' : 'words'} />{errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}</View>)}
            <View style={styles.field}><Text style={styles.fieldLabel}>{t('Description', 'వివరణ')} *</Text><TextInput style={[styles.input, styles.multiline, errors.description && styles.inputError]} placeholder={t('Describe your products or services', 'మీ ఉత్పత్తులు లేదా సేవలను వివరించండి')} placeholderTextColor="#888" value={form.description} onChangeText={(value) => update('description', value)} multiline />{errors.description && <Text style={styles.errorText}>{errors.description}</Text>}</View>
            <Pressable style={styles.primary} onPress={submit}><Text style={styles.primaryText}>{t('Submit listing', 'లిస్టింగ్ సమర్పించండి')}</Text></Pressable>
            <Text style={styles.note}>{t('Listings are reviewed before they appear publicly.', 'లిస్టింగ్‌లు పబ్లిక్‌గా కనిపించే ముందు సమీక్షించబడతాయి.')}</Text>
          </View>
        )}
      </ScrollView>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EAEAF9' }, content: { padding: 18, paddingBottom: 120 }, headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 }, back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderRadius: 21, backgroundColor: '#FFFDFB' }, backText: { color: '#302C2A', fontSize: 24 }, kicker: { color: '#5B55D9', fontSize: 12, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 3, color: '#202332', fontSize: 27, fontWeight: '800' }, formCard: { padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' }, intro: { color: '#5D6279', fontSize: 14, lineHeight: 21, marginBottom: 8 }, field: { marginTop: 12 }, fieldLabel: { color: '#3F414D', fontSize: 13, fontWeight: '800' }, input: { minHeight: 48, marginTop: 7, paddingHorizontal: 13, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', color: '#302C2A', backgroundColor: '#FFFCFA', fontSize: 14 }, inputError: { borderColor: '#D65360', backgroundColor: '#FFF7F7' }, errorText: { marginTop: 4, color: '#C7414F', fontSize: 11, lineHeight: 15 }, multiline: { minHeight: 110, paddingTop: 12, textAlignVertical: 'top' }, primary: { alignItems: 'center', marginTop: 20, paddingVertical: 14, borderRadius: 8, backgroundColor: '#514BD5' }, disabled: { opacity: 0.45 }, primaryText: { color: '#FFF', fontSize: 15, fontWeight: '800' }, note: { marginTop: 14, color: '#88817B', fontSize: 11, textAlign: 'center' }, success: { alignItems: 'center', padding: 28, borderRadius: 14, backgroundColor: '#FFFDFB' }, successIcon: { width: 58, height: 58, borderRadius: 29, color: '#FFF', backgroundColor: '#5D9B65', fontSize: 36, lineHeight: 58, textAlign: 'center' }, successTitle: { marginTop: 16, color: '#302C2A', fontSize: 20, fontWeight: '800', textAlign: 'center' }, successCopy: { marginTop: 8, color: '#6A645F', fontSize: 13, lineHeight: 19, textAlign: 'center' },
})
