import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useSubmittedListings } from '../context/SubmittedListingsContext'
import { useDirectory } from '../context/DirectoryContext'
import MobileHeader from './MobileHeader'
import BottomNav from './BottomNav'
import { colors } from '../ui/theme'
import { uploadAdminBusinessImage } from '../services/api'

function normalizeGallery(gallery: unknown): string[] {
  if (Array.isArray(gallery)) return gallery.filter((image): image is string => typeof image === 'string' && Boolean(image.trim()))
  if (typeof gallery !== 'string') return []
  try {
    const parsed = JSON.parse(gallery)
    if (Array.isArray(parsed)) return parsed.filter((image): image is string => typeof image === 'string' && Boolean(image.trim()))
  } catch {
    // Legacy records can contain comma-separated image URLs.
  }
  return gallery.split(',').map((image) => image.trim()).filter(Boolean)
}

function createListingForm(business: any, phone?: string) {
  return {
    name: business?.name || '',
    categoryId: business?.categoryId || '',
    categoryName: business?.categoryName || '',
    address: business?.address || '',
    phone: business?.phone || phone || '',
    description: business?.description || '',
    website: business?.website || '',
    image: business?.image || '',
    galleryInput: normalizeGallery(business?.gallery).join(', '),
  }
}

export default function SubmitBusiness({ navigation, route }: any) {
  const { user, isSuperAdmin } = useAuth()
  const { t, category: categoryLabel } = useLanguage()
  const { addListing } = useSubmittedListings()
  const { categories, businesses } = useDirectory()
  const routeBusiness = route?.params?.business
  const editingBusiness = businesses.find((business) => business.id === routeBusiness?.id) || routeBusiness
  const [form, setForm] = useState(() => createListingForm(editingBusiness, user?.phone))
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (user?.phone) setForm((current) => ({ ...current, phone: user.phone }))
  }, [user?.phone])

  useEffect(() => {
    if (!editingBusiness) return
    setForm(createListingForm(editingBusiness, user?.phone))
  }, [editingBusiness?.id, editingBusiness?.image, JSON.stringify(normalizeGallery(editingBusiness?.gallery)), user?.phone])

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const galleryImages = form.galleryInput.split(',').map((value) => value.trim()).filter(Boolean)

  const pickListingImages = async (target: 'cover' | 'gallery') => {
    if (!user?.phone || !isSuperAdmin) return
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert(t('Permission needed', 'Permission needed'), t('Allow gallery access to select listing photos.', 'Allow gallery access to select listing photos.'))
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: target === 'gallery',
      selectionLimit: target === 'gallery' ? Math.max(1, 10 - galleryImages.length) : 1,
      quality: 0.85,
    })
    if (result.canceled || result.assets.length === 0) return

    setIsUploadingImages(true)
    try {
      const uploadedImages = await Promise.all(result.assets.map((asset) => uploadAdminBusinessImage({
        uri: asset.uri,
        fileName: asset.fileName,
        mimeType: asset.mimeType,
      }, user.phone)))
      const imageUrls = uploadedImages.map((uploaded) => uploaded.data.image)
      if (target === 'cover') update('image', imageUrls[0])
      else update('galleryInput', [...galleryImages, ...imageUrls].slice(0, 10).join(', '))
    } catch (error) {
      Alert.alert(t('Upload failed', 'Upload failed'), error instanceof Error ? error.message : t('Unable to upload photos right now.', 'Unable to upload photos right now.'))
    } finally {
      setIsUploadingImages(false)
    }
  }

  const removeGalleryImage = (imageUrl: string) => {
    update('galleryInput', galleryImages.filter((image) => image !== imageUrl).join(', '))
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {}
    if (!/^[A-Za-z0-9][A-Za-z0-9 .,'-]{1,49}$/.test(form.name.trim())) nextErrors.name = t('Enter a valid business name.', 'Enter a valid business name.')
    if (!form.categoryId) nextErrors.categoryName = t('Choose a category.', 'Choose a category.')
    if (form.address.trim().length < 5) nextErrors.address = t('Enter a complete location.', 'Enter a complete location.')
    if (!/^\d{10,11}$/.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = t('Enter a valid 10- or 11-digit contact number.', 'Enter a valid 10- or 11-digit contact number.')
    if (form.description.trim().length < 10) nextErrors.description = t('Add at least 10 characters about your service.', 'Add at least 10 characters about your service.')
    if (form.website.trim() && !/^https?:\/\//i.test(form.website.trim())) nextErrors.website = t('Website must start with http:// or https://.', 'Website must start with http:// or https://.')
    if (form.image.trim() && !/^https?:\/\//i.test(form.image.trim())) nextErrors.image = t('Image URL must start with http:// or https://.', 'Image URL must start with http:// or https://.')
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async () => {
    if (!validate() || !user) return
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const payload = {
        ...form,
        submittedBy: user.phone,
        createdBy: user.phone,
        gallery: form.galleryInput.split(',').map((value) => value.trim()).filter(Boolean),
      }
      if (editingBusiness && (isSuperAdmin || editingBusiness.submittedBy === user.phone)) {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'https://mmanakandukur-backend-dah2a4aafecacbff.indiasouthcentral-01.azurewebsites.net'}/api/businesses/${encodeURIComponent(editingBusiness.id)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-phone': user.phone,
          },
          body: JSON.stringify({
            name: payload.name,
            categoryId: payload.categoryId,
            categoryName: payload.categoryName,
            address: payload.address,
            phone: payload.phone,
            description: payload.description,
            website: payload.website,
            image: payload.image,
            gallery: payload.gallery,
          }),
        })
        if (!response.ok) {
          const result = await response.json().catch(() => ({}))
          throw new Error(result.error || 'Unable to update listing.')
        }
      } else {
        await addListing({ ...payload, submittedBy: user.phone, createdBy: user.phone })
      }
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
          <View style={styles.success}><Text style={styles.successIcon}>✓</Text><Text style={styles.successTitle}>{editingBusiness ? t('Listing updated', 'Listing updated') : t('Submitted for review', 'Submitted for review')}</Text><Text style={styles.successCopy}>{editingBusiness ? t('Your changes are saved.', 'Your changes are saved.') : t('Your business information was saved and will be reviewed before publishing.', 'Your business information was saved and will be reviewed before publishing.')}</Text><Pressable style={styles.primary} onPress={() => navigation.navigate('Home')}><Text style={styles.primaryText}>{t('Back to Home', 'Back to Home')}</Text></Pressable></View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.intro}>{editingBusiness ? t('Update this listing and refresh the images.', 'Update this listing and refresh the images.') : t('Add your shop or service so local people can find you.', 'Add your shop or service so local people can find you.')}</Text>
            {([['name', 'Business name'], ['address', 'Location / address'], ['phone', 'Mobile number'], ['website', 'Website (optional)']] as const).map(([field, label]) => <View key={field} style={styles.field}><Text style={styles.fieldLabel}>{t(label, label)}{field !== 'website' ? ' *' : ''}</Text><TextInput style={[styles.input, errors[field] && styles.inputError]} placeholder={t(label, label)} placeholderTextColor="#888" value={form[field]} onChangeText={(value) => update(field, value)} keyboardType={field === 'phone' ? 'phone-pad' : field === 'website' ? 'url' : 'default'} autoCapitalize={field === 'website' ? 'none' : 'words'} />{errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}</View>)}
            <View style={styles.field}><Text style={styles.fieldLabel}>{t('Category', 'Category')} *</Text><View style={styles.categoryOptions}>{categories.map((category) => <Pressable key={category.id} style={[styles.categoryOption, form.categoryId === category.id && styles.categoryOptionActive]} onPress={() => setForm((current) => ({ ...current, categoryId: category.id, categoryName: category.name }))}><Text style={styles.categoryOptionText}>{categoryLabel(category.name)}</Text></Pressable>)}</View>{errors.categoryName && <Text style={styles.errorText}>{errors.categoryName}</Text>}</View>
            {isSuperAdmin ? <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>{t('Main photo', 'Main photo')}</Text>
                {form.image ? <View style={styles.coverPreview}><Image source={{ uri: form.image }} style={styles.coverImage} /><Pressable style={styles.removePhoto} onPress={() => update('image', '')}><Text style={styles.removePhotoText}>{t('Remove', 'Remove')}</Text></Pressable></View> : null}
                <Pressable style={[styles.photoButton, isUploadingImages && styles.disabled]} disabled={isUploadingImages} onPress={() => pickListingImages('cover')}><Text style={styles.photoButtonText}>{isUploadingImages ? t('Uploading...', 'Uploading...') : t(form.image ? 'Replace main photo' : 'Choose main photo', form.image ? 'Replace main photo' : 'Choose main photo')}</Text></Pressable>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>{t('Gallery photos', 'Gallery photos')} ({galleryImages.length}/10)</Text>
                {galleryImages.length > 0 ? <View style={styles.galleryGrid}>{galleryImages.map((imageUrl) => <View key={imageUrl} style={styles.galleryPreview}><Image source={{ uri: imageUrl }} style={styles.galleryImage} /><Pressable style={styles.galleryRemove} onPress={() => removeGalleryImage(imageUrl)}><Text style={styles.galleryRemoveText}>×</Text></Pressable></View>)}</View> : null}
                <Pressable style={[styles.photoButton, (isUploadingImages || galleryImages.length >= 10) && styles.disabled]} disabled={isUploadingImages || galleryImages.length >= 10} onPress={() => pickListingImages('gallery')}><Text style={styles.photoButtonText}>{isUploadingImages ? t('Uploading...', 'Uploading...') : t('Add gallery photos', 'Add gallery photos')}</Text></Pressable>
              </View>
            </> : <>
              <View style={styles.field}><Text style={styles.fieldLabel}>{t('Main image URL', 'Main image URL')}</Text><TextInput style={[styles.input, errors.image && styles.inputError]} placeholder={t('Paste a direct image URL', 'Paste a direct image URL')} placeholderTextColor="#888" value={form.image} onChangeText={(value) => update('image', value)} autoCapitalize="none" />{errors.image && <Text style={styles.errorText}>{errors.image}</Text>}</View>
              <View style={styles.field}><Text style={styles.fieldLabel}>{t('Gallery image URLs', 'Gallery image URLs')}</Text><TextInput style={[styles.input, styles.multiline]} placeholder={t('Separate URLs with commas', 'Separate URLs with commas')} placeholderTextColor="#888" value={form.galleryInput} onChangeText={(value) => update('galleryInput', value)} multiline autoCapitalize="none" /></View>
            </>}
            <View style={styles.field}><Text style={styles.fieldLabel}>{t('Description', 'Description')} *</Text><TextInput style={[styles.input, styles.multiline, errors.description && styles.inputError]} placeholder={t('Describe your products or services', 'Describe your products or services')} placeholderTextColor="#888" value={form.description} onChangeText={(value) => update('description', value)} multiline />{errors.description && <Text style={styles.errorText}>{errors.description}</Text>}</View>
            {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
            <Pressable style={[styles.primary, isSubmitting && styles.disabled]} disabled={isSubmitting} onPress={submit}><Text style={styles.primaryText}>{isSubmitting ? t(editingBusiness ? 'Updating...' : 'Submitting...', editingBusiness ? 'Updating...' : 'Submitting...') : t(editingBusiness ? 'Update listing' : 'Submit listing', editingBusiness ? 'Update listing' : 'Submit listing')}</Text></Pressable>
            <Text style={styles.note}>{t('Admins can choose, add, replace, or remove cover and gallery photos.', 'Admins can choose, add, replace, or remove cover and gallery photos.')}</Text>
          </View>
        )}
      </ScrollView>
      <BottomNav navigation={navigation} active="Categories" />
    </View>
  )
}

