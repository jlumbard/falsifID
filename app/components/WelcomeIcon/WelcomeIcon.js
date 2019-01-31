import React from 'react';
import{
    Image,
} from 'react-native';

import styles from './styles';

const WelcomeIcon = ({}) =>(
    <View>
        <Image resizeMode = "contain" source = {require('./falsifidLogo.png')} style = {styles.icon}/>
    </View>
);

export default Header;