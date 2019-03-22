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
import { Permissions, ImagePicker } from 'expo';
import Expo from 'expo';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

constructor() {
    super();

    // Assign state itself, and a default value for items
    this.state = {
      image: null,
      imgurImage: null,
      imageData:null,
      IDimage: null,
      imgurIDimage: null,
      IDimageData:null

    };
  }

  uploadImage = () => {
      console.log("works");
      const data = new FormData();
      console.log(this.IDImage);
      console.log(this.image);

      fetch("https://api.imgur.com/3/upload",{
        method: "POST",
        headers: new Headers({
          'Authorization': 'Client-ID e9dc7944b2c03e4'
        }),

        body: "image=" + this.IDImage
      })
      .then(response => response.json())
      .then(response => {
        console.log("Success");
        console.log(response);
        this.imgurIDImage = response.link;

        fetch("https://api.imgur.com/3/upload",{
          method: "POST",
          headers: new Headers({
            'Authorization': 'Client-ID e9dc7944b2c03e4'
          }),

          body: "image=" + this.image
        })
        .then(response => response.json())
        .then(response => {
          console.log("Success");
          console.log(response);
          this.imgurImage = response.link;

        fetch("https://api.deepai.org/api/image-similarity",{
            method: "POST",
            headers: new Headers({
              'api-key': '81e2316b-b15f-4a07-89ea-11fa26b4b1a5',
              'Content-Type': 'application/x-www-form-urlencoded'
            }),

            body: "image1=" + this.imgurImage +
            "&image2=" + this.imgurIDImage
          })
          .then(response => response.json())
          .then(response => {
            console.log("Success");
            console.log(response);
          })
          .catch(error => {
            console.log("upload error", error);
        });

        })
        .catch(error => {
          console.log("upload error", error);
        });

      })
      .catch(error => {
        console.log("upload error", error);
      });


    };



  imageAdd = async (caller) => {
    const options = {
        allowsEditing: true,
        aspect: [3, 3],
        mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
        base64: true,

    }

    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    let result = await ImagePicker.launchCameraAsync(options);

    if (result.uri){
        if (caller == "ID") {
            this.setState({ IDimage: result.uri, IDimageData: result.base64 });
            this.IDImage = result.base64;
        }
        else if (caller == "notID") {
            this.setState({ image: result.uri, IDimageData: result.base64 });
            this.image = result.base64;
        }
    }
  }


  render() {

    Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
    
    
    return (

      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <HeaderIcon/>
        <View style={styles.tile}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => this.imageAdd("notID")}
          >
            {this.state.image &&
              <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
            <Image source={require("../assets/camera.png")} style={styles.camera}/>
          </TouchableOpacity>
        </View>

        <View style={styles.tile}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => this.imageAdd("ID")}
          >
            {this.state.IDimage &&
              <Image source={{ uri: this.state.IDimage }} style={{ width: 200, height: 200 }} />}
            <Image source={require("../assets/camera.png")} style={styles.camera}/>
          </TouchableOpacity>
        </View>

        <View style="display:inline">
            <Button onPress={() => this.uploadImage()} title="Calculate"></Button>
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
    backgroundColor: '#e9e9e9',
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
    width: '50%',
  },
  tile: {
    flex: 0.8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2cbd3',
    borderRadius: 30,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 0.5,
    resizeMode: 'contain',
    width: 200,
  },
});