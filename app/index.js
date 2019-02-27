
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button
} from 'react-native';
import HeaderIcon from './components/HeaderIcon';
import ImageSelect from './components/ImageSelect';
import Expo from 'expo';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {

    Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);


    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <HeaderIcon style={styles.logo}/>
        <ImageSelect style={styles.image}/>
        <ImageSelect style={styles.image}/>
        <View style="display:inline">
            <Button title="Calculate"></Button>
            <Text>0% Match</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4e4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
  image: {
    borderRadius: 100, //NotWorking
    backgroundColor: '#2e2e2e',
  },
  logo: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});