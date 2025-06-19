import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobeSvg from '../assets/images/globe';
import MarkerSvg from '../assets/images/marker';
import FavoriteSvg from '../assets/images/favorite';
import IllustrationSvg from '../assets/images/illustration';
import { ScrollView } from 'react-native-gesture-handler';
import PreferenceSvg from '../assets/images/preference';
import StatScreen from './StatsScreen';

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <IllustrationSvg></IllustrationSvg>

        <Text style={styles.welcome}>Bienvenue sur</Text>
        <Text style={styles.appName}>🌱 BioConnect Local</Text>
        <Text style={styles.subtitle}>
          Découvrez les producteurs, artisans et magasins bio près de chez vous.
        </Text>


        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Rechercher')}
        >
          <MarkerSvg></MarkerSvg>
          <Text style={styles.buttonText}>Trouver autour de moi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Favoris')}
        >
          <FavoriteSvg fill={'white'}></FavoriteSvg>
          <Text style={styles.buttonText}> Vos Favoris </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Préférences')}
        >
          <PreferenceSvg></PreferenceSvg>
          <Text style={styles.buttonText}> Vos Préférences </Text>
        </TouchableOpacity>

        {/* À propos */}
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>À propos</Text>
          <Text style={styles.aboutText}>
            BioConnect vous aide à vous connecter avec des acteurs du bio autour
            de vous : vente directe, AMAP, marchés, magasins spécialisés... 🌍
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 220,
    height: 180,
    marginBottom: 30,
  },
  welcome: {
    paddingTop: 15,
    fontSize: 18,
    color: '#33691E',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#558B2F',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#66BB6A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: '#C8E6C9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
  aboutBox: {
    marginTop: 35,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C5E1A5',
    width: '90%',
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#33691E',
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 13,
    color: '#4E944F',
    lineHeight: 18,
  },
});

export default Home;
