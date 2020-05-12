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
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import { Container, Left, Body, Right, Button, Icon, Title } from 'native-base';
let deviceWidth = Dimensions.get('window').width
import { Header } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

export default class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      currentLatitude: '',
      currentLongitude: '',
      loading:true
    };
  }


  componentDidMount() {
    this.getAdreess();
    this._interval = setTimeout(() => {
      this.getDeal();
    }, 16000);
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

  async getDeal() {
    let DealId = this.props.navigation.getParam("DealId");
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("Latitude", this.state.currentLatitude);
    formdata.append("Longitude", this.state.currentLongitude);
    formdata.append("DealID", DealId);
    await fetch('http://autoboro.markupdesigns.org/api/driverDealListing',
      {
        method: 'POST',
        body: formdata
      }
    ).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 'Success') {
          this.setState({ loading: false })
          this.setState({ dataSource: responseJson['data']['Listing'][0] })
          console.log('dataaaaaa', this.state.dataSource)
        }
      }).catch((error) => {
        console.error(error);
      })

  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Deal Details', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        {this.state.loading ?

        <ActivityIndicator
          animating={this.state.loading}
          color='#FF0000'
          size="large"
          style={styles.activityIndicator} />
        :
        <View>
        <View style={{ marginTop: 5, borderRadius: 5, padding: 10 }}>
          <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <Image source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.dataSource.DealPic }} style={{ width: deviceWidth / 1.1, height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
          </View>
          <View style={{ padding: 16, width: deviceWidth / 1.1, alignSelf: 'center', backgroundColor: 'white', }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>{this.state.dataSource.DealName}</Text>
            <Text style={{ marginTop: 5, fontSize: 14 }}>{this.state.dataSource.Description}</Text>
          </View>
        </View>
        <View style={{ padding: 16, backgroundColor: 'white', width: deviceWidth / 1.1, alignSelf: 'center', borderRadius: 4, alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Price:</Text>
            <Text style={{ fontSize: 12, color: 'red' }}>$ - {this.state.dataSource.DealPrice}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{this.state.dataSource.DealOffer}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 12 }}>Offer expires {this.state.dataSource.is_valid}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>Distance:</Text>
            <Text style={{ fontSize: 12, color: 'red' }}>{this.state.dataSource.distance} Miles</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>Location:</Text>
            <Text style={{ fontSize: 12, }}> {this.state.dataSource.BusinessAddress}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ClaimRewardDriver')} style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#51bc12', padding: 15, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../../assets/images/Claim-Now.png')} style={{ width: 19, height: 19 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 4, color: 'white' }}>CLAIM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#c2c2c2', padding: 15, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../../assets/images/Get-Directions.png')} style={{ width: 19, height: 19 }} />
            <Text style={{ marginLeft: 4, fontSize: 15, fontWeight: 'bold' }}>GET DIRECTION</Text>
          </TouchableOpacity>
        </View>
      </View>}
      </ScrollView>
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