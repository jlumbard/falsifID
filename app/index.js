
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button
} from 'react-native';
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
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        />>
        <ImageSelect style={styles.image}/>
        <View style="display:inline">
            <Button title="Calculate"></Button>
            <Text>0% Match</Text>
        </View>
        <ImageSelect style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F6D7A',
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
  },
});