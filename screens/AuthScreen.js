import React from "react";
import { Button, View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';

const { width } = Dimensions.get('window');
//const height = width * 0.8
const height = 900

const images = [
  'https://images.pexels.com/photos/4047077/pexels-photo-4047077.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4047077.jpg&fm=jpg',
  'https://images.pexels.com/photos/3845808/pexels-photo-3845808.jpeg?cs=srgb&dl=pexels-anna-shvets-3845808.jpg&fm=jpg',
  'https://images.pexels.com/photos/4506111/pexels-photo-4506111.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
]

class AuthScreen extends React.Component {

  render() {
    return (
      <View style={{ width, height }}>
        <ScrollView pagingEnabled horizontal style={{ width, height }}>
          {
            images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width, height ,resizeMode:"cover"}} />
            ))
          }
        </ScrollView>
      </View>
    )
  }

}

export default AuthScreen;

const styles = StyleSheet.create({

});