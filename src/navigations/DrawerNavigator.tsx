import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabContainer from './TabContainer';
import DrawerContent from './DrawerContent';
import PreferenceScreen from '../screens/PreferenceScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50', 
          elevation: 4, 
          shadowColor: '#000', 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        drawerActiveTintColor: '#2E7D32',
        drawerInactiveTintColor: '#888',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="TabContainer"
        component={TabContainer}
        options={{ title: 'BioConnect 🌿' }}
      />
      <Drawer.Screen
        name="Préférences"
        component={PreferenceScreen}
        options={{ title: 'Mes préférences' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
