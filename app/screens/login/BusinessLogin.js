import React from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import { Item, Input, Button } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../config/constant'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            DeviceToken: '1234',
            loading: false,
        }
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

    goToForgetPwd() {
        this.props.navigation.navigate('ForgotPasswordBussiness');
    }
    async doLogin(){
        if(this.state.email == '' || this.state.email == null){
            this.refs.toast.show('Email cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }
        else if(!this.validateEmail(this.state.email)){
            this.refs.toast.show('Email entered is not valid.', DURATION.LENGTH_SHORT);
            return;
        }
        else if(this.state.password == '' || this.state.password == null){
            this.refs.toast.show('Password cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }        
        else{
            var token = JSON.parse(await AsyncStorage.getItem("DeviceToken"));
            var DeviceToken = token.token
            console.log('devicetoken', DeviceToken)
            let formdata = new FormData();
            formdata.append("Email", this.state.email)
            formdata.append("Password", this.state.password)
            formdata.append("DeviceToken", DeviceToken)
            try {
                let response = await fetch(
                    Constants.BASE_URL+'businessLogin',{
                    method:'POST',
                    body: formdata,
                });
                this.setState({loading:false})
                let responseJson = await response.json();
                console.log("responseis*****"+JSON.stringify(responseJson)+"******"+response.status);
                if (responseJson.status == "Success") {
                    console.log("in success*********");
                    this.success(responseJson['data'])
                    this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
                  }
                  else {
                    this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
                  }
                return responseJson;
              } catch (error) {
                console.error(error);
                this.setState({loading:false})
              }
        }
        
    }

    async success(profile) {
        console.log(profile)
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
        await AsyncStorage.setItem("DeviceToken", profile.token.toString());
        this.props.navigation.navigate('Business')
    }
    goToRegister() {
        this.props.navigation.navigate('Registration1');
    }

    render() {
        let logoImg = require("../../../assets/autoboro_logo.png");
        let logoImgs = require("../../../assets/car-bird-bg.jpg");
        let loginTickActive = require("../../../assets/login_tick_active.png");
        return (
            <SafeAreaView style={styles.wrapper}>
                <ScrollView style={styles.introView} contentContainerStyle={{ justifyContent: 'center' }}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Text style={{ marginTop: 10, color: '#000000', fontSize: 18, alignSelf: 'center', color: '#FF0000', }}>LOGIN</Text>
                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Email Address' onChangeText={(text) => this.setState({ email: text })} />
                    </Item>
                    <Item regular style={styles.viewLabel2}>
                        <Input style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={(text) => this.setState({ password: text })} />
                    </Item>
                    <TouchableOpacity onPress={this.goToForgetPwd.bind(this)}>
                        <Text style={styles.forgetPass}>forgot password ? </Text>
                    </TouchableOpacity>
                    <View style={styles.viewLogin}>
                        <Button block style={styles.btnLogin} onPress={() => this.doLogin()}>
                            {this.state.loading ?
                                <ActivityIndicator
                                    animating={this.state.loading}
                                    color='#FFFFFF'
                                    size="large"
                                    style={styles.activityIndicator} />
                                :
                                <Text style={{ color: '#FFFFFF', }}>LOGIN</Text>}
                        </Button>
                        <Image style={{ flex: 0.35, height: 45, marginLeft: 7 }} source={loginTickActive}></Image>
                    </View>
                    <Button block style={{ width: '80%', marginLeft: '10%', marginRight: '10%', marginTop: 15, backgroundColor: '#f5900e' }} onPress={this.goToRegister.bind(this)}>
                        <Text style={{ color: '#FFFFFF', }}>REGISTER</Text>
                    </Button>
                    <Image style={{ width: '100%', margin: 15, height: 200, resizeMode: 'contain' }} source={logoImgs}></Image>
                </ScrollView>
                <Toast ref="toast" />
            </SafeAreaView>
        )
    }
}

export default Login;