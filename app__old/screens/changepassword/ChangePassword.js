import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../config/constant';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            loading: false,
        }

        // this.navigateToIntro();
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

    async changePwd() {
        if (this.state.oldPassword == '' || this.state.oldPassword == null) {
            this.refs.toast.show('Old password cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }
        else if (this.state.newPassword == '' || this.state.newPassword == null) {
            this.refs.toast.show('New password cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }
        else if (this.state.confirmPassword == '' || this.state.confirmPassword == null) {
            this.refs.toast.show('Confirm password cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }
        else if (this.state.newPassword != this.state.confirmPassword) {
            this.refs.toast.show('New password & confirm password does not match.', DURATION.LENGTH_SHORT);
            return;
        }
        else {
            try {
                let authToken = '';
                AsyncStorage.getItem('driverToken').then((driverToken) => {
                    if(driverToken){
                        authToken = driverToken;
                        console.log("tokenis***1***" + authToken);
                    }
                });
                AsyncStorage.getItem('businessToken').then((businessToken) => {
                    if(businessToken){
                        authToken = businessToken;
                        console.log("tokenis***2***" + authToken);
                    }
                });
                this.setState({ loading: true })
                let body = {
                    old_password: this.state.oldPassword,
                    password: this.state.newPassword,
                };
                let response = await fetch(
                    Constants.BASE_URL + 'auth/password/change', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+authToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify(body),
                });
                console.log("tokenis***2***" + JSON.stringify(body));
                this.setState({ loading: false })
                let responseJson = await response.json();
                console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
                if (response.status == 200) {
                    this.refs.toast.show(responseJson['message'], DURATION.LENGTH_SHORT);
                }
                else {
                    this.refs.toast.show(responseJson['error']['message'], DURATION.LENGTH_SHORT);
                }
                return responseJson;
            } catch (error) {
                console.error(error);
                this.setState({ loading: false })
            }
        }
    }


    render() {

        let logoImg = require("../../../assets/autoboro_logo.png");
        let logoImgs = require("../../../assets/car-bird-bg.jpg");
        return (
            <SafeAreaView style={styles.wrapper}>
                {/* <Image source={splashImg}></Image> */}
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Text style={{ marginTop: 10, color: '#000000', fontSize: 18, alignSelf: 'center', color: '#FF0000',  }}>CHANGE PASSWORD</Text>
                    {/* <View style={styles.viewLabel1}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label style={styles.labelInput}>Old Password</Label>
                        <Input style={styles.input} autoFocus = {true}/>
                    </Item>
                    </View> */}
                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Old Password' secureTextEntry={true} onChangeText={(text) => this.setState({ oldPassword: text })} />
                    </Item>
                    {/* <View style={styles.viewLabel2}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label style={styles.labelInput}>New Password</Label>
                        <Input style={styles.input}/>
                    </Item>
                    </View> */}
                    <Item regular style={styles.viewLabel2}>
                        <Input style={styles.input} placeholder='New Password' secureTextEntry={true} onChangeText={(text) => this.setState({ newPassword: text })} />
                    </Item>
                    {/* <View style={styles.viewLabel3}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label style={styles.labelInput}>Confirm Password</Label>
                        <Input style={styles.input}/>
                    </Item>
                    </View> */}

                    <Item regular style={styles.viewLabel3}>
                        <Input style={styles.input} placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text) => this.setState({ confirmPassword: text })} />
                    </Item>
                    <Button block style={{ width: '80%', marginLeft: '10%', marginRight: '10%', marginTop: 20, backgroundColor: '#0d2950', }} onPress={this.changePwd.bind(this)}>
                        {this.state.loading ?
                            <ActivityIndicator
                                animating={this.state.loading}
                                color='#FFFFFF'
                                size="large"
                                style={styles.activityIndicator} />
                            :
                            <Text style={{ color: '#FFFFFF',  }}>SUBMIT</Text>}
                    </Button>
                    {/* <Text style={{marginTop:20,color:'#000000',fontSize:10,alignSelf:'center', color:'#000000'}}>check your email for password reset instructions</Text> */}
                    <Image style={{ width: '100%', margin: 15, height: 200, resizeMode: 'contain' }} source={logoImgs}></Image>
                </View>

                <Toast ref="toast" />

            </SafeAreaView>
        )
    }

}

export default ChangePassword;