import React from 'react';
import {Button,View,Text} from 'react-native';
import { Auth } from 'aws-amplify';

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = { userMail:'' };
        this.getUserCognitoInfo();
    }
    async getUserCognitoInfo(){
        await Auth.currentUserInfo().then((o)=>{this.setState({userMail:o.attributes.email})})
    }
    render() {
        return (
            <View>
                <Text>Logeado como:{this.state.userMail}</Text>
                <Button onPress={() => Auth.signOut()} title='Sign out' />
            </View>
        )
    }
}

export default HomeScreen;