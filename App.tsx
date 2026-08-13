import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';

import Home from './src/screens/Home';
import Businesses from './src/screens/Businesses';
import BusinessDetails from './src/screens/BusinessDetails';
import Categories from './src/screens/Categories';
import Favorites from './src/screens/Favorites';
import Profile from './src/screens/Profile';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Businesses" component={Businesses} />
          <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
