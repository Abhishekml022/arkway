/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './Src/Screens/App';
import 'react-native-gesture-handler';
import SignUpScreen from './App';
import Test from './test';

AppRegistry.registerComponent(appName, () => App);
