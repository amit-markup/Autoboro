import React from 'react';
import { View, Image, Text, ActivityIndicator, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import { Container, Left, Body, Right, Button, Title, Item, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Icon } from 'react-native-elements';
let deviceWidth = Dimensions.get('window').width

class DriverProfileTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImage: '',
            loading: true,
            carType: '',
            carModel: '',
            firstName: '',
            lastName: '',
        }
        this.getProfileData();
    }

    async getProfileData() {
        try {
            // let authToken = '';
            // AsyncStorage.getItem('driverToken').then((driverToken) => {
            //     if(driverToken){
            //         authToken = driverToken;
            //         console.log("tokenis***1***" + authToken);
            //     }
            // });
            // AsyncStorage.getItem('businessToken').then((businessToken) => {
            //     if(businessToken){
            //         authToken = businessToken;
            //         console.log("tokenis***2***" + authToken);
            //     }
            // });
            var profile = JSON.parse(await AsyncStorage.getItem("profile"));
            //console.log('profile', profile)
            let authToken = profile.token;
            //console.log('profile', authToken)
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
            console.log('fdjsioadjfuisdgj', responseJson)
            this.success(responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    // setResponseValues(statusCode, responseJson){
    //     let that = this;
    //     if(statusCode == 200){
    //         this.setState({profileImage:responseJson['avatar']})
    //         this.setState({firstName:responseJson['first_name']})
    //         this.setState({lastName:responseJson['last_name']})
    //         let carType = responseJson['car_info'];
    //         carType.forEach(function(item){
    //             console.log("itemis******", item['car_brand']);
    //             that.setState({carType:item['car_brand']})
    //             that.setState({carModel:item['car_model']})
    //         });
    //     }
    // }

    async success(profiless) {
        console.log('profile', profiless)
        var image = profiles.avatar
        console.log('image', image)
        await AsyncStorage.setItem("profiles", JSON.stringify(profiless));
        let carType = profiles.car_info
        this.setState({
            firstName: profiless.first_name,
            lastName: profiless.last_name,
            profileImage: profiless.avatar,
            carType: carType.item.car_brand,
            carType: carType.item.car_type,
        })
    }


    goBack() {
        this.props.navigation.navigate('DriverProfileTab');
    }

    render() {

        let splashImg = require("../../../../assets/splash_bg.png");

        let car = require("../../../../assets/car.png");
        let back = require('../../../../assets/t13.png');
        let model = require("../../../../assets/model.png");
        let years = require("../../../../assets/years.png");
        let vin = require("../../../../assets/vin-no.png");
        let register = require("../../../../assets/register-no.png");
        let calender = require("../../../../assets/years.png");

        return (
            <SafeAreaView style={{ minHeight: '100%', backgroundColor: '#f1f1f1', }}>
                {/* <Text style={{ height: 30, alignSelf: 'flex-start', marginLeft: '5%', marginRight: '5%', color: '#000000', marginTop: 10 }}>Profile Tab</Text> */}

                <Header
                    leftComponent={<TouchableOpacity transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom:21, transform: [{ rotate: '185deg' }] }} /></TouchableOpacity>}
                    centerComponent={{ text: 'Setting and Information', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    //rightComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/t13.png')} style={{width:25, height:25, marginBottom:25}} /></Button>}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />

                <View style={{ backgroundColor: '#fff', justifyContent: 'center', width: deviceWidth / 1.1, marginTop: 20, borderRadius: 10, alignSelf: 'center' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2 }}>
                        <Image source={require('../../../../assets/images/Oil-Change.png')} style={{ marginLeft: 10, width:27, height:27 }} />
                        <Text style={{ marginLeft: 10 }}>Oil Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2, }}>
                        <Image source={require('../../../../assets/images/Tires-Changed.png')} style={{ marginLeft: 10, width:27, height:27  }} />
                        <Text style={{ marginLeft: 10 }}>Tire Rotation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2, }}>
                        <Image source={require('../../../../assets/images/Tires-Changed.png')} style={{ marginLeft: 10, width:27, height:27  }} />
                        <Text style={{ marginLeft: 10 }}>Tires Changed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2, }}>
                        <Image source={require('../../../../assets/images/Brakes-Replaced.png')} style={{ marginLeft: 10, width:27, height:27  }} />
                        <Text style={{ marginLeft: 10 }}>Brakes Replaced/Checked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2, }}>
                        <Image source={require('../../../../assets/images/Vehicle-Registration.png')} style={{ marginLeft: 10, width:27, height:27  }} />
                        <Text style={{ marginLeft: 10 }}>Vehicle Registration</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('DriverSetting')} style={{ flexDirection: 'row', borderBottomColor: '#cecaca', marginTop: 13, height: 35, borderBottomWidth: 0.2, }}>
                        <Image source={require('../../../../assets/images/Safety-and-Emissions.png')} style={{ marginLeft: 10, width:27, height:27  }} />
                        <Text style={{ marginLeft: 10 }}>Safaty and Emissions</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default DriverProfileTab;