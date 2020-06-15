import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {List, Divider} from 'react-native-paper';
import {
  InterstitialAd,
  AdEventType,
  BannerAdSize,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function index({navigation}) {
  const [ROOMS, setROOMS] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [needReload, SetNeedReload] = useState(false);

  async function carregarSalas() {
    console.log('>>>>>>>>>>>>> CARREGAR SALAS')
    firestore()
      .collection('ROOMS')
      .orderBy('criado', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            nome: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        console.log(threads);

        setROOMS(threads);
        // setThreads(threads);

        //   if (loading) {
        //     setLoading(false);
        //   }
      });
  }

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // const interval = setInterval(() => {
    //   if (needReload) {
    //     interstitial.load();
    //     SetNeedReload(false);
    //     console.log('carregou')
    //   }
    // }, 5000);

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
      // clearInterval(interval);
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  carregarSalas();

  function exibirADS() {
    SetNeedReload(true);
    interstitial.show();
  }
  return (
    <View>
      <Text>Salas Já criadas</Text>
      {/* <FlatList
          data={this.state.ROOMS}
          renderItem={({item}) => console.log(item.nome)}
        /> */}
      <Button title="Add Sala" onPress={() => navigation.navigate('AddChat')} />

      <Button
        title="ANUNCIO"
        onPress={() => {
          exibirADS();
        }}
      />

      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <Button
        title="Loggout"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }
      />

      <FlatList
        data={ROOMS}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', {room: item})}>
            <List.Item
              title={item.nome}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
