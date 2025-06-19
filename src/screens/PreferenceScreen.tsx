// screens/PreferenceScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferenceScreen = () => {
  const [defaultAddress, setDefaultAddress] = useState('');
  const [radius, setRadius] = useState('10');
  const [venteDirecte, setVenteDirecte] = useState(true);
  const [magasinSpecialise, setMagasinSpecialise] = useState(true);
  const [grossiste, setGrossiste] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const prefs = await AsyncStorage.getItem('preferences');
      if (prefs) {
        const data = JSON.parse(prefs);
        setDefaultAddress(data.defaultAddress || '');
        setRadius(data.radius || '10');
        setVenteDirecte(data.venteDirecte ?? true);
        setMagasinSpecialise(data.magasinSpecialise ?? true);
        setGrossiste(data.grossiste ?? false);
      }
    } catch (error) {
      console.log('Erreur chargement:', error);
    }
  };

  const savePreferences = async () => {
    try {
      const prefs = {
        defaultAddress,
        radius,
        venteDirecte,
        magasinSpecialise,
        grossiste,
      };
      await AsyncStorage.setItem('preferences', JSON.stringify(prefs));
      Alert.alert('Succès', 'Préférences sauvegardées !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sauvegarder');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Préférences</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Adresse par défaut</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Paris, France"
          value={defaultAddress}
          onChangeText={setDefaultAddress}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rayon de recherche (km)</Text>
        <TextInput
          style={styles.input}
          placeholder="10"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Filtres par défaut</Text>
        
        <View style={styles.switchRow}>
          <Text>Vente directe</Text>
          <Switch
            value={venteDirecte}
            onValueChange={setVenteDirecte}
            trackColor={{ true: '#4CAF50' }}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Magasin spécialisé</Text>
          <Switch
            value={magasinSpecialise}
            onValueChange={setMagasinSpecialise}
            trackColor={{ true: '#4CAF50' }}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Grossiste</Text>
          <Switch
            value={grossiste}
            onValueChange={setGrossiste}
            trackColor={{ true: '#4CAF50' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreferenceScreen;
