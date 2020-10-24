import React from "react";
import {Button,View,StyleSheet} from "react-native";
import { Auth } from 'aws-amplify';

class AuthScreen extends React.Component {

  render() {
    return (
        <View style={styles.authScreen} >
          <Button
            onPress={() => Auth.signIn('luismiguel.ulloa@gmail.com','luis2010').then(()=>console.log('Logeado')).catch(err=>console.log('Error logeando',err))}
            title="Authenticate"
          />
        </View>
    );
  }

}

export default AuthScreen;

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});