import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Button, Text } from 'native-base';

class SelectProfession extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginType:'',
        }
    }

    navigateToLogin(type){
        this.setState({loginType: type}, () => { 
            // Do somethin g here. 
            console.log("typeis****", type);
            if(type == "3"){
                this.props.navigation.navigate('DriverRegistration1', {loginType : this.state.loginType});
            }
            else if(type == "2"){
                this.props.navigation.navigate('Registration1', {loginType : this.state.loginType});
            }
        });
    }

    
    render(){

        let logoImg = require("../../../assets/autoboro_logos.png");
        let birdImg = require("../../../assets/bird-logos.png");
        
        return(
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Button block style={styles.btnDriver} onPress={this.navigateToLogin.bind(this, "3")}>
                        <Text style={{color:'#FFFFFF', }}>Driver</Text>
                    </Button>
                    <Image style={styles.imgBird} source={birdImg}></Image>
                    <Button block style={styles.btnBusiness} onPress={this.navigateToLogin.bind(this, "2")}>
                        <Text style={{color:'#FFFFFF', }}>Automotive Business</Text>
                    </Button>
                </View>
            </SafeAreaView>
        )
    }

}

export default SelectProfession;