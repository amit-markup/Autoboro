import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Share,
    Linking,
    Dimensions,
    RefreshControl,
    PermissionsAndroid
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
let deviceWidth = Dimensions.get('window').width
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { Rating } from 'react-native-ratings';
import getDirections from 'react-native-google-maps-directions'

const dataSource = []
const data = []
const BusinessPic = []
const datas = []
export default class Blog extends Component {
    constructor(props) {
        super(props);
        let BusinessID = this.props.navigation.getParam("BusinessID");
        console.log('BusinessID', BusinessID)
        this.state = {
            dataSource: dataSource,
            inputValue: '',
            BusinessID: BusinessID,
            data: data,
            datas: [],
            currentLongitude: '',
            currentLatitude: '',
            BusinessPic: BusinessPic,
            refreshing: false
        };
        this.ServiceDetail()
    }



    componentDidMount() {
        this.getAdreess();
    }


    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }


    getAdreess = async () => {
        var that = this;
        if (Platform.OS === 'ios') {
            this.callLocation(that);
        } else {
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        // @ts-ignore
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        'title': 'Location Access Required',
                        'message': 'This App needs to Access your location'
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        that.callLocation(that);
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    // @ts-ignore
                    alert("err", err);
                    console.warn(err)
                }
            }
            requestLocationPermission();
        }
    }
    callLocation(that) {
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);

                that.setState({
                    currentLongitude: currentLongitude,
                    currentLatitude: currentLatitude,
                });


                console.log(currentLatitude, currentLongitude)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: false, timeout: 3600000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude: currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude: currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        })

    }

    ServiceDetail = async () => {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var Token = profile.token
        console.log(Token)
        let formdata = new FormData();
        formdata.append("BusinessID", this.state.BusinessID);
        await fetch('http://autoboro.markupdesigns.org/api/businessDetails',
            {
                method: 'POST',
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    console.log("responseJson", JSON.stringify(responseJson))
                    this.setState({ dataSource: responseJson['data'][0] })
                    this.setState({ data: responseJson['data'] })
                    var dat = responseJson['data']
                    var string = dat[0].BusinessPic;
                    var image = string.split(",")
                    var amit = image
                    this.setState({ datas: amit })
                    console.log('dfstrtrtdrter', image)
                    console.log('dataSource', this.state.dataSource)
                }
                else
                    alert(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    goBack() {
        this.props.navigation.goBack();
    }
    ShareMessage = () => {
        Share.share({
            message: this.state.inputValue.toString(),
        })
            .then(result => console.log(result))
            .catch(errorMsg => console.log(errorMsg));
    };
    call() {
        Linking.openURL(`tel:${phoneNumber}`)
    }

    GoReviews() {
        let BusinessID = this.props.navigation.getParam("BusinessID");
        console.log('BusinessID', BusinessID)
        this.props.navigation.navigate('DriverReviews', { BusinessID: BusinessID })
    }



    async handleGetDirections() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var Latitude = profile.Latitude
        var Longitude = profile.Longitude
        console.log(profile)
        const data = {
            source: {
                latitude: this.state.currentLatitude,
                longitude: this.state.currentLongitude
            },
            destination: {
                latitude: Latitude,
                longitude: Longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
            waypoints: [
                {
                    latitude: -33.8600025,
                    longitude: 18.697452
                },
                {
                    latitude: -33.8600026,
                    longitude: 18.697453
                },
                {
                    latitude: -33.8600036,
                    longitude: 18.697493
                }
            ]
        }

        getDirections(data)
    }



    async Favorites() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var Token = profile.token
        var UID = profile.id
        console.log(Token)
        let formdata = new FormData();
        formdata.append("uid", UID);
        formdata.append("bid", this.state.BusinessID);
        await fetch('http://autoboro.markupdesigns.org/api/addFavorite',
            {
                method: 'POST',
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    console.log("responseJson", JSON.stringify(responseJson))
                    alert(responseJson.msg)
                }
                else
                    alert(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    renderItem = ({ item }) => {
        // var string = item.BusinessPic.split(",");
        // var image = string
        console.log('itemitemitemitem', "http://autoboro.markupdesigns.org/" + item.toString())
        // var array = string.split(",");
        // alert(array[0]);
        return (
            <View style={{ width: deviceWidth / 2, }}>
                <TouchableOpacity>
                    <Image style={styles.imageThumbnail}
                        source={{ uri: "http://autoboro.markupdesigns.org/" + item }} />
                </TouchableOpacity>
            </View>
        )
    }

    onRefresh() {
        this.ServiceDetail()
    }

    render() {

        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: "#ffffff" }}>
                    <Left>
                        <Button transparent onPress={this.goBack.bind(this)}>
                            {/* <Icon name='arrow-back'/> */}
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 25 }}>
                        <Title style={{ color: 'black' }}>Services Details</Title>
                    </Body>
                </Header>
                <ScrollView refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }>
                    <View style={{ marginTop: 5, borderRadius: 5, padding: 13 }}>
                        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Image
                                source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.dataSource.Avatar }}
                                style={{ width: deviceWidth / 1.1, height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                        </View>
                        <View style={{ padding: 16, width: deviceWidth / 1.1, alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row' }}>
                            <View style={{}}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>{this.state.dataSource.BusinessName}</Text>
                                <Text style={{ marginTop: 0, fontSize: 14 }}>{this.state.dataSource.BusinessDescription}</Text>
                            </View>
                            <View style={{ paddingLeft: 30, paddingTop: 3 }}>
                                <Text style={{ color: 'red', fontSize: 11 }}>Open-Close {this.state.dataSource.BusinessStartTime} - {this.state.dataSource.BusinessEndTime}</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', marginTop: -13, paddingLeft: 25 }}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={10}
                                startingValue={this.state.dataSource.rating}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 1, width: deviceWidth / 1.1, alignSelf: 'center', }}>
                        <Text>Gas Prices</Text>
                        <View style={{ marginTop: 5, backgroundColor: '#424244', borderRadius: 5, padding: 15 }}>
                            <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ backgroundColor: '#d3d3d3', borderRadius: 8, padding: 5 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>$ {this.state.dataSource.Regular}</Text>
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 11, alignSelf: 'center' }}>Regular</Text>
                                </View>
                                <View>
                                    <View style={{ backgroundColor: '#d3d3d3', borderRadius: 8, padding: 5 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>$ {this.state.dataSource.Midgrade}</Text>
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 11, alignSelf: 'center' }}>Moderate</Text>
                                </View>
                                <View>
                                    <View style={{ backgroundColor: '#d3d3d3', borderRadius: 8, padding: 5 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>$ {this.state.dataSource.Premium}</Text>
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 11, alignSelf: 'center' }}>Premium</Text>
                                </View>
                                <View>
                                    <View style={{ backgroundColor: '#d3d3d3', borderRadius: 8, padding: 5 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>$ {this.state.dataSource.Diesel}</Text>
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 11, alignSelf: 'center' }}>Diesel</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white', fontSize: 14, alignSelf: 'center' }}>Last Updated on {this.state.dataSource.is_updated}</Text>
                        </View>
                    </View>
                    <View style={{ width: deviceWidth / 1.1, alignSelf: 'center', marginTop: 10, marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold' }}>Gallery</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DriverServiceGallery')}>
                                <Text style={{ color: 'red', marginRight: 5 }}>See More ></Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.datas}
                            numColumns={2}
                            renderItem={item => this.renderItem(item)}
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                        />
                        {/* {this.service()} */}
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity onPress={() => this.GoReviews()} style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={{ uri: 'https://yourfitnesstools.com/wp-content/uploads/2020/01/product-reviews-featured-image.png' }} style={{ width: 40, height: 40, borderRadius: 30 }} />
                        <Text>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => this.Favorites()}>
                        <Image source={require('../../../../assets/images/Favorite-red.png')} style={{ width: 40, height: 40, borderRadius: 30 }} />
                        <Text>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('tel:'); }} style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={require('../../../../assets/images/call.png')} style={{ width: 40, height: 40, borderRadius: 30 }} />
                        <Text>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.ShareMessage} style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={require('../../../../assets/images/share.png')} style={{ width: 40, height: 40, borderRadius: 30 }} />
                        <Text>Share</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 12 }}>
                    <TouchableOpacity onPress={() => this.handleGetDirections()} style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#c2c2c2', padding: 15, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../../assets/images/Get-Directions.png')} style={{ width: 15, height: 15 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 4, }}>GET DIRECTION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DriverReport')} style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#c2c2c2', padding: 15, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../../assets/images/report-a-problem.png')} style={{ width: 15, height: 15 }} />
                        <Text style={{ marginLeft: 4, fontSize: 12, fontWeight: 'bold' }}>REPORT A PROBLEM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150, width: 165,
        borderRadius: 8
    },

    mainImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain'
    },

    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },

    TouchableOpacity_Style: {
        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute'
    }
}); 