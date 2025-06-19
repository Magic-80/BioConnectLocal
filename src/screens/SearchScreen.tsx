import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { LeafletView } from 'react-native-leaflet-view';

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setData(operateurs);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOperateurs();
  }, []);

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


  const markers = data
    .filter(item =>
      item.adressesOperateurs?.[0]?.lat &&
      item.adressesOperateurs?.[0]?.long
    )
    .map((item, index) => ({
      id: `${item.numeroBio}-${index}`,
      position: [
        item.adressesOperateurs[0].lat,
        item.adressesOperateurs[0].long,
      ],
      title: item.denominationcourante || 'Opérateur BIO',
    }));

    console.log(markers);
    

  return (
    <View style={styles.container}>
      <LeafletView
        mapCenterPosition={{ lat: 48.8566, lng: 2.3522 }}
        zoom={12}
        markers={markers}
      style={{ width: '100%', height: '100%' }}
      />
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
