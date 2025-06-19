import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Remets ton logo ici si besoin */}
        {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
        <Text style={styles.appName}>🌿 BioConnect</Text>
        <Text style={styles.subtitle}>Cultivons le lien bio</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 BioConnect</Text>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9', // Vert très clair
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
  appName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#E8F5E9',
    fontStyle: 'italic',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  footer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#C8E6C9',
    backgroundColor: '#F1F8E9',
  },
  footerText: {
    fontSize: 13,
    color: '#789262',
    textAlign: 'center',
  },
  version: {
    fontSize: 12,
    color: '#A5D6A7',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default DrawerContent;
