// components/OperateurCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const OperateurCard = ({ operateur, onDelete }) => {
  const scaleAnim = new Animated.Value(1);

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

  const getActivityIcon = (activite) => {
    const activity = activite?.toLowerCase() || '';
    switch (true) {
      case activity.includes('maraîch') || activity.includes('légum'):
        return '🥕';
      case activity.includes('arboricul') || activity.includes('fruit'):
        return '🍎';
      case activity.includes('céréal') || activity.includes('blé'):
        return '🌾';
      case activity.includes('élevage') || activity.includes('viande'):
        return '🐄';
      case activity.includes('lait') || activity.includes('fromage'):
        return '🧀';
      case activity.includes('apicul') || activity.includes('miel'):
        return '🍯';
      case activity.includes('vin') || activity.includes('viticu'):
        return '🍇';
      default:
        return '🌱'; // Emoji par défaut pour les autres activités
    }
  };

  return (
    <Animated.View
      style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={styles.cardContent}
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Text style={styles.activityIcon}>
              {getActivityIcon(operateur.domaine_activite)}
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
            style={styles.favoriteButton}
            onPress={() => onDelete(operateur.operateur_id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favoriteIcon}>💚</Text>
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
