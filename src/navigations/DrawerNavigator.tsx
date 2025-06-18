import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabContainer from './TabContainer';
import DrawerContent from './DrawerContent';
// import SomeOtherPage from '../screens/SomeOtherPage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="BioConnect" component={TabContainer} />
      {/* <Drawer.Screen name="Autre Page" component={SomeOtherPage} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;