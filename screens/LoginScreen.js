import React from "react";
import {
    Keyboard, Text, View, TextInput, TouchableWithoutFeedback,
    Alert, KeyboardAvoidingView, StyleSheet, ActivityIndicator
} from 'react-native';

import { Button } from 'react-native-elements';

const appId = "1047121222092614"

import { Auth } from 'aws-amplify';

class LoginScreen extends React.Component {

    state = {
        username: 'luismiguel.ulloa@gmail.com',
        password: 'Luisseguro3494',
        isLoggingIn: false,
        message: ''
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>ACCESO{"\n"}Usuario</Text>
                            <TextInput placeholder="Usuario"
                                ref={component => this._username = component}
                                onChangeText={(username) => this.setState({ username })}
                                placeholderColor="#c4c3cb"
                                value="luismiguel.ulloa@gmail.com"
                                style={styles.loginFormTextInput} />
                            <TextInput placeholder="Clave"
                                ref={component => this._password = component}
                                onChangeText={(password) => this.setState({ password })}
                                placeholderColor="#c4c3cb"
                                value="Luisseguro3494"
                                style={styles.loginFormTextInput}
                                secureTextEntry={true} />
                            {!!this.state.message && (
                                <Text
                                    style={{ fontSize: 14, color: 'red', padding: 5 }}>
                                    {this.state.message}
                                </Text>
                            )}
                            {this.state.isLoggingIn && <ActivityIndicator />}
                            <View style={{ margin: 7 }} />
                            <Button
                                disabled={this.state.isLoggingIn || !this.state.username || !this.state.password}
                                buttonStyle={styles.loginButton}
                                onPress={() => this.onLoginPress()}
                                title="Acceder"
                            />
                            <Button
                                buttonStyle={styles.fbLoginButton}
                                onPress={() => this.onFbLoginPress()}
                                title="Acceder con Facebook"
                                color="#3897f1"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
    onLoginPress() {
        this.setState({ isLoggingIn: true, message: '' });

        Auth.signIn(this.state.username, this.state.password).then(
            user => {
                console.log(user);
                if(user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                    console.log('aaaaa')
                    Auth.completeNewPassword(user,'Luisseguro3494').then(()=>console.log('xxx'));
                }
                this.props.navigation.navigate('Home')
            }

        ).catch(err => {
            this.setState({ message: err.message });
            this.setState({ isLoggingIn: false })
        });
    }
    async onFbLoginPress() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert(
                'Logged in!',
                `Hi ${(await response.json()).name}!`,
            );
        }
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontFamily: 'Muli',
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    }
})