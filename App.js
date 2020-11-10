import React from 'react';
import AppNavigator from './navigation/AppNavigator';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends React.Component {
  state = {
    isReady: false,
  };


  async _cacheResourcesAsync() {
    return new Promise(async(resolve)=>{
      try{
        //await Asset.loadAsync(require('./assets/slides'));
        await Font.loadAsync({
          'Muli': require('./assets/fonts/Muli.ttf'),
          'Muli_Italic':require('./assets/fonts/Muli-Italic.ttf'),
          'Muli_300Light':require('./assets/fonts/Muli-Light.ttf'),
          'Muli_700Bold':require('./assets/fonts/Muli-Bold.ttf')
        })

      }catch(error){
        console.log(error)
      }

      resolve()

      /*const images = [require('./assets/splash.png')];

      const cacheImages = images.map(image=>{
        return Asset.fromModule(image).downloadAsync();
      });*/

    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); 
    }
    return (
      <AppNavigator/>
    );
  }


  
}



export default App;