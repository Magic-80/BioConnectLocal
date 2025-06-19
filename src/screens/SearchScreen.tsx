import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { LeafletView } from 'react-native-leaflet-view';
import OperateurCard from '../components/OperateurCard';
import SearchSvg from '../assets/images/search';

let defaultLocation = {
  lat: 48.8566,
  lng: 2.3522,
};

const SearchScreen = () => {
  const [operateurs, setOperateurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [marker, setMarker] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [editVisibility, setEditVisibility] = useState(false);
  const [selectedOperateur, setSelectedOperateur] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOperateurs = async () => {
      try {
        setLoading(true);

        const response = await axios.get('https://opendata.agencebio.org/api/gouv/operateurs', {
          params: {
            q: searchQuery || 'boulangerie',
            nb: 300,
            debut: 0
          }
        });

        const operateurs = response.data?.items || [];
        setOperateurs(operateurs);
        setLoading(false);

      } catch (error) {
        console.error('Erreur API:', error);
        setError(error);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchOperateurs();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (operateurs.length > 0) {
      initMakers();
    }
  }, []);

  const initMakers = () => {
    const initialMakers = operateurs.filter(item =>
      item.adressesOperateurs?.[0]?.lat &&
      item.adressesOperateurs?.[0]?.long
    )
      .map((item, index) => ({
        id: `${item.numeroBio}-${index}`,
        position: { lat: item.adressesOperateurs[0].lat, lng: item.adressesOperateurs[0].long },
        icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
      }));

    console.log('Markers:', initialMakers);
    setMarker(initialMakers);
  };

  const handleEdit = (data: any) => {
    setSelectedOperateur(data);
    setEditVisibility(true);
  };

  const handleMarker = (message: any) => {
    if (message.event === 'onMapMarkerClicked') {
      const operateur = operateurs.find((operateur, index) => `${operateur.numeroBio}-${index}` === message.payload.mapMarkerID);
      if (operateur) {
        handleEdit(operateur);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={[styles.contentContainer, styles.centered]}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Chargement des opérateurs...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={[styles.contentContainer, styles.centered]}>
          <Text style={styles.errorText}>Erreur de chargement</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (searchQuery.trim() === '') {
      return (
        <LeafletView
          mapCenterPosition={defaultLocation}
          mapMarkers={marker}
          doDebug={false}
          zoom={5}
          onMessageReceived={handleMarker}
        />
      );
    }

    return (
      <FlatList
        data={operateurs}
        keyExtractor={(item, index) => `${item.numeroBio || index}`}
        renderItem={({ item }) => {
          const operateurData = {
            operateur_id: item.numeroBio?.toString() || '',
            name: item.raisonSociale || item.denominationcourante || 'Nom non disponible',
            domaine_activite: item.activites?.[0]?.nom || item.productions?.[0]?.nom || 'Activité non spécifiée',
            adresse: (() => {
              const adresse = item.adressesOperateurs?.[0];
              if (!adresse) return 'Adresse non disponible';
              return `${adresse.lieu || ''} ${adresse.codePostal || ''} ${adresse.ville || ''}`.trim();
            })(),
            date_ajout: item.dateMaj || new Date().toISOString(),
          };

          return (
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <OperateurCard
                operateur={operateurData}
                onDelete={() => { }}
              />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucun opérateur trouvé pour "{searchQuery}"
            </Text>
            <Text style={styles.emptySubText}>
              Essayez d'autres mots-clés ou vérifiez l'orthographe
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <SearchSvg fill={"#7CB342"}></SearchSvg>
          <TextInput
            placeholder="Rechercher un opérateur, une ville, un produit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            returnKeyType="search"
            placeholderTextColor="#7CB342"
          />
        </View>

        <Text style={styles.resultCount}>
          {operateurs.length} opérateur{operateurs.length > 1 ? 's' : ''} trouvé{operateurs.length > 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      <Modal
        visible={editVisibility}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedOperateur?.raisonSociale || selectedOperateur?.denominationcourante || 'Opérateur'}
            </Text>

            <Text style={styles.modalLabel}>Numéro Bio:</Text>
            <Text style={styles.modalText}>
              {selectedOperateur?.numeroBio || 'Non spécifié'}
            </Text>

            <Text style={styles.modalLabel}>Activités:</Text>
            <Text style={styles.modalText}>
              {selectedOperateur?.activites?.map((a: any) => a.nom).join(', ') || 'Non spécifié'}
            </Text>

            <Text style={styles.modalLabel}>Productions:</Text>
            <Text style={styles.modalText}>
              {selectedOperateur?.productions?.map((p: any) => p.nom).join(', ') || 'Non spécifié'}
            </Text>

            <Text style={styles.modalLabel}>Adresse:</Text>
            <Text style={styles.modalText}>
              {(() => {
                const adresse = selectedOperateur?.adressesOperateurs?.[0];
                if (!adresse) return 'Non spécifié';
                return `${adresse.lieu || ''} ${adresse.codePostal || ''} ${adresse.ville || ''}`.trim();
              })()}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditVisibility(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#DDEEDD',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4FAF4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CFE9CF',
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2E7D32',
  },

  resultCount: {
    marginTop: 8,
    fontSize: 14,
    color: '#4CAF50',
  },
  contentContainer: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  listContainer: {
    padding: 8,
    paddingTop: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#4CAF50',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
