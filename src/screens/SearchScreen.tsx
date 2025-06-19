import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { LeafletView } from 'react-native-leaflet-view';
import { SafeAreaView } from 'react-native-safe-area-context';

let defaultLocation = {
  lat: 48.8566,
  lng: 2.3522,
};

const SearchScreen = () => {
  const [operateurs, setOperateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marker, setMarker] = useState([]);
  const [error, setError] = useState(null);
  const [editVisibility, setEditVisibility] = useState(false);

  useEffect(() => {
    const fetchOperateurs = async () => {
      try {
        const response = await axios.get('https://opendata.agencebio.org/api/gouv/operateurs', {
          params: {
            q: 'boulangerie',
            page: 1,
            page_size: 50
          }
        });

        const operateurs = response.data?.items || [];
        setOperateurs(operateurs);

        const a = operateurs.map(operateur => {
          console.log(operateur.productions[0]);

        })


        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOperateurs();
  }, []);

  useEffect(() => {
    if (operateurs.length > 0) {
      initMakers();
    }
  }, [operateurs]);

  const initMakers = () => {
    const initialMakers = operateurs.filter(item =>
      item.adressesOperateurs?.[0]?.lat &&
      item.adressesOperateurs?.[0]?.long
    )
      .map((item, index) => ({
        id: `${item.numeroBio}-${index}`,
        position: { lat: item.adressesOperateurs[0].lat, lng: item.adressesOperateurs[0].long },
        icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
        title: item.productions[0].nom || 'Productions',
      }));

    console.log(initialMakers);

    setMarker(initialMakers);
    ;
  };

  const handleEdit = (operateur: []) => {
    setOperateurs(operateur);
    setEditVisibility(true);
  };

  const handleMap = (message: any) => {
    if (message?.event === 'onMapMarkerClicked') {
      const operateur = operateurs.find((operateur, index) => `${operateur.numeroBio}-${index}` === message.payload.mapMarkerID);
      if (operateur) {
        handleEdit(operateur);
      }
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des données...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erreur lors du chargement des données :</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <LeafletView
        mapCenterPosition={defaultLocation}
        mapMarkers={marker}
        doDebug={false}
        zoom={5}
        onMessageReceived={handleMap}
        style={{ width: '100%', height: '100%' }}
      />

      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editVisibility}
          onRequestClose={() => {
            setEditVisibility(!editVisibility);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.closeButton} onPress={() => setEditVisibility(false)}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
              <Text>Hello World!</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%', 
    maxWidth: 400,
  },
});

export default SearchScreen;
