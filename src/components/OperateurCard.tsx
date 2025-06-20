// components/OperateurCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { isOperateurLiked, likeOperateur, unlikeOperateur } from '../services/migrations/index'; 
import DetailsOperator from './DetailsOperator';

const OperateurCard = ({ operateur, onDelete, onLikeChange, showFromFavorites = false, refreshKey }) => {
  const scaleAnim = new Animated.Value(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, [operateur.operateur_id, refreshKey]); 

  const checkIfLiked = async () => {
    try {
      const liked = await isOperateurLiked(operateur.operateur_id);
      setIsLiked(liked);
    } catch (error) {
      console.error('Erreur lors de la vérification du like:', error);
    }
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLikeToggle = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (isLiked) {
        // Retirer des favoris
        const success = await unlikeOperateur(operateur.operateur_id);
        if (success) {
          setIsLiked(false);
          if (showFromFavorites && onDelete) {
            onDelete(operateur.operateur_id);
          }
          if (onLikeChange) {
            onLikeChange(operateur.operateur_id, false);
          }
        }
      } else {
        // Ajouter aux favoris
        const operateurForDb = {
          id: operateur.operateur_id,
          raisonSociale: operateur.nom,
          denominationcourante: operateur.nom,
          adressesOperateurs: [{
            lieu: operateur.adresse?.split(',')[0] || '',
            ville: operateur.adresse?.split(',')[1]?.trim() || '',
            codePostal: ''
          }],
          activites: [{ nom: operateur.domaine_activite }]
        };
        
        const success = await likeOperateur(operateurForDb);
        if (success) {
          setIsLiked(true);
          if (onLikeChange) {
            onLikeChange(operateur.operateur_id, true);
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du toggle like:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActivityIcon = '🌱';

  return (
    <Animated.View
      style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={styles.cardContent}
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => setModalVisible(true)}
      >
        <DetailsOperator
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          operateur={operateur}
        />
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Text style={styles.activityIcon}>
              {getActivityIcon}
            </Text>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.operatorName} numberOfLines={2}>
              {operateur.nom}
            </Text>
            <View style={styles.activityBadge}>
              <Text style={styles.activityText}>
                {operateur.domaine_activite || 'Activité non spécifiée'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isLiked && styles.favoriteButtonLiked
            ]}
            onPress={handleLikeToggle}
            disabled={isProcessing}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favoriteIcon}>
              {isProcessing ? '⏳' : isLiked ? '💚' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressIcon}>📍</Text>
          <Text style={styles.addressText} numberOfLines={2}>
            {operateur.adresse || 'Adresse non spécifiée'}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Ajouté le {new Date(operateur.date_ajout).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 4,
  },
  cardContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#E8F5E8',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
    paddingRight: 8,
  },
  operatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 6,
    lineHeight: 22,
  },
  activityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  favoriteButtonLiked: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  addressIcon: {
    fontSize: 14,
    marginRight: 8,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  dateContainer: {
    paddingHorizontal: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default OperateurCard;
