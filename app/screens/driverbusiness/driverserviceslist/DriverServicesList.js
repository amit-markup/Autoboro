import React from 'react';
import { View, Image, Slider, RefreshControl, PermissionsAndroid, TouchableOpacity, StatusBar, Modal, TouchableWithoutFeedback, TouchableHighlight, FlatList, ImageBackground, Dimensions } from 'react-native';
import styles from './styles';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { Header, Item, Input, Icon, Button, Text, Right, List, ListItem, CheckBox, Left, Body, Title } from 'native-base';
import { Rating } from 'react-native-ratings';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';

class DriverServicesList extends React.Component {

    constructor(props) {
        super(props);

        let Serviceid = this.props.navigation.getParam("Serviceid");
        console.log('Serviceid', Serviceid)
        this.state = {
            dataSource: [],
            isFilter: false,
            Serviceid: Serviceid,
            value: 0,
            currentLatitude: '',
            currentLongitude: '',
            distance: 0,
            refreshing:false
        }
        this.ServiceListing();
    }



    componentDidMount() {
        this.getAdreess()
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


    getFilterData = async () => {
        let val = this.state.value
        if (val != 0) {
            console.log('hjh')
            this.setState({ isFilter: false })
            const { currentLatitude } = this.state
            const { currentLongitude } = this.state
            const { value } = this.state
            // const {selectedLists} = this.state
            let formdata = new FormData();
            formdata.append("ServicesID", this.state.Serviceid);
            formdata.append("Latitude", currentLatitude);
            formdata.append("Longitude", currentLongitude);
            formdata.append("Distance", value);
            //   formdata.append("category_id",selectedLists.toString());
            await fetch('http://autoboro.markupdesigns.org/api/businessListing',
                {
                    method: 'POST',
                    body: formdata
                }
            ).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status === 'Success') {
                        console.log("filter data ---", JSON.stringify(responseJson))
                        let getData = responseJson['data']['Listing']
                        this.setState({
                            dataSource: getData
                        })
                    }
                    else
                        alert(responseJson.msg)

                }).catch((error) => {
                    console.error(error);
                })

        }
        else {
            alert('enter')
        }

    }



    ServiceListing = async () => {
        let formdata = new FormData();
        console.log('formdata', formdata)
        formdata.append("ServicesID", this.state.Serviceid);
        await fetch('http://autoboro.markupdesigns.org/api/businessListing',
            {
                method: 'POST',
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    console.log("responseJson", JSON.stringify(responseJson))
                    this.setState({ dataSource: responseJson['data']['Listing'] })
                    this.setState({ FreshDataList: responseJson['data']['Listing'] })
                    console.log('dataSource', this.state.dataSource)
                }
                else
                    alert(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    goToServiceDetails(item) {
        let Serviceid = this.props.navigation.getParam("Serviceid");
        this.props.navigation.navigate('DriverServiceDetails', { BusinessID: item.id, Serviceid:Serviceid });
    }

    searchFilterFunction = (term) => {
        let FreshDataList = [...this.state.FreshDataList]
        if (term === '') {
            this.setState({ dataSource: FreshDataList })
        } else {
            var term = term.toUpperCase()
            var filterList = FreshDataList.filter(item => {
                return item.BusinessName.toUpperCase().includes(term)
            })
            this.setState({ dataSource: filterList })
        }
    };

    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value),
            };
        });
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ width: '48%', height: 190, backgroundColor: '#FFFFFF', marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.goToServiceDetails(item)}>
                    <Image
                        source={{ uri: "http://autoboro.markupdesigns.org/" + item.Avatar }}
                        style={{ width: '100%', height: 120 }} />
                    <Text style={{ color: "#000000", fontSize: 12, width: '100%', textAlign: 'left', paddingLeft: 5, fontWeight: 'bold' }}>{item.BusinessName}</Text>
                    <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                        <Text style={{ color: '#000000', alignSelf: 'center', textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Price</Text>
                        <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}>{item.Regular} $</Text>
                    </View>
                    <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                        <Text style={{ color: '#000000', alignSelf: 'center', textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Distance</Text>
                        <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}> {Math.floor(getDistance({ latitude: this.state.currentLatitude, longitude: this.state.currentLongitude }, {
                            latitude: item.Latitude,
                            longitude: item.Longitude,
                        }, 1) / 1000)} Miles Away</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', marginTop: 5, paddingLeft: 5 }}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={10}
                            startingValue={item.rating}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    goBack() {
        this.props.navigation.goBack();
    }

    open() {
        this.setState({ isFilter: true })
    }

    onRefresh() {
        this.ServiceListing()
    }

    render() {
        let splashImg = require("../../../../assets/sample1.jpg");
        return (
            <SafeAreaView style={styles.wrapper}>
                <Header style={{ backgroundColor: "#ffffff" }}>
                    <Left>
                        <Button transparent>
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 55 }}>
                        <Title style={{ color: 'black' }}>Services</Title>
                    </Body>
                </Header>
                <View style={{ width: '100%', height: 120, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: '45%', marginLeft: '5%', paddingRight: 2 }}>
                        <Image source={splashImg} style={{ height: 120, width: '100%' }}></Image>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', marginLeft: 100 }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '45%', marginRight: '5%', paddingLeft: 2 }}>
                        <Image source={splashImg} style={{ height: 120, width: '100%' }}></Image>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', marginLeft: 100 }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 5 }}>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                </View>
                <Header style={{ backgroundColor: 'transparent', marginLeft: 5 }} searchBar rounded noLeft noShadow>
                    <Item>
                        <Input placeholder="Search" onChangeText={text => this.searchFilterFunction(text)} />
                        <Icon name="ios-search" />
                    </Item>
                    <Right style={{ backgroundColor: '#383232', maxWidth: 45, marginLeft: 10, justifyContent: 'center', marginRight: 5 }}>
                        <TouchableWithoutFeedback style={{ backgroundColor: '#383232', margin: 5 }} onPress={() => this.setState({ isFilter: true })}>
                            <Icon name="ios-funnel" style={{ fontSize: 25, padding: 6, color: 'white', backgroundColor: '#383232' }} />
                        </TouchableWithoutFeedback>
                    </Right>
                </Header>
                <ScrollView refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    } style={{  }}>
                    <FlatList
                        numColumns={2}
                        data={this.state.dataSource}
                        contentContainerStyle={[styles.container, {marginBottom:50}]}
                        renderItem={item => this.renderItem(item)}
                        // keyExtractor={item => item.id.toString()}
                        extraData={this.state}
                        columnWrapperStyle={styles.row} />
                </ScrollView>
                <Modal
                    transparent={true}
                    visible={this.state.isFilter}
                    animationType='slide'
                    onRequestClose={this.closeModal}>

                    <View style={{
                        position: 'relative',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                        justifyContent: 'space-between',

                        backgroundColor: 'white'
                    }}>
                        <TouchableHighlight onPress={() => this.setState({ isFilter: false, }, () => { this.getMoreData })} style={{ alignItems: 'flex-end' }}>

                            <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
                        </TouchableHighlight>
                        <View style={{
                            flex: 1
                        }}>
                            <List style={{ borderColor: '#e26d0e', borderWidth: 1, backgroundColor: 'white' }}>
                                <ListItem itemDivider style={{ backgroundColor: '#e26d0e', padding: 0, }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Sort By Distance</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: 'white', padding: 0 }} >
                                    <Left>
                                        <Slider
                                            step={1}
                                            maximumValue={30}
                                            onSlidingComplete={this.change.bind(this)}
                                            onValueChange={this.change.bind(this)}
                                            style={{ flex: 1 }}
                                            value={this.state.value}
                                            thumbTintColor='#e26d0e'
                                            maximumTrackTintColor='black'
                                            minimumTrackTintColor='#e26d0e'
                                        />
                                    </Left>
                                    <Right>
                                        <Text style={{ color: '#5c391b', fontSize: 14 }}>{this.state.value} Miles</Text>
                                    </Right>
                                </ListItem>
                            </List>

                            <Button block style={{ marginHorizontal: 20, marginTop:100, backgroundColor: '#e26d0e', }} onPress={this.getFilterData} >
                                <Text>Apply</Text>
                            </Button>
                            <Text>
                            </Text>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        )
    }
}

export default DriverServicesList;