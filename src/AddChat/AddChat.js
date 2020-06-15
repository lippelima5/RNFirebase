import React, {Component} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class addChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
  }

  async AddRoom() {
    const {nome} = this.state;

    try {
      if (nome.length > 2) {
        firestore()
          .collection('ROOMS')
          .add({
            nome: nome,
            criado: new Date().getTime(),
          })
          .then((docRef) => {
            docRef.collection('MESSAGES').add({
              text: `You have joined the room ${nome}.`,
              createdAt: new Date().getTime(),
              system: true,
            });
            this.props.navigation.goBack();
          });
      } else {
        Alert.alert(
          'Inválido',
          'o nome da sala precisa ter no minino 3 letras.',
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };
  render() {
    return (
      <View>
        <Text> AddChat </Text>
        <TextInput
          value={this.state.nome}
          onChangeText={(val) => this.onChangeText('nome', val)}
          placeholder={'Nome da sala'}
        />
        <Button title={'Adicionar'} onPress={() => this.AddRoom()} />
      </View>
    );
  }
}
