// screens/FavoriteScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {
  getLikedOperateurs,
  unlikeOperateur,
  clearAllLikedOperateurs,
} from '../services/migrations/index';
import OperateurCard from '../components/OperateurCard';

const FavoriteScreen = () => {
  const [operateurs, setOperateurs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOperateurs = async () => {
    try {
      const likedOperateurs = await getLikedOperateurs();
      setOperateurs(likedOperateurs);
    } catch (error) {
      console.error('Erreur lors du chargement des opérateurs:', error);
      Alert.alert('Erreur', 'Impossible de charger les opérateurs favoris.');
    }
  };

  useEffect(() => {
    loadOperateurs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOperateurs();
    setRefreshing(false);
  };

  const handleDeleteOperateur = operateurId => {
    Alert.alert(
      'Retirer des favoris',
      'Voulez-vous retirer cet opérateur de vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          onPress: async () => {
            try {
              const success = await unlikeOperateur(operateurId);
              if (success) {
                loadOperateurs();
              } else {
                Alert.alert(
                  'Erreur',
                  'Impossible de retirer cet opérateur des favoris.',
                );
              }
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la suppression.',
              );
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Vider tous les favoris',
      'Êtes-vous sûr de vouloir retirer TOUS les opérateurs de vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Tout vider',
          onPress: async () => {
            try {
              await clearAllLikedOperateurs();
              loadOperateurs();
            } catch (error) {
              console.error('Erreur lors du vidage:', error);
              Alert.alert('Erreur', 'Impossible de vider les favoris.');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <OperateurCard operateur={item} onDelete={handleDeleteOperateur} />
  );

  const EmptyComponent = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🌱💚</Text>
      <Text style={styles.emptyTitle}>Votre jardin de favoris est vide</Text>
      <Text style={styles.emptyText}>
        Découvrez des opérateurs bio près de chez vous et ajoutez-les à vos
        favoris.
      </Text>
      <View style={styles.emptyHint}>
        <Text style={styles.emptyHintText}>
          💡 Utilisez l'onglet recherche pour explorer
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>💚</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes Favoris</Text>
            <Text style={styles.subtitle}>
              {operateurs.length} opérateur{operateurs.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      {operateurs.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>🗑️ Vider mes favoris</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={operateurs}
        renderItem={renderItem}
        keyExtractor={item => `operateur-${item.operateur_id}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor={'#4CAF50'}
          />
        }
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E8',
  },
  clearButton: {
    backgroundColor: '#FFEBEE',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  clearButtonText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyHint: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  emptyHintText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
  },
});

export default FavoriteScreen;
