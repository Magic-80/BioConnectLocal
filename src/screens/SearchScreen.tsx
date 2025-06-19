import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert , Modal} from 'react-native';
import axios from 'axios';
import { LeafletView } from 'react-native-leaflet-view';

let defaultLocation = {
  lat: 48.8566,
  lng: 2.3522,
};

const SearchScreen = () => {
  const [operateurs, setOperateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marker, setMarker] = useState([]);
  const [error, setError] = useState(null);
  const [editVisibility , setEditVisibility] = useState(false);

  useEffect(() => {
    const fetchOperateurs = async () => {
      try {
        const response = await axios.get('https://opendata.agencebio.org/api/gouv/operateurs', {
          params: {
            q: 'boulangerie',
            departement: '75',
            page: 1,
            page_size: 20
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
        title: item.productions[0].nom || 'Activiter',
      }));

    console.log(initialMakers);

    setMarker(initialMakers);
    ;
  };

  const handleEdit = (data : []) => {
    setOperateurs(data);
    setEditVisibility(true);
  };

  const handleMap = (message: any) => {
    if (message?.event === 'onMapMarkerClicked') {
      const datas = operateurs.find((item, index) => `${item.numeroBio}-${index}` === message.payload.mapMarkerID);
      if (datas) {
        handleEdit(datas);
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
        onMessageReceived={handleMap}
        style={{ width: '100%', height: '100%' }}
      />

      <Modal visible={editVisibility}>  <Text> bonjour </Text> </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default SearchScreen;
