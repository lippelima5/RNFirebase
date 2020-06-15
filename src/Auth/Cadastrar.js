import React, {Component} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
    };
  }
  async cadastrar() {
    const {email, senha, nome} = this.state;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        senha,
      );

      //   console.clear();
      //   console.log(userCredential);

      var user = auth().currentUser;

      user
        .updateProfile({
          displayName: nome,
        })
        .then(function () {
          // Update successful.
          Alert.alert(
            'Sucesso',
            'Cadastro realizado com sucesso, por favor realize o login na plataforma',
          );
          this.props.navigation.goBack();
        })
        .catch(function (error) {
          // An error happened.
        });
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
        <Text>Nome</Text>
        <TextInput
          value={this.state.nome}
          placeholder={'Ex: Guilherme Silva'}
          onChangeText={(val) => this.onChangeText('nome', val)}
        />

        <Text>Email</Text>
        <TextInput
          value={this.state.email}
          placeholder={'Ex: joao@mail.com'}
          onChangeText={(val) => this.onChangeText('email', val)}
        />

        <Text>Senha</Text>
        <TextInput
          value={this.state.senha}
          placeholder={'insira sua senha'}
          onChangeText={(val) => this.onChangeText('senha', val)}
        />
        <Button title="Criar Conta" onPress={() => this.cadastrar()} />
        <Button title="Voltar" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
