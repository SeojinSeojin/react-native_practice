import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={require('../assets/icon-home.png')}
                  style={{ width: 25, height: 25 }}
                />
              );
            case 'Search':
              return (
                <Image
                  source={require('../assets/icon-globe.png')}
                  style={{ width: 25, height: 25 }}
                />
              );
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
