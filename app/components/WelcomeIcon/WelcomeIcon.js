import React from 'react';
import{
    Image,View,Text,
} from 'react-native';

import styles from './styles';

const WelcomeIcon = ({}) =>(
    <View>
        <Text>This is a test</Text>
        <Image resizeMode = "contain" source = {require('../../../assets/icon.png')} style = {styles.icon}/>
    </View>
);

export default WelcomeIcon;