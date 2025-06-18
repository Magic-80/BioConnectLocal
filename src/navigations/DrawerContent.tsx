import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

const DrawerContent = (props : any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>BioConnect Local 🌱</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#C8E6C9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});

export default DrawerContent