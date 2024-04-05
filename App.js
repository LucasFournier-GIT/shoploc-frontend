import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/screens/LoginScreen';
import CreateAccountScreen from './components/screens/CreateAccountScreen';
import HomeScreen from './components/screens/HomeScreen';
import ShopScreen from './components/screens/ShopScreen';
import CartScreen from './components/screens/CartScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import RecapCart from './components/screens/RecapCartScreen';
import ShopProductsScreen from './components/shop/shopScreens/ShopProductsScreen';
import ShopOrdersScreen from './components/shop/shopScreens/ShopOrdersScreen';
import ShopProfileScreen from './components/shop/shopScreens/ShopProfileScreen';
import {AuthProvider} from './components/AuthContext';
import ShopUpdateProduct from "./components/shop/shopScreens/ShopUpdateProduct";
import ProfileScreen from "./components/screens/ProfileScreen";
import RouteScreen from "./components/screens/RouteScreen";

const Stack = createStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ShopScreen" component={ShopScreen} options={{headerShown: false}} />
          <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: false}} />
          <Stack.Screen name="RecapCartScreen" component={RecapCart} options={{headerShown: false}} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{headerShown: false}} />
          <Stack.Screen name="ShopProductsScreen" component={ShopProductsScreen} options={{headerShown: false}} />
          <Stack.Screen name="ShopOrdersScreen" component={ShopOrdersScreen} options={{headerShown: false}} />
          <Stack.Screen name="ShopProfileScreen" component={ShopProfileScreen} options={{headerShown: false}} />
          <Stack.Screen name="ShopUpdateProduct" component={ShopUpdateProduct} options={{headerShown: false}} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
          <Stack.Screen name="RouteScreen" component={RouteScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
