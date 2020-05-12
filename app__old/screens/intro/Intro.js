import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';


class Intro extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            
        }

        this.navigateToLogin();
    }

    navigateToLogin(){
        let that = this;
        setTimeout(function(){ that.setLoginStack(); }, 3000);
    }

    setLoginStack(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    
    render(){

        let logoImg = require("../../../assets/autoboro_logo.png");
        let birdImg = require("../../../assets/bird_logo.png");
        
        return(
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Image style={styles.imgBird} source={birdImg}></Image>
                </View>
            </SafeAreaView>
        )
    }

}

export default Intro;