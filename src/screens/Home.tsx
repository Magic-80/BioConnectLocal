import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
    
      {/* <Image
        source={require('../assets/logo-bio.png')} // à adapter selon ton projet
        style={styles.logo}
        resizeMode="contain"
      /> */}

      <Text style={styles.title}>Bienvenue sur</Text>
      <Text style={styles.brand}>BioConnect Local 🌱</Text>
      <Text style={styles.subtitle}>
        Trouvez les opérateurs bio autour de vous.
      </Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Rechercher')}
      >
        <Text style={styles.buttonText}>Découvrir les opérateurs près de moi</Text>
      </TouchableOpacity>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#33691E',
  },
  brand: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#558B2F',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#66BB6A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#9CCC65',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Home;
