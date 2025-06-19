// navigation/DrawerContent.tsx
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerContent = (props: any) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header stylisé */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🌱</Text>
          </View>
          <Text style={styles.title}>BioConnect Local</Text>
          <Text style={styles.subtitle}>Votre guide bio local</Text>
        </View>

        {/* Menu items avec style personnalisé */}
        <View style={styles.menuSection}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Footer fixé en bas */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <Text style={styles.footerText}>
          Développé avec 💚 pour l'agriculture bio
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    // Dégradé effet avec shadow
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  logoEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#E8F5E8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuSection: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E8',
  },
  footerDivider: {
    height: 2,
    backgroundColor: '#C8E6C9',
    marginBottom: 12,
    borderRadius: 1,
    width: '60%',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 11,
    color: '#81C784',
    textAlign: 'center',
  },
});

export default DrawerContent;
