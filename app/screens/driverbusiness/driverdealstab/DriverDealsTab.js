import React from 'react';
import { View, Image, RefreshControl, ActivityIndicator, Platform, PermissionsAndroid, TouchableOpacity, Slider, Modal, TouchableHighlight, ScrollView, FlatList, ImageBackground, Dimensions } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Item, Input, Icon, Button, Text, Right, List, ListItem, Left, Body, Title } from 'native-base';
import { Rating } from 'react-native-ratings';
let deviceWidth = Dimensions.get('window').width
import { Header } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

class DriverServicesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?tree",
        // require('./assets/images/girl.jpg'),
      ],
      currentLatitude: '',
      currentLongitude: '',
      Radius: '60',
      loading: false,
      refreshing: false,
      isFilter: false,
      value: 0,
      loading: true,
    }
  }


  componentDidMount() {
    this.getAdreess();
    this.getDeal();
    this._interval = setTimeout(() => {
      this.getDeal();
    }, 18000);
    // setInterval(() => {
    //   this.getDeal();
    //  }, 4000);
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
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    console.log(Token)
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("Latitude", this.state.currentLatitude);
    formdata.append("Longitude", this.state.currentLongitude);
    formdata.append("Radius", this.state.Radius);
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
          this.setState({ dataSource: responseJson['data']['Listing'] })
        }
      }).catch((error) => {
        console.error(error);
      })

  }



  getFilterData = async () => {
    let val = this.state.value
    if (val != 0) {
      console.log('hjh')
      this.setState({ isFilter: false })
      const { value } = this.state
      let formdata = new FormData();
      console.log('formdata', formdata)
      formdata.append("Latitude", this.state.currentLatitude);
      formdata.append("Longitude", this.state.currentLongitude);
      formdata.append("Radius", value);
      //   formdata.append("category_id",selectedLists.toString());
      await fetch('http://autoboro.markupdesigns.org/api/driverDealListing',
        {
          method: 'POST',
          body: formdata
        }
      ).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.status === 'Success') {
            let getData = responseJson['data']['Listing']
            this.setState({ dataSource: getData })
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

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }

  DriverDealsDetails(item) {
    var DealId = item.item.id
    this.props.navigation.navigate('DriverDealsDetails', { DealId: DealId });
  }


  renderItem = (item) => {
    console.log('dfsdf', item)
    return (
      <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} onPress={() => this.DriverDealsDetails(item)}>
        <View style={styles.imageContainer}>
          <Image style={styles.cardImage} source={{ uri: "http://autoboro.markupdesigns.org/" + item.item.DealPic }} />
        </View>
        <View style={[styles.cardContent, { padding: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
          <View style={{ flexDirection: 'row', }}>
            <Text style={[styles.title, { color: 'black', fontSize: 13, fontWeight: 'bold' }]}>{item.item.DealName}</Text>
          </View>
          <Text style={{ fontSize: 11 }}>${item.item.DealPrice}</Text>
          <Text style={{ fontSize: 11 }}>{item.item.Description}</Text>
          <Text style={styles.count}>{item.item.DealOffer}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  goBack() {
    this.props.navigation.goBack();
  }

  onRefresh() {
    this.getDeal()
  }


  render() {


    return (
      <View style={styles.wrapper}>
        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 18, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Deals', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
          rightComponent={
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => this.props.navigation.navigate("Reward")}>
                <Image source={require('../../../../assets/images/inbox.png')} style={{ width: 20, height: 20, marginBottom: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isFilter: true })}>
                <Image source={require('../../../../assets/images/filter.png')} style={{ width: 18, height: 18, marginBottom: 2 }} />
              </TouchableOpacity>
            </View>
          }
          containerStyle={{
            backgroundColor: '#fff',
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
        }>
          <View style={{ flex: 1, marginTop: 15 }}>
            <SliderBox
              images={this.state.images}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              ImageComponentStyle={{ borderRadius: 5, width: '88%' }}
            />
            <Text style={{ alignSelf: 'flex-end', paddingRight: 30, fontSize: 14 }}>E-Advertisement</Text>
          </View>
          {this.state.loading ?

            <ActivityIndicator
              animating={this.state.loading}
              color='#FF0000'
              size="large"
              style={styles.activityIndicator} />
            :
            <View style={{ marginTop: 30 }}>
              <FlatList
                numColumns={2}
                data={this.state.dataSource}
                contentContainerStyle={styles.container}
                renderItem={item => this.renderItem(item)}
                // keyExtractor={item => item.id.toString()}
                extraData={this.state}
                columnWrapperStyle={styles.row} />
            </View>}
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
                  <Text style={{ color: 'white', fontSize: 16,  }}>Sort By Radius</Text>
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

              <Button block style={{ marginHorizontal: 20, marginTop: 100, backgroundColor: '#e26d0e', }} onPress={this.getFilterData} >
                <Text>Apply</Text>
              </Button>
              <Text>
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

}

export default DriverServicesList;