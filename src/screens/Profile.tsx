import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import BottomNav from './BottomNav';
import { useLanguage } from '../context/LanguageContext';

export default function Profile({ navigation }: any) {
  const { user, isLoggedIn, favorites, login, logout } = useAuth();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ name?: string; phone?: string }>({});

  const activityRows = useMemo(() => [
    { id: 'reviews', icon: '★', label: t('My reviews', 'నా సమీక్షలు'), count: '0' },
    { id: 'favorites', icon: '♥', label: t('My favorites', 'నా ఇష్టమైనవి'), count: String(favorites.length) },
    { id: 'recent', icon: '⌖', label: t('Recently viewed', 'ఇటీవల చూసినవి'), count: '' },
  ], [favorites.length, t]);

  const handleLogin = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    const nextErrors: { name?: string; phone?: string } = {};
    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(trimmedName)) nextErrors.name = t('Enter your name.', 'మీ పేరు నమోదు చేయండి.');
    if (!/^[6-9]\d{9}$/.test(trimmedPhone.replace(/\D/g, ''))) nextErrors.phone = t('Enter a valid 10-digit mobile number.', 'చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.');
    setLoginErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await login({ name: trimmedName, phone: trimmedPhone });
    setName('');
    setPhone('');
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.screen}>
        <View style={styles.pageHeader}>
          <View><Text style={styles.pageKicker}>{t('ACCOUNT', 'ఖాతా')}</Text><Text style={styles.pageTitle}>{t('Profile', 'ప్రొఫైల్')}</Text></View>
          <Pressable style={styles.settings} onPress={() => Alert.alert(t('Profile settings', 'ప్రొఫైల్ సెట్టింగ్స్'), t('Profile settings will be available soon.', 'ప్రొఫైల్ సెట్టింగ్స్ త్వరలో అందుబాటులో ఉంటాయి.'))}><Text style={styles.settingsText}>⚙</Text></Pressable>
        </View>

        <View style={styles.guestCard}>
          <View style={styles.loginEmblem}><Text style={styles.loginEmblemText}>MK</Text></View>
          <Text style={styles.guestTitle}>Mana Kandukur</Text>
          <Text style={styles.guestCopy}>{t('Discover everything local', 'స్థానిక సమాచారం అంతా తెలుసుకోండి')}</Text>

          <Text style={styles.fieldLabel}>{t('Your name', 'మీ పేరు')} *</Text>
          <TextInput
            style={[styles.input, loginErrors.name && styles.inputError]}
            placeholder={t('Your name', 'మీ పేరు')}
            value={name}
            onChangeText={(value) => { setName(value); if (loginErrors.name) setLoginErrors((current) => ({ ...current, name: undefined })); }}
            autoCapitalize="words"
          />
          {loginErrors.name && <Text style={styles.errorText}>{loginErrors.name}</Text>}
          <Text style={styles.fieldLabel}>{t('Mobile number', 'మొబైల్ నంబర్')} *</Text>
          <TextInput
            style={[styles.input, loginErrors.phone && styles.inputError]}
            placeholder={t('Mobile number', 'మొబైల్ నంబర్')}
            value={phone}
            onChangeText={(value) => { setPhone(value); if (loginErrors.phone) setLoginErrors((current) => ({ ...current, phone: undefined })); }}
            keyboardType="phone-pad"
          />
          {loginErrors.phone && <Text style={styles.errorText}>{loginErrors.phone}</Text>}

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>{t('Continue', 'కొనసాగించండి')}</Text>
          </Pressable>
          <Text style={styles.terms}>{t('By continuing, you agree to our Terms & Privacy Policy.', 'కొనసాగించడం ద్వారా నిబంధనలు మరియు గోప్యతా విధానాన్ని అంగీకరిస్తున్నారు.')}</Text>
        </View>
        <BottomNav navigation={navigation} active="Profile" />
      </View>
    );
  }

  const displayName = user?.name || 'Guest user';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.screen}>
      <View style={styles.pageHeader}>
        <View><Text style={styles.pageKicker}>{t('ACCOUNT', 'ఖాతా')}</Text><Text style={styles.pageTitle}>{t('Profile', 'ప్రొఫైల్')}</Text></View>
        <Pressable style={styles.settings} onPress={() => Alert.alert(t('Profile settings', 'ప్రొఫైల్ సెట్టింగ్స్'), t('Profile settings will be available soon.', 'ప్రొఫైల్ సెట్టింగ్స్ త్వరలో అందుబాటులో ఉంటాయి.'))}><Text style={styles.settingsText}>⚙</Text></Pressable>
      </View>

      <View style={styles.identity}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
        <View style={styles.identityText}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.phone}>{user?.phone}</Text>
          <Text style={styles.location}>⌖ {t('Kandukur, Andhra Pradesh', 'కందుకూరు, ఆంధ్రప్రదేశ్')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('My activity', 'నా కార్యకలాపాలు')}</Text>
        <View style={styles.list}>
          {activityRows.map((row) => (
            <Pressable key={row.id} style={styles.row} onPress={() => navigation.navigate(row.id === 'favorites' ? 'Favorites' : 'Categories')}>
              <Text style={styles.rowIcon}>{row.icon}</Text>
              <Text style={styles.rowText}>{row.label}</Text>
              {row.count ? <Text style={styles.rowCount}>{row.count}</Text> : null}
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('More', 'మరిన్ని')}</Text>
        <View style={styles.list}>
          {[
            { label: t('Submit a business', 'వ్యాపారాన్ని సమర్పించండి'), icon: '＋', action: () => navigation.navigate('SubmitBusiness') },
            { label: t('About Mana Kandukur', 'మనా కందుకూరు గురించి'), icon: 'i', action: () => navigation.navigate('Home') },
            { label: t('Feedback & complaints', 'అభిప్రాయం మరియు ఫిర్యాదులు'), icon: '?', action: () => navigation.navigate('Feedback') },
            { label: t('Logout', 'లాగ్ అవుట్'), icon: '↪', action: handleLogout, danger: true },
          ].map((item) => (
            <Pressable
              key={item.label}
              style={[styles.row, item.danger && styles.dangerRow]}
              onPress={item.action}
            >
              <Text style={[styles.rowIcon, item.danger && styles.dangerIcon]}>{item.icon}</Text>
              <Text style={[styles.rowText, item.danger && styles.dangerText]}>{item.label}</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <BottomNav navigation={navigation} active="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 88,
    backgroundColor: '#EAEAF9',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 22,
    backgroundColor: '#4A4AD5',
  },
  pageHeader: { minHeight: 86, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 18, backgroundColor: '#514BD5' },
  pageKicker: { marginBottom: 3, color: '#FFF', fontSize: 11, fontWeight: '700', letterSpacing: 1, opacity: 0.72 },
  pageTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', lineHeight: 25 },
  settings: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.14)' },
  settingsText: { color: '#FFF', fontSize: 17, lineHeight: 20 },
  kicker: {
    color: '#D8D7FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    marginTop: 4,
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  guestCard: {
    marginHorizontal: 16,
    marginTop: 28,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E8F2',
    backgroundColor: '#FFF',
  },
  loginEmblem: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 10, borderRadius: 13, backgroundColor: '#514BD5' },
  loginEmblemText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  guestTitle: {
    color: '#2D2F3D',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  guestCopy: {
    marginTop: 8,
    color: '#6C7184',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  fieldLabel: { marginTop: 16, marginBottom: -9, color: '#525263', fontSize: 11, fontWeight: '700' },
  input: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7F5',
    backgroundColor: '#F9F9FF',
    fontSize: 14,
    color: '#2D2F3D',
  },
  inputError: { borderColor: '#D65360', backgroundColor: '#FFF7F7' },
  errorText: { marginTop: 4, color: '#C7414F', fontSize: 11, lineHeight: 15 },
  primaryButton: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#514BD5',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  terms: { marginTop: 12, color: '#858596', fontSize: 10, lineHeight: 15, textAlign: 'center' },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 22,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A43D8',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '800',
  },
  identityText: {
    marginLeft: 13,
    flex: 1,
  },
  name: {
    color: '#2D2F3D',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 21,
  },
  phone: {
    marginTop: 2,
    color: '#5D6279',
    fontSize: 11,
    fontWeight: '500',
  },
  location: {
    marginTop: 4,
    color: '#7A7A86',
    fontSize: 11,
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#2D2F3D',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  list: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E7E8F2',
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 46,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  rowIcon: {
    width: 18,
    marginRight: 12,
    color: '#5A53D7',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  rowText: {
    flex: 1,
    color: '#2F2F3C',
    fontSize: 12,
    fontWeight: '700',
  },
  rowCount: {
    color: '#5A53D7',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 10,
  },
  arrow: {
    color: '#A7A9B6',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'right',
  },
  dangerRow: {
    backgroundColor: '#FFF',
  },
  dangerText: {
    color: '#D85A65',
  },
  dangerIcon: {
    color: '#D85A65',
  },
});