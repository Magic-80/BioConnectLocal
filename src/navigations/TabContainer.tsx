import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';


const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rechercher" component={SearchScreen} />
      <Tab.Screen name="Favoris" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default TabContainer;