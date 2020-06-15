import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Auth/Login';
import Cadastrar from './Auth/Cadastrar';
import Home from './Home/index';
import Chat from './Chat/Chat';
import AddChat from './AddChat/AddChat';
import {AuthProvider} from './Settings/AuthProvider';

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastrar" component={Cadastrar} />
    </Stack.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="AddChat" component={AddChat} />
    </Stack.Navigator>
  );
}

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    });

  if (!user) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
