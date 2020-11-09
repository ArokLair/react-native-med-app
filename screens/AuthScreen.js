import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get('window');


const images = [
  require('../assets/images/uno.jpg'),
  require('../assets/images/dos.jpg'),
  require('../assets/images/tres.jpeg')
]

class AuthScreen extends React.Component {

  state = {
    active: 0
  }

  login = () => {
    this.props.navigation.navigate('Login');
  }

  register = () => {
    console.log("Register click")
  }

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
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
                source={image}
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

        <View style={{
          width, flexDirection: "column",
          position: "absolute",
          paddingHorizontal:20,
          top: 0, left: 0, right: 0, bottom: 100,
          justifyContent: "center"
        }}>
          <Text style={{fontFamily:'Muli',fontWeight:"bold",fontSize:70,color:'#1C2833'}}>
            MedicApp
          </Text>
          <Text style={{fontFamily:'Muli',fontSize:20,color:'#303439'}}>
            Su sistema de historias medicas
          </Text>
        </View>
        <View style={{
          width, flexDirection: "row",
          justifyContent: "space-around",
          position: "absolute", bottom: 20,
          alignSelf: "center"
        }}>
          <TouchableOpacity
            onPress={this.login}
            style={styles.appButtonContainerLogin}>
            <Text style={styles.appButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.register}
            style={styles.appButtonContainerRegister}>
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
  image: { width, height, resizeMode: "cover",opacity:0.5},
  pagination: { flexDirection: "row", position: "absolute", bottom: 100, alignSelf: "center" },
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