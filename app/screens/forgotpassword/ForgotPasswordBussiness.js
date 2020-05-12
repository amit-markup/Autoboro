import React from 'react';
import { View, Image, ScrollView, Text, ActivityIndicator, Modal } from 'react-native';
import styles from './styles';
import { Item, Input, Button } from 'native-base';
import Constants from '../../config/constant';
import Toast, { DURATION } from 'react-native-easy-toast';

class ForgotPassord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    validateEmail(email) {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(String(email).toLowerCase());
    }

    async submitPwd() {
        if (this.state.email == '' || this.state.email == null) {
            this.refs.toast.show('Email cannot be blank.', DURATION.LENGTH_SHORT);
            return;
        }
        else if (!this.validateEmail(this.state.email)) {
            this.refs.toast.show('Email entered is not valid.', DURATION.LENGTH_SHORT);
            return;
        }
        else {
            let formdata = new FormData();
            console.log(formdata)
            formdata.append("Email", this.state.email)
            try {
                let response = await fetch(
                    Constants.BASE_URL + 'businessForgotPassword', {
                    method: 'POST',
                    body: formdata
                });
                this.setState({ loading: false })
                let responseJson = await response.json();
                console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
                if (responseJson.status == "Success") {
                    this.props.navigation.navigate('ChangePasswordBusiness', {"id": responseJson.id})
                    this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
                }
                else {
                    this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
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
            <ScrollView style={styles.wrapper}>
                <View style={styles.introView}>
                    <Image style={styles.imgLogo} source={logoImg}></Image>
                    <Text style={{ marginTop: 10, color: '#000000', fontSize: 18, alignSelf: 'center', color: '#FF0000', fontFamily: 'Roboto_Bold' }}>FORGOT PASSWORD</Text>
                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Email Address' onChangeText={(text) => this.setState({ email: text })} />
                    </Item>

                    <Button block style={{ width: '80%', marginLeft: '10%', marginRight: '10%', marginTop: 20, backgroundColor: '#0d2950', }} onPress={() => this.submitPwd()}>
                        {this.state.loading ?
                            <ActivityIndicator
                                animating={this.state.loading}
                                color='#FFFFFF'
                                size="large"
                                style={styles.activityIndicator} />
                            :
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto_Bold' }}>SUBMIT</Text>}
                    </Button>
                    <Text style={{ marginTop: 20, color: '#000000', fontSize: 10, alignSelf: 'center', color: '#000000', fontFamily: 'Roboto_Regular' }}>check your email for password reset instructions</Text>
                    <Image style={{ width: '100%', margin: 15, height: 200, resizeMode: 'contain' }} source={logoImgs}></Image>
                </View>
                <Toast ref="toast" />
            </ScrollView>
        )
    }

}

export default ForgotPassord;