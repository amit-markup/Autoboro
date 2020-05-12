import React from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button} from 'native-base';
import Constants from '../../config/constant';
import Toast, { DURATION } from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            email:'',
            password:'',
            loading:false,
            // userId:'',
            // roleId:'',
            // profileId:'',
            // firstName:'',
            // lastName:'',
            // phone:'',
            // languageId:'',
            // dob:''
        }

        // this.navigateToLogin();
    }

    // navigateToLogin(){
        // setTimeout(function(){ 
        //     const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'Splash' })],
        // });
        // that.props.navigation.dispatch(resetAction); }, 3000);

    // }

    // inputEmail(text){
    //     console.log("textis*******"+text);
    //     this.setState({email:text})
    // }

    // inputPassword(text){
    //     this.setState({password:text})
    // }

    validateEmail(email) {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(String(email).toLowerCase());
    }

    goToForgetPwd(){
        // this.props.navigation.navigate('ForgotPassword');
        this.props.navigation.navigate('ForgotPassword');    // to comment..
    }

    async doLogin(){
        // this.props.navigation.navigate('Business');      // to comment..
        // return;
        // try {
        //     // let response = await fetch(
        //     await fetch(    
        //       Constants.BASE_URL+'auth/login',{
        //           method:'POST'
        //       })
        //       .then((response) => await response.json())
        //       .then((responseJson) => {
        //         console.log("json*********", JSON.stringify(responseJson));
        //       });
        //     // let responseJson = await response.json();
        //     // return responseJson.movies;
        //   } catch (error) {
        //     console.error(error);
        //   }

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
            this.setState({loading:true})
            let body = {
                email: this.state.email,
                password: this.state.password,
            };
            try {
                let response = await fetch(
                    Constants.BASE_URL+'auth/login',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify(body)
                });
                this.setState({loading:false})
                let responseJson = await response.json();
                console.log("responseis*****"+JSON.stringify(responseJson)+"******"+response.status);
                this.navigateAfterLogin(response.status, responseJson);
                return responseJson;
              } catch (error) {
                console.error(error);
                this.setState({loading:false})
              }
        }
        
    }

    async navigateAfterLogin(statusCode, responseJson){
        console.log("navigate*******"+JSON.stringify(responseJson));
        if(statusCode == 200){
            // this.setState({
            //     userId:responseJson['userdata']['id'],
            //     profileId:responseJson['userdata']['profile_id'],
            //     firstName:responseJson['userdata']['first_name'],
            //     lastName:responseJson['userdata']['last_name'],
            //     email:responseJson['userdata']['email'],
            //     phone:responseJson['userdata']['phone'],
            //     languageId:responseJson['userdata']['language_id'],
            //     dob:responseJson['userdata']['dob'],
            //     roleId:responseJson['role'],
            // }, () => {
            //     this.props.navigation.navigate('ForgotPassword');
            // });

            if(responseJson['role'] == 3){
                let loginResponse = [
                    ['driverUserId', JSON.stringify(responseJson['userdata']['id'])],
                    ['driverProfileId', JSON.stringify(responseJson['userdata']['profile_id'])],
                    ['driverFirstName', JSON.stringify(responseJson['userdata']['first_name'])],
                    ['driverLastName', JSON.stringify(responseJson['userdata']['last_name'])],
                    ['driverEmail', JSON.stringify(responseJson['userdata']['email'])],
                    ['driverPhone', JSON.stringify(responseJson['userdata']['phone'])],
                    ['driverLanguageId', JSON.stringify(responseJson['userdata']['language_id'])],
                    ['driverDob', JSON.stringify(responseJson['userdata']['dob'])],
                    ['driverRole', JSON.stringify(responseJson['role'])],
                    ['driverToken', JSON.stringify(responseJson['token'])],
                  ];
                  await AsyncStorage.multiSet(loginResponse, (err) => {
                    this.props.navigation.navigate('Driver'); 
                  });
            }
            else if(responseJson['role'] == 2){
                let loginResponse = [
                    ['businessUserId', JSON.stringify(responseJson['userdata']['id'])],
                    ['businessProfileId', JSON.stringify(responseJson['userdata']['profile_id'])],
                    ['businessFirstName', JSON.stringify(responseJson['userdata']['first_name'])],
                    ['businessLastName', JSON.stringify(responseJson['userdata']['last_name'])],
                    ['businessEmail', JSON.stringify(responseJson['userdata']['email'])],
                    ['businessPhone', JSON.stringify(responseJson['userdata']['phone'])],
                    ['businessLanguageId', JSON.stringify(responseJson['userdata']['language_id'])],
                    ['businessDob', JSON.stringify(responseJson['userdata']['dob'])],
                    ['businessRole', JSON.stringify(responseJson['role'])],
                    ['businessToken', JSON.stringify(responseJson['token'])],
                  ];
                  await AsyncStorage.multiSet(loginResponse, (err) => {
                    this.props.navigation.navigate('Business');
                  });
            }

            
        }
    }

   goToRegister(){
        this.props.navigation.navigate('SelectProfession');
    }

    
    render(){

        let logoImg = require("../../../assets/autoboro_logo.png");
        let logoImgs = require("../../../assets/car-bird-bg.jpg");
        let loginTickActive = require("../../../assets/login_tick_active.png");
        
        return(
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Text style={{marginTop:10,color:'#000000',fontSize:18,alignSelf:'center', color:'#FF0000', }}>LOGIN</Text>
                    {/* <View style={styles.viewLabel1}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label style={styles.labelInput}>Email Address</Label>
                        <Input style={styles.input} autoFocus = {true}/>
                    </Item>
                    </View> */}


                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Email Address' onChangeText={(text) => this.setState({email: text})}/>
                    </Item>

                    {/* <View style={styles.viewLabel2}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label style={styles.labelInput}>Password</Label>
                        <Input style={styles.input}/>
                    </Item>
                    </View> */}

                    <Item regular style={styles.viewLabel2}>
                        <Input style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={(text) => this.setState({password: text})}/>
                    </Item>

                    <TouchableOpacity onPress={this.goToForgetPwd.bind(this)}>
                        <Text style={styles.forgetPass}>forgot password ? </Text>
                    </TouchableOpacity>
                    <View style={styles.viewLogin}>
                    <Button block style={styles.btnLogin} onPress={this.doLogin.bind(this)}>
                        {this.state.loading ? 
                                    <ActivityIndicator
                                        animating = {this.state.loading}
                                        color = '#FFFFFF'
                                        size = "large"
                                        style = {styles.activityIndicator}/>
                                        :
                        <Text style={{color:'#FFFFFF', }}>LOGIN</Text>}
                    </Button>
                    <Image style={{flex:0.35, height:45, marginLeft:7}} source={loginTickActive}></Image>
                    </View>
                    <Button block style={{width:'80%', marginLeft:'10%', marginRight:'10%', marginTop:15, backgroundColor:'#f5900e'}} onPress={this.goToRegister.bind(this)}>
                        <Text style={{color:'#FFFFFF', }}>REGISTER</Text>
                    </Button>

                    <Image style={{width:'100%', margin:15, height:200, resizeMode:'contain'}} source={logoImgs}></Image>

                    {/* <View style={styles.emailLabel}></View> */}
       
                    {/* <Image style={styles.imgBird} source={birdImg}></Image> */}
                </View>
                <Toast ref="toast"/>
            </SafeAreaView>
        )
    }

}

export default Login;