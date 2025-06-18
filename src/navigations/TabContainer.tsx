import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from '../screens/Accueil';
import SearchScreen from '../screens/SearchScreen';


const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Rechercher" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default TabContainer;