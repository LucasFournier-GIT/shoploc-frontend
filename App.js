import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/screens/LoginScreen';
import CreateAccountScreen from './components/screens/CreateAccountScreen';
import { StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import Homescreen from './components/screens/HomeScreen';
import ShopScreen from './components/screens/ShopScreen';
import CartScreen from './components/screens/CartScreen';
import RecapCart from './components/screens/RecapCart';

const Stack = createStackNavigator();

export default function App() {

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={Homescreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ShopScreen" component={ShopScreen} options={{headerShown: false}} />
          <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: false}} />
          <Stack.Screen name="RecapCart" component={RecapCart} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}
