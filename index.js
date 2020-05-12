/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import bgMessaging from './app/screens/bgMessaging';


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);