import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useSubmittedListings } from '../context/SubmittedListingsContext'
import { useDirectory } from '../context/DirectoryContext'
import MobileHeader from './MobileHeader'
import BottomNav from './BottomNav'
import { colors } from '../ui/theme'

export default function SubmitBusiness({ navigation }: any) {
  const { user } = useAuth()
  const { t, category: categoryLabel } = useLanguage()
  const { addListing } = useSubmittedListings()
  const { categories } = useDirectory()
  const [form, setForm] = useState({ name: '', categoryId: '', categoryName: '', address: '', phone: user?.phone || '', description: '', website: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (user?.phone) setForm((current) => ({ ...current, phone: user.phone }))
  }, [user?.phone])

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {}
    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(form.name.trim())) nextErrors.name = t('Enter a valid business name.', 'Enter a valid business name.')
    if (!form.categoryId) nextErrors.categoryName = t('Choose a category.', 'Choose a category.')
    if (form.address.trim().length < 5) nextErrors.address = t('Enter a complete location.', 'Enter a complete location.')
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = t('Enter a valid 10-digit mobile number.', 'Enter a valid 10-digit mobile number.')
    if (form.description.trim().length < 10) nextErrors.description = t('Add at least 10 characters about your service.', 'Add at least 10 characters about your service.')
    if (form.website.trim() && !/^https?:\/\//i.test(form.website.trim())) nextErrors.website = t('Website must start with http:// or https://.', 'Website must start with http:// or https://.')
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async () => {
    if (!validate() || !user) return
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await addListing({ ...form, submittedBy: user.phone, createdBy: user.phone })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('Unable to submit listing. Try again.', 'Unable to submit listing. Try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={styles.screen}>
      <MobileHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.headingRow}><Pressable style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></Pressable><View><Text style={styles.kicker}>{t('DIRECTORY', 'DIRECTORY')}</Text><Text style={styles.title}>{t('Submit a business', 'Submit a business')}</Text></View></View>
        {!user ? (
          <View style={styles.success}><Text style={styles.successTitle}>{t('Sign in required', 'Sign in required')}</Text><Text style={styles.successCopy}>{t('Please sign in from Profile before submitting a local business.', 'Please sign in from Profile before submitting a local business.')}</Text><Pressable style={styles.primary} onPress={() => navigation.navigate('Profile')}><Text style={styles.primaryText}>{t('Open Profile', 'Open Profile')}</Text></Pressable></View>
        ) : submitted ? (
          <View style={styles.success}><Text style={styles.successIcon}>✓</Text><Text style={styles.successTitle}>{t('Submitted for review', 'Submitted for review')}</Text><Text style={styles.successCopy}>{t('Your business information was saved and will be reviewed before publishing.', 'Your business information was saved and will be reviewed before publishing.')}</Text><Pressable style={styles.primary} onPress={() => navigation.navigate('Home')}><Text style={styles.primaryText}>{t('Back to Home', 'Back to Home')}</Text></Pressable></View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.intro}>{t('Add your shop or service so local people can find you.', 'Add your shop or service so local people can find you.')}</Text>
            {([['name', 'Business name'], ['address', 'Location / address'], ['phone', 'Mobile number'], ['website', 'Website (optional)']] as const).map(([field, label]) => <View key={field} style={styles.field}><Text style={styles.fieldLabel}>{t(label, label)}{field !== 'website' ? ' *' : ''}</Text><TextInput style={[styles.input, errors[field] && styles.inputError]} placeholder={t(label, label)} placeholderTextColor="#888" value={form[field]} onChangeText={(value) => update(field, value)} keyboardType={field === 'phone' ? 'phone-pad' : field === 'website' ? 'url' : 'default'} autoCapitalize={field === 'website' ? 'none' : 'words'} />{errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}</View>)}
            <View style={styles.field}><Text style={styles.fieldLabel}>{t('Category', 'Category')} *</Text><View style={styles.categoryOptions}>{categories.filter((category) => !category.parentId).map((category) => <Pressable key={category.id} style={[styles.categoryOption, form.categoryId === category.id && styles.categoryOptionActive]} onPress={() => setForm((current) => ({ ...current, categoryId: category.id, categoryName: category.name }))}><Text style={styles.categoryOptionText}>{categoryLabel(category.name)}</Text></Pressable>)}</View>{errors.categoryName && <Text style={styles.errorText}>{errors.categoryName}</Text>}</View>
            <View style={styles.field}><Text style={styles.fieldLabel}>{t('Description', 'Description')} *</Text><TextInput style={[styles.input, styles.multiline, errors.description && styles.inputError]} placeholder={t('Describe your products or services', 'Describe your products or services')} placeholderTextColor="#888" value={form.description} onChangeText={(value) => update('description', value)} multiline />{errors.description && <Text style={styles.errorText}>{errors.description}</Text>}</View>
            {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
            <Pressable style={[styles.primary, isSubmitting && styles.disabled]} disabled={isSubmitting} onPress={submit}><Text style={styles.primaryText}>{isSubmitting ? t('Submitting...', 'Submitting...') : t('Submit listing', 'Submit listing')}</Text></Pressable>
            <Text style={styles.note}>{t('Listings are reviewed before they appear publicly.', 'Listings are reviewed before they appear publicly.')}</Text>
          </View>
        )}
      </ScrollView>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 18, paddingBottom: 120 }, headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 }, back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderRadius: 21, backgroundColor: '#FFFDFB' }, backText: { color: '#302C2A', fontSize: 24 }, kicker: { color: '#5B55D9', fontSize: 12, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 3, color: '#202332', fontSize: 27, fontWeight: '800' }, formCard: { padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' }, intro: { color: '#5D6279', fontSize: 14, lineHeight: 21, marginBottom: 8 }, field: { marginTop: 12 }, fieldLabel: { color: '#3F414D', fontSize: 13, fontWeight: '800' }, input: { minHeight: 48, marginTop: 7, paddingHorizontal: 13, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', color: '#302C2A', backgroundColor: '#FFFCFA', fontSize: 14 }, inputError: { borderColor: '#D65360', backgroundColor: '#FFF7F7' }, errorText: { marginTop: 4, color: '#C7414F', fontSize: 11, lineHeight: 15 }, multiline: { minHeight: 110, paddingTop: 12, textAlignVertical: 'top' }, primary: { alignItems: 'center', marginTop: 20, paddingVertical: 14, borderRadius: 8, backgroundColor: '#514BD5' }, disabled: { opacity: 0.45 }, primaryText: { color: '#FFF', fontSize: 15, fontWeight: '800' }, note: { marginTop: 14, color: '#88817B', fontSize: 11, textAlign: 'center' }, success: { alignItems: 'center', padding: 28, borderRadius: 14, backgroundColor: '#FFFDFB' }, successIcon: { width: 58, height: 58, borderRadius: 29, color: '#FFF', backgroundColor: '#5D9B65', fontSize: 36, lineHeight: 58, textAlign: 'center' }, successTitle: { marginTop: 16, color: '#302C2A', fontSize: 20, fontWeight: '800', textAlign: 'center' }, successCopy: { marginTop: 8, color: '#6A645F', fontSize: 13, lineHeight: 19, textAlign: 'center' }, categoryOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, categoryOption: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', backgroundColor: '#FFFCFA' }, categoryOptionActive: { borderColor: '#514BD5', backgroundColor: '#E9E9FF' }, categoryOptionText: { color: '#3F414D', fontSize: 12, fontWeight: '700' },
})
