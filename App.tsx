/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import Accueil from './src/screens/Accueil';
import ApiPage from './src/screens/SearchScreen.jsx';
import AffichageDonnees from './src/screens/AffichageDonnees';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function App() {
  // useEffect(() => {
  //   // Ouvrir la base de données au montage de l'application
  //   initDatabase()
  //     .then(() => console.log('Database initialized successfully.'))
  //     .catch(error => console.error('Failed to initialize database:', error));

  //   // Fermer la base de données à la fin de vie de l'application (optionnel, mais bonne pratique)
  //   return () => {
  //     closeDatabase();
  //   };
  // }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#2E7D32',
            borderTopWidth: 0,
            paddingTop: 15,
            height: 100,
          },

        })}
      >
        <Tab.Screen name="Accueil" component={Accueil}
          options={{
            title: 'Accueil',
          }} />
        <Tab.Screen name="Recherche" component={ApiPage} />
        <Tab.Screen name="Favorie" component={AffichageDonnees} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;