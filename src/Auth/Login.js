import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'oliveiralippe@gmail.com',
      senha: '123456',
    };
  }

  async login() {
    const {email, senha} = this.state;
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        senha,
      );
      console.log(userCredential);
      this.props.navigation.navigate('Home');
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
        <Button title="Login" onPress={() => this.login()} />
        <Button
          title="Criar Conta"
          onPress={() => this.props.navigation.navigate('Cadastrar')}
        />
      </View>
    );
  }
}
