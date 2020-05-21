import React from 'react';
import { View, Image, Text,RefreshControl, Linking, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Header, Avatar } from 'react-native-elements';
class ProfileTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            profileImage: '',
            email: '',
            phone: '',
            DOB: '',
            language: '',
            VinNumber: '',
            CarRegistrationNumber: '',
            firstName: '',
            lastName: '',
            carModel: '',
            carBrand: '',
            FuelType: '',
            refreshing:false
        }
    }

    componentDidMount() {
        this.getProfileData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.navigation.getParam('DriverProfile') !== prevProps.navigation.getParam('DriverProfile')) {
            this.getProfileData()
        }

    }

    async getProfileData() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var ProfileId = profile.id
        var Token = profile.token
        console.log('Token', Token)
        let formdata = new FormData();
        console.log('formdata', formdata)
        formdata.append("id", ProfileId);
        await fetch('http://autoboro.markupdesigns.org/api/driverViewProfile',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log('formdata', responseJson)
                if (responseJson.status === 'Success') {
                    this.result(responseJson['data'][0])
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    async result(DriverProfile) {
        this.setState({
            firstName: DriverProfile['FirstName'],
            lastName: DriverProfile['LastName'],
            profileImage: DriverProfile['Avatar'],
            email: DriverProfile['Email'],
            phone: DriverProfile['PhoneNumber'],
            DOB: DriverProfile['DOB'],
            CarRegistrationNumber: DriverProfile['CarRegistrationNumber'],
            VinNumber: DriverProfile['VinNumber'],
            carModel: DriverProfile['carModel'],
            carBrand: DriverProfile['CarMake'],
            FuelType: DriverProfile['FuelType'],
            language: DriverProfile['Language']['name'],
        })
    }
    goToEditBusinessProfile() {
        this.props.navigation.navigate('DriverEditProfile');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    onRefresh() {
        this.getProfileData()
    }

    render() {
        let splashImg = require("../../../../assets/splash_bg.png");
        let facebook = require("../../../../assets/images/facebook.png");
        let insta = require("../../../../assets/images/Instagram.png");
        let twitter = require("../../../../assets/images/twitter.png");
        let pin = require("../../../../assets/images/edit-profile.png");
        return (
            <SafeAreaView style={styles.wrapper}>
                <Header
                    centerComponent={{ text: 'Profile', style: { color: '#fff', marginBottom: 25, fontSize: 16 } }}
                    rightComponent={
                        <View style={{ flexDirection: 'row', }}>
                          <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => this.props.navigation.navigate("DriverInbox")}>
                            <Image source={require('../../../../assets/images/white-inbox.png')} style={{ width: 20, height: 20, marginBottom: 1 }} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate("DriverSetting")}>
                            <Image source={require('../../../../assets/images/white-setting.png')} style={{ width: 18, height: 18, marginBottom: 2 }} />
                          </TouchableOpacity>
                        </View>
                      }
                    containerStyle={{
                        backgroundColor: '#d55459',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />

                <ScrollView refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    } contentContainerStyle={{ minHeight: '100%' }}>
                    {/* {this.state.loading ?
                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#FF0000'
                            size="large"
                            style={styles.activityIndicator} />
                        : */}
                    <View>
                        <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 180, width: '100%' }}>
                            <View style={{ marginTop: 5 }}>
                                <Avatar
                                    size={110}
                                    onEditPress={() => this.goToEditBusinessProfile()}
                                    overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                    rounded
                                    icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                                    containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center', marginTop: 10 }}
                                    //source={{ uri: this.state.profileImage }}
                                    source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.profileImage }}
                                    imageProps={{ resizeMode: 'cover' }}
                                    showEditButton
                                />
                                <Text style={{ color: '#FFFFFF', alignSelf: 'center',  marginTop: 10 }}>{this.state.firstName} {this.state.lastName}</Text>
                            </View>
                        </LinearGradient>

                        <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15, color: '#000000' }}>Details Info</Text>
                        <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', borderColor: '#000000', borderRadius: 1, borderWidth: 1, height: 290, marginTop: 5, backgroundColor: '#FFFFFF' }}>
                            <View style={{ height: 45, flexDirection: 'row', width: '100%', marginTop: 5 }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Email:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.email}</Text>
                            </View>
                            <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Phone:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.phone}</Text>
                            </View>
                            <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>DOB:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.DOB}</Text>
                            </View>
                            <View style={{ height: 45, flexDirection: 'row', width: '185%' }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Car Registration Number:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center' }}>{this.state.CarRegistrationNumber}</Text>
                            </View>
                            <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Vin Number:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.VinNumber}</Text>
                            </View>
                            <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Language:</Text>
                                <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.language}</Text>
                            </View>
                            {/* <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Car Brand:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.carBrand}</Text>
                                </View>
                                <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Car Model:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.carModel}</Text>
                                </View>
                                <View style={{ height: 45, flexDirection: 'row', width: '100%' }}>
                                    <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex: 0.5 }}>Fuel Type:</Text>
                                    <Text style={{ color: '#000000', marginRight: 10, textAlign: 'right', alignSelf: 'center', flex: 1.5 }}>{this.state.FuelType}</Text>
                                </View> */}
                        </View>
                        <TouchableOpacity style={{ width: 45, height: 45, position: 'absolute', alignSelf: 'flex-end', justifyContent: 'center', marginTop: 195 }}>
                            <Image source={pin} style={{ width: 30, height: 30, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Logout')} style={{ alignSelf: 'center', marginTop:25, padding: 15, backgroundColor: '#d55459', marginBottom: 20, width:160, borderRadius:10 }}>
                                <Text style={{color:'white', alignSelf:'center'}}>LOG OUT</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Reward')} style={{ alignSelf: 'center', marginTop:25, padding: 15, backgroundColor: '#d55459', marginBottom: 20, width:160, borderRadius:10 }}>
                                <Text style={{color:'white', alignSelf:'center'}}>Reward</Text>
                            </TouchableOpacity> */}
                    </View>
                    {/* } */}
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default ProfileTab;