/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App'; // usado para testes
import App from './src/App'; // APP USED

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
