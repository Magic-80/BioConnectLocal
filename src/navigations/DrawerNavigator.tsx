import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabContainer from './TabContainer';
import DrawerContent from './DrawerContent';
import PreferenceScreen from '../screens/PreferenceScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={{ 
      
    }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="BioConnect" component={TabContainer} />
      <Drawer.Screen name="Préférences" component={PreferenceScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
