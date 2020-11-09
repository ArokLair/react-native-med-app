import { createStackNavigator } from 'react-navigation-stack';

import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';

export default createStackNavigator(
  {
    Auth: { 
      screen: AuthScreen,
    },
    Login:{
      screen:LoginScreen
    }
  },
  { headerMode: 'none' }
);