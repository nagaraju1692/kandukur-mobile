import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/screens/Home';
import Businesses from './src/screens/Businesses';
import BusinessDetails from './src/screens/BusinessDetails';
import Categories from './src/screens/Categories';
import Favorites from './src/screens/Favorites';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Admin from './src/screens/Admin';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { ReviewProvider } from './src/context/ReviewContext';
import { NearbyProvider } from './src/context/NearbyContext';
import { SubmittedListingsProvider } from './src/context/SubmittedListingsContext';
import SubmitBusiness from './src/screens/SubmitBusiness';
import Feedback from './src/screens/Feedback';
import { DirectoryProvider } from './src/context/DirectoryContext';
import { recordAppUsage } from './src/services/api';

enableScreens();

const Stack = createNativeStackNavigator();

function AppRoot() {
  useEffect(() => {
    let cancelled = false

    const registerUsage = async () => {
      try {
        let deviceId = await AsyncStorage.getItem('mana-kandukur-device-id')
        if (!deviceId) {
          deviceId = `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
          await AsyncStorage.setItem('mana-kandukur-device-id', deviceId)
        }

        if (!cancelled) {
          await recordAppUsage(deviceId)
        }
      } catch {
        // Ignore analytics errors to keep app startup non-blocking.
      }
    }

    registerUsage()
    return () => { cancelled = true }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
        <DirectoryProvider>
          <LanguageProvider>
            <NotificationProvider>
            <ReviewProvider>
                <NearbyProvider>
                    <SubmittedListingsProvider>
                    <NavigationContainer>
              <StatusBar style="light" />
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Categories" component={Categories} />
                <Stack.Screen name="Businesses" component={Businesses} />
                <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="SubmitBusiness" component={SubmitBusiness} />
                <Stack.Screen name="Feedback" component={Feedback} />
              </Stack.Navigator>
                    </NavigationContainer>
                    </SubmittedListingsProvider>
                </NearbyProvider>
            </ReviewProvider>
            </NotificationProvider>
          </LanguageProvider>
        </DirectoryProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return <AppRoot />
}
