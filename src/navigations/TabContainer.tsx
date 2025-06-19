import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeSvg from '../assets/images/home';
import SearchSvg from '../assets/images/search';
import FavoriteSvg from '../assets/images/favorite';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2E7D32', 
        tabBarInactiveTintColor: '#A5D6A7',     
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#E8F5E9',        
          height: 60,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -3 },
        },
      })}
    >
      <Tab.Screen name="Accueil" component={Home} options={{ tabBarIcon: () => <HomeSvg fill={'green'} ></HomeSvg> }} />
      <Tab.Screen name="Rechercher" component={SearchScreen} options={{ tabBarIcon: () => <SearchSvg fill={'green'}></SearchSvg> }} />
      <Tab.Screen name="Favoris" component={FavoriteScreen} options={{ tabBarIcon: () => <FavoriteSvg fill={'green'}></FavoriteSvg> }} />
    </Tab.Navigator>
  );
};

export default TabContainer;

