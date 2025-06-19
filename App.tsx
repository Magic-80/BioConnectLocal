import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import DrawerNavigator from './src/navigations/DrawerNavigator.tsx';
import { closeDatabase, initDatabase } from './src/services/migrations/index.js';

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    // Ouvrir la base de données au montage de l'application
    initDatabase()
      .then(() => console.log('Database initialized successfully.'))
      .catch(error => console.error('Failed to initialize database:', error));

    // Fermer la base de données à la fin de vie de l'application (optionnel, mais bonne pratique)
    return () => {
      closeDatabase();
    };
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois

  return (
    <NavigationContainer>
      <DrawerNavigator></DrawerNavigator>
    </NavigationContainer>
  );
}

export default App;