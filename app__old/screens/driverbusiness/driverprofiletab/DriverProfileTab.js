import React from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

class DriverProfileTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImage: '',
            loading:true,
            carType:'',
            carModel:'',
            firstName:'',
            lastName:'',
        }
        this.getProfileData();
    }

    async getProfileData(){
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
            authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYxYzRhOGIxMDNiYmRlYTcwYjY1MzRmZjhlZTAzYmRiZDg4MmVlNTAzNmI3OTQ1YjBmM2MxZWM4YThlOWRkODMzZTIwMDBhY2Q0OTFiNDE0In0.eyJhdWQiOiIxIiwianRpIjoiNjFjNGE4YjEwM2JiZGVhNzBiNjUzNGZmOGVlMDNiZGJkODgyZWU1MDM2Yjc5NDViMGYzYzFlYzhhOGU5ZGQ4MzNlMjAwMGFjZDQ5MWI0MTQiLCJpYXQiOjE1ODA5ODQ1NDMsIm5iZiI6MTU4MDk4NDU0MywiZXhwIjoxNjEyNjA2OTQzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.bIHBv1hGIqQeYFwteJda1wJx0QBY13Kqjbpr5MwL8NW25D1gq1LN4eN8NXNAx31eBURSVBDdEh3H4bwyVbGfOA_2AjL9bLkrypyQ6S9bolV-w4wxPH6L-xVqcWCM0jh-S_zuPVrsAZCh_PDBcy1OHmbJAukFGGQgB-77gFD76vBGsk8LvcGNc4dy1wM0XLpHkXvmB8zV-jB1RBstL3X9HHJ8ahTpvDCGQ5QDo_TwrtfuzzPf7whY0DpB8Ovd6TcFhE9Wquva7R6elvDYIrnjg1YpggwuupTCMEvihdZlnbHG58eJpeH9Kmkf2r6jITa-Qbu92XOYGVbOcDUH_gn6OwlprQeOsLIDA8mTPyMlRxTX5Fadcr77tY9dFqtAQIH1UGEacJRsojrGHVy9_3YaRf5uLbmspxp2ss2iqcirKaGTWxoU_SacZ0Ii6tTq-UiQu6P5M77TCagEuSLeL4loqnVi6Utp0Y68e-Q325JAu_1zz0qsB5pprgstjJc52m4CW5HPsGgIj_eA-L7oFzpqRgo-LCFD3aWQ8CeHhu8dWwBzv26Ox9sdq1ufGEtAARtUChs_OgbFlTMQ72OfugVTXIqUilGbVprDOrP_x_D_Mdu8pcS2EEHSZd9Xcj4PKO7Gc3oVA06t7zarLdXqnr8OJAQTOKFwEXWTg1ZB0kZbHU0'
            let response = await fetch(
                Constants.BASE_URL + 'auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+authToken,
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

    setResponseValues(statusCode, responseJson){
        let that = this;
        if(statusCode == 200){
            this.setState({profileImage:responseJson['avatar']})
            this.setState({firstName:responseJson['first_name']})
            this.setState({lastName:responseJson['last_name']})
            let carType = responseJson['car_info'];
            carType.forEach(function(item){
                console.log("itemis******", item['car_brand']);
                that.setState({carType:item['car_brand']})
                that.setState({carModel:item['car_model']})
            });
        }
    }

    render() {

        let splashImg = require("../../../../assets/splash_bg.png");

        return (
            <SafeAreaView style={styles.wrapper}>
                {/* <Text style={{ height: 30, alignSelf: 'flex-start', marginLeft: '5%', marginRight: '5%', color: '#000000', marginTop: 10 }}>Profile Tab</Text> */}
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ alignSelf: 'center' }}>My Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>

                {this.state.loading ?
                            <ActivityIndicator
                                animating={this.state.loading}
                                color='#FF0000'
                                size="large"
                                style={styles.activityIndicator} />
                            :
                    <View>
                    <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ width: '100%', height: 180 }}>
                        <View style={{ width: '100%', height: 180 }}>
                            <Image source={this.state.profileImage != '' ? { uri: this.state.profileImage } : splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'absolute', marginLeft: 240, marginTop: 90 }}>
                                <Image source={splashImg} style={{ width: 30, height: 30 }}></Image>
                            </TouchableOpacity>
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10,  }}>{this.state.firstName+" "+this.state.lastName}</Text>
                        </View>
                    </LinearGradient>

                    {/* <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({ email: text })}/>
            </Item> */}

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>{this.state.carType}</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>{this.state.carModel}</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>Manufacturing</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>Odometer Reading</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>Insurance Provider</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>Insurance Policy Number</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>License Number</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <View style={styles.viewLabel1}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', flex:0.25 }} source={splashImg}></Image>
                        <Text style={{ color: '#000000', marginLeft: 10, alignSelf: 'center', flex:2 }}>Expiration Date</Text>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10, flex:0.25 }} source={splashImg}></Image>
                    </View>

                    <Button block style={{width:'90%', marginLeft:'5%', marginRight:'5%', marginTop:15, backgroundColor:'#de1f27'}}>
                        <Text style={{color:'#FFFFFF', }}>VEHICLE SETTINGS</Text>
                    </Button>

                    <View style={{ height: 75, width: '100%' }}></View>

                    </View>}
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default DriverProfileTab;