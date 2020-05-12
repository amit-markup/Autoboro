import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            
        }

        //this.navigateToIntro();
    }

    // navigateToIntro(){
    //     console.log("test", "in this")
    //     let that = this;
    //     setTimeout(function(){ that.setIntroStack(); }, 3000);
    // }

    // setIntroStack(){
    //     const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'Intro' })],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // }

    componentDidMount() {
        this._bootstrapAsync();
     }
 
     _bootstrapAsync = async () => {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
         setTimeout( () => {
            //  if(role) {
            //      if(role == 3) {
            //          this.props.navigation.navigate('CompanyHome');
            //          // this.props.navigation.navigate('Maps');
            //      }
            //      else if(role == 2) {
            //          this.props.navigation.navigate('RealEstateHome');
            //      }
            //      else if(role == 4) {
            //          this.props.navigation.navigate('InspectorHome');
            //      }
            //  }
            //  else {
            //      this.props.navigation.navigate('UserSelection');
            //  }
            if(profile['role'] == 3){
                this.props.navigation.navigate('Driver')
            }
            else if(profile['role'] == 2){
                this.props.navigation.navigate('Business')
            }
            else {
                this.props.navigation.navigate('Intro');
            }
         },2000)
     };

    
    render(){

        let splashImg = require("../../../assets/splash_bg.png");
        
        return(
            // <SafeAreaView style={styles.wrapper}>
            //     <Image source={splashImg}></Image>
            // </SafeAreaView>
            <View style={styles.splash}>
                <Image style={styles.imageThumbnail} resizeMode="contain" source = {require('../../../assets/splash_bg.png')} />
                <StatusBar backgroundColor="#28558E" barStyle="light-content" />
            </View>
        )
    }

}

export default Splash;