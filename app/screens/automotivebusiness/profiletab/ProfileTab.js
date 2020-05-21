import React from 'react';
import { View, Image, RefreshControl, Text, Linking, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Avatar } from 'react-native-elements';
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
            refreshing:false
        }
    }

    componentDidMount() {
        this.getProfileData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.navigation.getParam('BusinessProfile') !== prevProps.navigation.getParam('BusinessProfile')) {
            this.getProfileData()
        }

    }

    async getProfileData() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var ProfileId = profile.id
        var Token = profile.token
        let formdata = new FormData();
        formdata.append("id", ProfileId);
        await fetch('http://autoboro.markupdesigns.org/api/businessViewProfile',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    this.result(responseJson['data'][0])
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    async result(BusinessProfile){
        console.log(BusinessProfile)
        this.setState({
            firstName: BusinessProfile['FirstName'],
            lastName: BusinessProfile['LastName'],
            profileImage: BusinessProfile['Avatar'],
            email: BusinessProfile['Email'],
            phone: BusinessProfile['PhoneNumber'],
            address: BusinessProfile['BusinessAddress'],
            website: BusinessProfile['BusinessWebsite'],
            language: BusinessProfile['Language']['name'],
        })
        

    }
    async goToEditBusinessProfile() {
        this.props.navigation.navigate('EditBusinessProfile',  );
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
                          <TouchableOpacity style={{ marginBottom: 20 }} onPress={()=> this.props.navigation.navigate('BusinessReviews')}>
                            <Image source={{uri:'https://yourfitnesstools.com/wp-content/uploads/2020/01/product-reviews-featured-image.png'}} style={{ width: 20, height: 20, marginBottom: 1, borderRadius:30 }} />
                          </TouchableOpacity>
                        </View>}
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
                            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', borderColor: '#000000', borderRadius: 1, borderWidth: 1, height: 200, marginTop: 5, backgroundColor: '#FFFFFF' }}>
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
                                <Image style={{ height: 25, width: 25, marginLeft: 10, alignSelf: 'center' }} source={facebook}></Image>
                                <Image style={{ height: 25, width: 25, marginLeft: 10, alignSelf: 'center' }} source={twitter}></Image>
                                <Image style={{ height: 25, width: 25, marginLeft: 10, alignSelf: 'center' }} source={insta}></Image>
                            </View>
                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15, color: '#000000' }}>Website</Text>
                            <View style={{ height: 45, width: '90%', marginLeft: '5%', marginRight: '5%', backgroundColor: '#FFFFFF', marginTop: 10, justifyContent: 'center' }}>
                                <Text style={{ color: 'blue', marginLeft: 10 }} onPress={() => Linking.openURL(this.state.website)}>{this.state.website}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Logout')} style={{ alignSelf: 'center', marginTop:25, padding: 15, backgroundColor: '#d55459', marginBottom: 20, width:160, borderRadius:10 }}>
                                <Text style={{color:'white', alignSelf:'center'}}>LOG OUT</Text>
                            </TouchableOpacity>
                        </View>
                        {/* } */}
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default ProfileTab;