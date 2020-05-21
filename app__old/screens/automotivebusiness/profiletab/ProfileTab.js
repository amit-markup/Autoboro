import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions, createAppContainer } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Title, Icon, Card } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import EditBusinessProfile from '../../automotivebusiness/editbusinessprofile/EditBusinessProfile';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';

class ProfileTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            profileImage: '',
            email: '',
            phone: '',
            address: '',
            language: '',
            website: '',
            firstName: '',
            lastName: '',
        }

        this.getProfileData();
    }


    async componentDidMount() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        console.log('profile', profile)
    }

    async getProfileData() {
        try {
            let authToken = '';
            AsyncStorage.getItem('driverToken').then((driverToken) => {
                if (driverToken) {
                    authToken = driverToken;
                    console.log("tokenis***1***" + authToken);
                }
            });
            AsyncStorage.getItem('businessToken').then((businessToken) => {
                if (businessToken) {
                    authToken = businessToken;
                    console.log("tokenis***2***" + authToken);
                }
            });
            authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmMGM0ZDJhZTFiOTJkMDI3MTRmNDZiZWU5MDhjZWI1Mzc5YWU1ZWVkMmQwMWQyZTNlYzczYjQ1YzcyZDUyMDIzYzFlYTI5ZWNkMDkwMTU4In0.eyJhdWQiOiIxIiwianRpIjoiOWYwYzRkMmFlMWI5MmQwMjcxNGY0NmJlZTkwOGNlYjUzNzlhZTVlZWQyZDAxZDJlM2VjNzNiNDVjNzJkNTIwMjNjMWVhMjllY2QwOTAxNTgiLCJpYXQiOjE1ODA4MDY2NzUsIm5iZiI6MTU4MDgwNjY3NSwiZXhwIjoxNjEyNDI5MDc1LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.pxikZYUdIWxdFJpUoiykHUbVdDSloxfPm86SRmbHjdBUHEGZvJt5vUXmuKHFkQuQ5ptR0MwQqjP_kF-ytvyjmq31Y96zgF0-Lm2dLZfIXAze_5tJgF84RNI8Ry1ZGwFVU0A1c_8taztiD7fCknHUnB0slRdQmyvaZxfUjfgwlimNKx67iwMEmXUprIRKL01ILfC0su6-qVS2_NPKhWY0r43nn3IL6mO5hw6uQ2eZNhejJ4ebdTOfmlUvJEXaJwZtY8LHWXvvybraB5JxMlqBRhLZs4CJXX_s2c6ZdckgExxR9n0ILN6Rzl8XHjJlRh7VJcuJjCmqrWu_PZqjWeaPHgPv1TOjqib2B_QladMoABXB_Xytcf27wCFfVq8kNlrPMyW0Nwr1ScI0-oAa5zrlLChvQzhhDM3ZOM5K-aItKunRJ9D2tQTDEe6-XciUe-lfD1K4c5ULxlWvm5XUyece9BSvondSu9dv26lfC9PwAlPUV0u3Ol1P2vru8S_Bp_EVK42KOQL0CI6jM1NBiAZOhGOBP5GvfoP1rG0Qp39QUdrxGKx0LDtL8h5XywyOw8CkWKmLg40GSFSnihnKH-kEGAU5QLGphlPPJOLtVlDrgovjPm_7oHTz9M4dSh7Q9ZxflVeBu8bL0rN6H5yD169txkBCzenihTBcREMHluqiYuc'
            let response = await fetch(
                Constants.BASE_URL + 'auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            this.setResponseValues(response.status, responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    setResponseValues(statusCode, responseJson) {
        if (statusCode == 200) {
            console.log("addressis*****", responseJson['business_info']);
            this.setState({ firstName: responseJson['first_name'] })
            this.setState({ lastName: responseJson['last_name'] })
            this.setState({ profileImage: responseJson['avatar'] })
            this.setState({ email: responseJson['email'] })
            this.setState({ phone: responseJson['phone'] })
            this.setState({ address: responseJson['business_info']['address'] })
            this.setState({ language: responseJson['language_id'] })
            this.setState({ website: responseJson['business_info']['website'] })
        }
    }

    goToEditBusinessProfile() {
        //console.log("gotoeditbusinessprofile******", this.props.navigation);
        this.props.navigation.navigate('ManageDeal');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {

        let splashImg = require("../../../../assets/splash_bg.png");
        let facebook = require("../../../../assets/facebook.png");
        let insta = require("../../../../assets/insta.png");
        let twitter = require("../../../../assets/twitter.png");
        let pin = require("../../../../assets/pin.png");
        // const {navigate} = this.props.navigation;

        return (
            <SafeAreaView style={styles.wrapper}>
                <Header style={{ backgroundColor: '#d55459' }}>
                    <Left>
                        <Button transparent onPress={this.goBack.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: 0 }}>
                        <Title style={{  }}>My Profile</Title>
                    </Body>
                </Header>

                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>

                    {/* <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ width: '100%', height: 180 }}>
                        <Image source={splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20, }}></Image>
                        <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10,  }}>Richard Grant</Text>
                    </LinearGradient> */}

                    {this.state.loading ?
                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#FF0000'
                            size="large"
                            style={styles.activityIndicator} />
                        :
                        <View>
                            <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 180, width: '100%' }}>
                                <View >
                                    <Image source={this.state.profileImage != '' ? { uri: this.state.profileImage } : splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
                                    <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', marginTop: 100, marginLeft: 240 }} onPress={this.goToEditBusinessProfile.bind(this)}>
                                        <Image source={splashImg} style={{ height: 30, width: 30, borderRadius: 30 }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10 }}>{this.state.firstName + " " + this.state.lastName}</Text>
                                </View>
                            </LinearGradient>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15, color: '#000000' }}>Details Info</Text>



                            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', borderColor: '#000000', borderRadius: 1, borderWidth: 1, height: 185, marginTop: 5, backgroundColor: '#FFFFFF' }}>

                                <View style={{ height: 45, flexDirection: 'row', width: '100%', marginTop: 5 }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Email:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.email}</Text>
                                </View>
                                <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Phone:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.phone}</Text>
                                </View>
                                <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Address:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.address}</Text>
                                </View>
                                <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Language:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.language}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{ width: 45, height: 45, position: 'absolute', alignSelf: 'flex-end', justifyContent: 'center', marginTop: 195 }}>
                                <Image source={pin} style={{ width: 30, height: 30, alignSelf: 'center' }}></Image>
                            </TouchableOpacity>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15, color: '#000000' }}>Social Media Accounts</Text>

                            <View style={{ height: 45, width: '90%', marginLeft: '5%', marginRight: '5%', backgroundColor: '#FFFFFF', marginTop: 10, flexDirection: 'row' }}>
                                <Image style={{ height: 30, width: 30, marginLeft: 10, alignSelf: 'center' }} source={facebook}></Image>
                                <Image style={{ height: 30, width: 30, marginLeft: 10, alignSelf: 'center' }} source={twitter}></Image>
                                <Image style={{ height: 30, width: 30, marginLeft: 10, alignSelf: 'center' }} source={insta}></Image>
                            </View>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15, color: '#000000' }}>Website</Text>
                            <View style={{ height: 45, width: '90%', marginLeft: '5%', marginRight: '5%', backgroundColor: '#FFFFFF', marginTop: 10, justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 10 }}>{this.state.website}</Text>
                            </View>

                        </View>}
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default ProfileTab;