const styles = StyleSheet.create({
  photoButton: { alignItems: 'center', marginTop: 8, paddingVertical: 11, borderRadius: 8, borderWidth: 1, borderColor: '#514BD5', backgroundColor: '#F4F3FF' },
  photoButtonText: { color: '#514BD5', fontSize: 13, fontWeight: '800' },
  coverPreview: { position: 'relative', marginTop: 8 },
  coverImage: { width: '100%', height: 170, borderRadius: 8, backgroundColor: '#EEE' },
  removePhoto: { position: 'absolute', right: 8, bottom: 8, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 6, backgroundColor: 'rgba(40, 32, 32, 0.8)' },
  removePhotoText: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  galleryPreview: { position: 'relative' },
  galleryImage: { width: 82, height: 82, borderRadius: 8, backgroundColor: '#EEE' },
  galleryRemove: { position: 'absolute', top: 4, right: 4, width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(40, 32, 32, 0.8)' },
  galleryRemoveText: { color: '#FFF', fontSize: 18, lineHeight: 20 },
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 18, paddingBottom: 120 }, headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 }, back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderRadius: 21, backgroundColor: '#FFFDFB' }, backText: { color: '#302C2A', fontSize: 24 }, kicker: { color: '#5B55D9', fontSize: 12, fontWeight: '800', letterSpacing: 1 }, title: { marginTop: 3, color: '#202332', fontSize: 27, fontWeight: '800' }, formCard: { padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#E3D8D3', backgroundColor: '#FFFDFB' }, intro: { color: '#5D6279', fontSize: 14, lineHeight: 21, marginBottom: 8 }, field: { marginTop: 12 }, fieldLabel: { color: '#3F414D', fontSize: 13, fontWeight: '800' }, input: { minHeight: 48, marginTop: 7, paddingHorizontal: 13, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', color: '#302C2A', backgroundColor: '#FFFCFA', fontSize: 14 }, inputError: { borderColor: '#D65360', backgroundColor: '#FFF7F7' }, errorText: { marginTop: 4, color: '#C7414F', fontSize: 11, lineHeight: 15 }, multiline: { minHeight: 110, paddingTop: 12, textAlignVertical: 'top' }, primary: { alignItems: 'center', marginTop: 20, paddingVertical: 14, borderRadius: 8, backgroundColor: '#514BD5' }, disabled: { opacity: 0.45 }, primaryText: { color: '#FFF', fontSize: 15, fontWeight: '800' }, note: { marginTop: 14, color: '#88817B', fontSize: 11, textAlign: 'center' }, success: { alignItems: 'center', padding: 28, borderRadius: 14, backgroundColor: '#FFFDFB' }, successIcon: { width: 58, height: 58, borderRadius: 29, color: '#FFF', backgroundColor: '#5D9B65', fontSize: 36, lineHeight: 58, textAlign: 'center' }, successTitle: { marginTop: 16, color: '#302C2A', fontSize: 20, fontWeight: '800', textAlign: 'center' }, successCopy: { marginTop: 8, color: '#6A645F', fontSize: 13, lineHeight: 19, textAlign: 'center' }, categoryOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, categoryOption: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#DDD6D1', backgroundColor: '#FFFCFA' }, categoryOptionActive: { borderColor: '#514BD5', backgroundColor: '#E9E9FF' }, categoryOptionText: { color: '#3F414D', fontSize: 12, fontWeight: '700' },
})
