import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Accueil');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#A8E6CF', '#DCEDC1']}
      style={styles.container}
    >
      
      <Text style={styles.title}> 🌱 </Text>
      <Text style={styles.title}>BioConnect Local</Text>
      <ActivityIndicator size="large" color="#2E7D32" style={styles.loader} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#33691E',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
