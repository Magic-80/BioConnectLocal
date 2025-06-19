import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import Accueil from './src/screens/Accueil';
import ApiPage from './src/screens/SearchScreen.jsx';
import AffichageDonnees from './src/screens/AffichageDonnees';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerNavigator from './src/navigations/DrawerNavigator.tsx';


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
      <DrawerNavigator></DrawerNavigator>
    </NavigationContainer>
  );
}

export default App;