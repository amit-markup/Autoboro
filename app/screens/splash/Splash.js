import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Notification from '../Notification';

class Splash extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            
        }

       this.navigateToIntro();
       
    }

    navigateToIntro(){
        console.log("test", "in this")
        let that = this;
        setTimeout(function(){ that.setIntroStack(); }, 3000);
    }

    setIntroStack(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SelectProfession' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    // componentDidMount(){
    //     this._bootstrapAsync();
    // }
 
    //  _bootstrapAsync = async () => {
    //      var id = JSON.parse(await AsyncStorage.getItem("id"));
    //      var DeviceToken = JSON.parse(await AsyncStorage.getItem("DeviceToken"));
    //      setTimeout( () => {
    //         if(id){
    //             this.props.navigation.navigate('Driver')
    //         }
    //         else if(DeviceToken){
    //             this.props.navigation.navigate('Business')
    //         }
    //         else {
    //             this.props.navigation.navigate('SelectProfession');
    //         }
    //      },3000)
    //  };

    
    render(){

        let splashImg = require("../../../assets/splash_bg.png");
        
        return(
            <View style={styles.splash}>
                <Image style={styles.imageThumbnail} resizeMode="contain" source = {require('../../../assets/splash_bg.png')} />
                <StatusBar backgroundColor="#28558E" barStyle="light-content" />
                <Notification />
            </View>
            
        )
    }

}

export default Splash;