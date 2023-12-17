import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import VideoScreen from '../screens/VideoScreen';
import LoginScreen from '../screens/Login';
import UserScreen from '../screens/UserSceen';
import CartScreen from '../screens/CartScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactScreen from '../screens/ContactScreen';
import CategoryScreen from '../screens/categoryScreen';
import SignUpScreen from '../screens/SignUp';
import AllVideoSceen from '../screens/AllVideoScreen';
import SearchCourseScreen from '../screens/SearchCourse';
import MyCourseScreen from '../screens/MyCourseScreen';
import CertificateScreen from '../screens/CertificateScreen';

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
        <Stack.Screen name="AboutUs" options={{headerShown: false}} component={AboutUsScreen} />
        <Stack.Screen name="Contact" options={{headerShown: false}} component={ContactScreen} />
        <Stack.Screen name="Category" options={{headerShown: false}} component={CategoryScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="AllVideo" options={{headerShown: false}} component={AllVideoSceen} />
        <Stack.Screen name="SearchCourse" options={{headerShown: false}} component={SearchCourseScreen} />
        <Stack.Screen name="MyCourse" options={{headerShown: false}} component={MyCourseScreen} />
        <Stack.Screen name="Certificate" options={{headerShown: false}} component={CertificateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
