import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import VideoScreen from '../screens/VideoScreen';
import LoginScreen from '../screens/Login';
import UserScreen from '../screens/UserSceen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Course" options={{headerShown: false}} component={CourseScreen} />
        <Stack.Screen name="Video" options={{headerShown: false}} component={VideoScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="User" options={{headerShown: false}} component={UserScreen} />
        <Stack.Screen name="Cart" options={{headerShown: false}} component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
