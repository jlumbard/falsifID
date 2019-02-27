import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import HeaderIcon from './components/HeaderIcon';
import { ImagePicker } from 'expo';
import Expo from 'expo';

const options={
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    image: null,
    imageData:null,
    IDimage: null,
    IDimageData:null,
  };

  imageAdd = async (caller) =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      //Below are preferences for the image picking
      allowsEditing: true,
      aspect: [3, 3],
      mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(caller);
      if(caller =="ID"){
        this.setState({ IDimage: result.uri, IDimageData: result.base64 });
      }
      else if( caller == "notID"){
      this.setState({ image: result.uri, imageData: result.base64 });
      }
    }
  }


  render() {

    Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
    
    
    return (

      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <HeaderIcon style={styles.logo}/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2e2e2e', borderRadius: 30 }}>
        <Button
          title="Add Photo"
          onPress={() => this.imageAdd("notID")}
        />
        {this.state.image &&
          <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
        </View> 

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2e2e2e', borderRadius: 30 }}>
        <Button
          title="Add ID Photo"
          onPress={() => this.imageAdd("ID")}
        />
        {this.state.IDimage &&
          <Image source={{ uri: this.state.IDimage }} style={{ width: 200, height: 200 }} />}
      </View>
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