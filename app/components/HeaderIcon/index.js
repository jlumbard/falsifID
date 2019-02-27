import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class HeaderIcon extends React.Component {

  render() { 

    return (
      <Image source={require('../../../assets/splash.png')} style={styles.icon}/>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    flex: 0.5,
    resizeMode: 'contain',
    width: '40%',
  },
});