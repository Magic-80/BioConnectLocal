import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeSvg from '../assets/images/home';
import SearchSvg from '../assets/images/search';


const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
<<<<<<< HEAD
     screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: '#66BB6A',
          height: 65,
        },
      }}
=======
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
>>>>>>> df342f9c12158e639767a68b835f52fe8ef3583b
    >
      <Tab.Screen name="Accueil" component={Home} options={{ tabBarIcon: () => <HomeSvg ></HomeSvg> }}/>
      <Tab.Screen name="Rechercher" component={SearchScreen} options={{ tabBarIcon: () => <SearchSvg></SearchSvg> }}/>
      <Tab.Screen name="Favoris" component={FavoriteScreen} />

    </Tab.Navigator>
  );
};

export default TabContainer;