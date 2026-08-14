import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
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
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { ReviewProvider } from './src/context/ReviewContext';
import { NearbyProvider } from './src/context/NearbyContext';
import { SubmittedListingsProvider } from './src/context/SubmittedListingsContext';
import SubmitBusiness from './src/screens/SubmitBusiness';
import Feedback from './src/screens/Feedback';
import { DirectoryProvider } from './src/context/DirectoryContext';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
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
