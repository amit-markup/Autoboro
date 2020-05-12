import React from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';

class DriverDealsTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }

        
    }

    


    render() {

        // let splashImg = require("../../../assets/splash_bg.png");

        return (
            <SafeAreaView style={styles.wrapper}>
                <Text style={{ height: 30, alignSelf: 'flex-start', marginLeft: '5%', marginRight: '5%', color: '#000000', marginTop: 10 }}>Deals Tab</Text>
                
            </SafeAreaView>
        )
    }

}

export default DriverDealsTab;