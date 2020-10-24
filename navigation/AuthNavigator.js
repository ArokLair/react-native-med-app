import { createStackNavigator } from 'react-navigation-stack';

import AuthScreen from '../screens/AuthScreen';

export default createStackNavigator(
  {
    'Acceso al sistema': { screen: AuthScreen }
  }
);