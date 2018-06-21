/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';


import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import config from './config'
/*
import Uppy from'uppy/lib/core'
import Tus from'uppy/lib/plugins/Tus'
import DragDrop from'uppy/lib/react/DragDrop'
*/
//var WPAPI = require( 'https' );


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

 
 
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      resData: '',
      token:'',
    }
}


async _setupGoogleSignin() {
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true })
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: config.iosClientId
        },
        android: {}
      })
    }

    await GoogleSignin.configure({
      ...configPlatform,
      webClientId: config.webClientId,
      offlineAccess: false
    })

    const user = await GoogleSignin.currentUserAsync()
    console.log(user)
    this.setState({ user })
  } catch (err) {
    console.warn('Google signin error', err.code, err.message)
  }
}

_signIn() {
  GoogleSignin.signIn()
    .then(user => {
      console.log(user)
      console.log(user.accessToken)
      this.setState({ user: user })
    }) /*
    .then(()=>{
      this.getToken();
    })*/
    .catch(err => {
      console.warn(err)
    })
    .done()
}

getToken(){
  GoogleSignin.getAccessToken(this.state.user)
.then((token) => {  
  this.setState({ token: tokens })
})
.catch((err) => {
  console.log(err);
})
.done();
}

_signOut() {
  GoogleSignin.revokeAccess()
    .then(() => GoogleSignin.signOut())
    .then(() => {
      this.setState({ user: null })
    })
    .done()
}





componentDidMount() {
  this._setupGoogleSignin()
}

 fillText(){
  var misCabeceras =  new Headers({
    "Content-Type": "text/plain",    
    "X-Custom-Header": "ProcessThisImmediately",
    username: 'acceso',
    password: '0995480563',

  });

  var miInit = { method: 'POST',
                 headers: misCabeceras,
                 username: 'acceso',
                 password: '0995480563',
                 mode: 'cors',
                 cache: 'default' };
  
  fetch('https://crearstore.com/wp-json/jwt-auth/v1/token',miInit)
  .then(function(response) {
    return response.blob();
  })
  .then(function(miBlob) {
    this.setState({
      resData: miBlob,
    })
  }).catch(function(error) {
    this.setState({
      resData: 'There has been a problem with your fetch operation: ' + error.message,
    })
    
  });;
 }

 



 render() {
  if (!this.state.user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 212, height: 48 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={this._signIn.bind(this)}
        />
      </View>
    )
  }

  if (this.state.user) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Welcome {this.state.user.name}
        </Text>
        <Text>Your email is: {this.state.user.email}</Text>
        <Text>Your token is: {this.state.token}</Text>
        
        <TouchableOpacity
          onPress={() => {
            this._signOut()
          }}
        >
          <View style={{ marginTop: 50 }}>
            <Text>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
