import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Bienvenido'
      })
    }
  },
  { initialRouteName: 'Home' }
);