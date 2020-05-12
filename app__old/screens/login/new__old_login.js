import React from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button} from 'native-base';
import API from '../../Api/Api';
import Common from '../common/index';
import Toast, { DURATION } from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../config/constant';

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
        this.common = new Common();
    }


    validateEmail(email) {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(String(email).toLowerCase());
    }

    goToForgetPwd(){
        // this.props.navigation.navigate('ForgotPassword');
        this.props.navigation.navigate('ForgotPassword');    // to comment..
    }

   goToRegister(){
        this.props.navigation.navigate('SelectProfession');
    }

    

    async success(profile) {
		await AsyncStorage.setItem("roleid", profile.RoleId);
		await AsyncStorage.setItem("userid", profile.userid);
		await AsyncStorage.setItem("authToken", profile.AuthToken);
		await AsyncStorage.setItem("profile", JSON.stringify(profile));

		if (this.state.role == 2) {
			this.props.navigation.navigate('Business')
		}
		else if (this.state.role == 3) {
			this.props.navigation.navigate('Driver')
		}
		this.setState({ loading: false });
	}



	// Login = async () => {
	// 	if (!this.state.email) {
	// 		this.common.showToast('Email cannot be blank.')
	// 	}
	// 	else if (this.state.email && !this.common.validateEmail(this.state.email)) {
	// 		this.common.showToast('Email entered is not valid.');
	// 	}
	// 	else if (!this.state.password) {
	// 		this.common.showToast('Password cannot be blank.')
	// 	}
	// 	else {
    //         this.setState({ loading: true });
    //         // var authToken = await AsyncStorage.getItem("authToken");
    //         // var header = {"authentication":authToken};
    //         // var headers = {
    //         //     'Content-Type': 'application/json',
    //         //   }
    //         // var header = {"authentication":headers};
    //         // console.log('header', header)
	// 		// await this.getRequestData().then(data => {
	// 		// 	console.log("login request: ", data);
    //         //     var response = new API('Login', data, header).getResponse();
	// 		// 	console.log("login result: ", response, "data: ", data, "header: ", header);
	// 		// 	response.then(result => {
	// 		// 		if (result.statuscode == 200 && result.result.userid) {
	// 		// 			this.success(result.result);
	// 		// 		}
	// 		// 		else {
	// 		// 			var errors = [];
	// 		// 			errors.push(result.message);
	// 		// 			this.common.showToast(result.message)
	// 		// 			// this.setState({ errors: errors })
	// 		// 			this.setState({ loading: false });
	// 		// 		}
	// 		// 	})
    //         // });
	// 	}
    // }
    
    Login = async () => {
        const formdata = new FormData();
        formdata.append('email', this.state.email);
        formdata.append('password', this.state.password);
      
        fetch("http://autoborocar.markupdesigns.org/api/v1/auth/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: formdata
          })
              .then(response => {
                  console.log(
                      'response', response
                  );
              })
              .done();
        };

	// async getRequestData() {
	// 	let body = {
    //         email: this.state.email,
    //         password: this.state.password,
    //     }
	// 	return {
    //         body
	// 	}
	// }

    
    render(){

        let logoImg = require("../../../assets/autoboro_logo.png");
        let logoImgs = require("../../../assets/car-bird-bg.jpg");
        let loginTickActive = require("../../../assets/login_tick_active.png");
        
        return(
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Text style={{marginTop:10,color:'#000000',fontSize:18,alignSelf:'center', color:'#FF0000', fontFamily: 'Roboto_Bold'}}>LOGIN</Text>
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
                    <Button block style={styles.btnLogin} onPress={() => this.Login()}>
                        {this.state.loading ? 
                                    <ActivityIndicator
                                        animating = {this.state.loading}
                                        color = '#FFFFFF'
                                        size = "large"
                                        style = {styles.activityIndicator}/>
                                        :
                        <Text style={{color:'#FFFFFF', fontFamily: 'Roboto_Bold'}}>LOGIN</Text>}
                    </Button>
                    <Image style={{flex:0.35, height:45, marginLeft:7}} source={loginTickActive}></Image>
                    </View>
                    <Button block style={{width:'80%', marginLeft:'10%', marginRight:'10%', marginTop:15, backgroundColor:'#f5900e'}} onPress={this.goToRegister.bind(this)}>
                        <Text style={{color:'#FFFFFF', fontFamily: 'Roboto_Bold'}}>REGISTER</Text>
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