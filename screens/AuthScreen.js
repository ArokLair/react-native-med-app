import React from "react";
import { Button, View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Auth } from 'aws-amplify';

const { width } = Dimensions.get('window');
//const height = width * 1.5
const height = 900

const images = [
  'https://images.pexels.com/photos/4047077/pexels-photo-4047077.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4047077.jpg&fm=jpg',
  'https://images.pexels.com/photos/3845808/pexels-photo-3845808.jpeg?cs=srgb&dl=pexels-anna-shvets-3845808.jpg&fm=jpg',
  'https://images.pexels.com/photos/4506111/pexels-photo-4506111.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
]

class AuthScreen extends React.Component {

  state = {
    active: 0
  }

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  }

  onPress = () => {
    console.log("Click")
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={this.change}
          style={styles.scroll}
        >
          {
            images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image} />
            ))
          }
        </ScrollView>
        <View style={styles.pagination}>
          {
            images.map((i, k) => (
              <Text key={k} style={k == this.state.active ? styles.pagingActiveText : styles.pagingText}>⬤</Text>
            ))
          }
        </View>

        <View style={{ width, flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 220, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => Auth.signIn('luismiguel.ulloa@gmail.com', 'luis2010').then(() => console.log('Logeado')).catch(err => console.log('Error logeando', err))}
            style={styles.appButtonContainerLogin}
          >
            <Text style={styles.appButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Click")} style={styles.appButtonContainerRegister}>
            <Text style={styles.appButtonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: { width, height },
  scroll: { width, height },
  image: { width, height, resizeMode: "cover" },
  pagination: { flexDirection: "row", position: "absolute", bottom: 300, alignSelf: "center" },
  pagingText: { fontSize: (width / 20), color: "#888", margin: 3 },
  pagingActiveText: { fontSize: (width / 20), color: "#fff", margin: 3 },
  appButtonContainerLogin: {
    elevation: 8,
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonContainerRegister: {
    elevation: 8,
    backgroundColor: "#82b1ff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Muli",
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10,
    textTransform: "uppercase"
  }
});

export default AuthScreen;