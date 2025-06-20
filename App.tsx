import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import DrawerNavigator from './src/navigations/DrawerNavigator.tsx';
import { closeDatabase, initDatabase } from './src/services/migrations/index.js';
import AppNavigator from './src/navigations/AppNavigator.tsx';
import { Geolocation } from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

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

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted === 'granted') {
          console.log('Permission de localisation iOS accordée');
          return true;
        } else {
          console.log('Permission de localisation iOS refusée');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: 'Cette application a besoin d\'accéder à votre position.',
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission de localisation Android accordée');
          return true;
        } else {
          console.log('Permission de localisation Android refusée');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setError('Permission de localisation non accordée.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        console.log(location);
        
        setError(null);
      },
      (error) => {
        console.log(error.code, error.message);
        setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  );
}

export default App;