import React from 'react';
import { View, Image, Text,PermissionsAndroid, Picker, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Dimensions } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

class DriverRegistration2 extends React.Component {
  constructor(props) {
    super(props);
    let profileImage = this.props.navigation.getParam("profileImage");
    let language = this.props.navigation.getParam("language");
    let firstName = this.props.navigation.getParam("firstName");
    let lastName = this.props.navigation.getParam("lastName");
    let email = this.props.navigation.getParam("email");
    let password = this.props.navigation.getParam("password");
    let phoneNo = this.props.navigation.getParam("phoneNo");
    let date = this.props.navigation.getParam("date");

    this.state = {
      datePicker: false,
      registrationDone: false,
      date: 'Year',
      carBrandList: [],
      carBrand: '',
      carModelList: [],
      carModel: '',
      loading: true,
      registrationNo: '',
      VINno: '',
      driverImage: profileImage,
      driverFirstName: firstName,
      driverLastName: lastName,
      driverLanguage: language,
      driverEmail: email,
      driverPassword: password,
      driverPhone: phoneNo,
      driverDob: date,
      // Latitude: '',
      // Longitude: '',
      currentLongitude: '',
      currentLatitude: '',
      loadingRegister: false,
    }

    // this.navigateToIntro();
    this.getCarBrandsApi();
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getAdreess();
    }, 1000);
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

  async getCarBrandsApi() {
    // this.setState({loading:true})
    try {
      let response = await fetch(
        Constants.BASE_URL + 'CarMakeModelList', {
        method: 'GET',
      });
      this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (responseJson.status == "Success") {
        this.setState({ carBrandList: responseJson['data']["List"] })
      }
      console.log('carBrandList', this.state.carBrandList)
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  getCarBrandsValue(itemValue) {
    this.setState({ carBrand: itemValue }, () => {
      if (this.state.carBrand == '' || this.state.carBrand == null || this.state.carBrand == undefined) {
        this.setState({ carModelList: [] });
        return;
      }
      this.getCarModelsApi();
    })
  }

  async getCarModelsApi() {
    // this.setState({loading:true})
    // this.setState({ carBrand: itemValue }, () => {
    console.log("carbrandis*******" + this.state.carBrand);
    this.setState({ loading: true })
    try {
      let response = await fetch(
        Constants.BASE_URL + 'CarMakeModelList?id=' + this.state.carBrand, {
        method: 'GET',
      });
      this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (responseJson.status == "Success") {
        this.setState({ carModelList: responseJson['data']['List'] })
      }
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  showDatePicker() {
    this.setState({ datePicker: true })
  }

  setDate = (event, date) => {
    var finalDate = moment(date).format("YYYY-MM-DD");
    console.log('dateis*****', event + "*****" + date + "*********" + finalDate);
    // date = date || this.state.date;
    this.setState({
      // show: Platform.OS === 'ios' ? true : false,
      // date,
      date: finalDate,
      datePicker: false,
    });
  }

  async driverRegister() {
    if (this.state.carBrand == '' || this.state.carBrand == null || this.state.carBrand == undefined) {
      this.refs.toast.show('Please select a car brand.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.carModel == '' || this.state.carModel == null || this.state.carModel == undefined) {
      this.refs.toast.show('Please select a car model.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.registrationNo == '' || this.state.registrationNo == null) {
      this.refs.toast.show('Please enter a registration no.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.date == 'Year' || this.state.date == '' || this.state.date == null) {
      this.refs.toast.show('Please enter year', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.VINno == '' || this.state.VINno == null) {
      this.refs.toast.show('Please enter a VIN no.', DURATION.LENGTH_SHORT);
      return;
    }
    else {
      this.setState({ loadingRegister: true });
      let driverImage = {
        uri: this.state.driverImage,
        type: 'image/jpeg',
        name: 'driverImage.jpg',
      };
      let formdata = new FormData();
      console.log('jnfkjadsfnj', formdata)
      formdata.append("LanguageID", this.state.driverLanguage)
      formdata.append("FirstName", this.state.driverFirstName)
      formdata.append("LastName", this.state.driverLastName)
      formdata.append("Email", this.state.driverEmail)
      formdata.append("DOB", this.state.driverDob)
      formdata.append("Password", this.state.driverPassword)
      formdata.append("password_confirmation", this.state.driverPassword)
      formdata.append("is_term_accept", '1')
      formdata.append("Avatar", driverImage)
      formdata.append("PhoneNumber", this.state.driverPhone)
      formdata.append("CarMake", this.state.carBrand)
      formdata.append("CarModel", this.state.carModel)
      formdata.append("CarModelYear", this.state.date)
      formdata.append("CarRegistrationNumber", this.state.registrationNo)
      formdata.append("VinNumber", this.state.VINno)
      formdata.append("Latitude", this.state.currentLatitude)
      formdata.append("Longitude", this.state.currentLongitude)

      try {
        let response = await fetch(
          Constants.BASE_URL + 'driverRegistration', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          body: formdata,
        });
        this.setState({ loadingRegister: false })
        let responseJson = await response.json();
        console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
        if (responseJson.status == "Success") {
          console.log("in success*********");
          this.success(responseJson)
          this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
        }
        else {
          this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
        }
        return responseJson;
      } catch (error) {
        console.error(error);
        this.setState({ loadingRegister: false })
      }
    }
  }

  async success(profile) {
    console.log(profile)
    this.setState({ registrationDone: true });
    this.setState({ code: profile.code });
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
}

  goBack() {
    this.props.navigation.goBack();
  }

  closeModal() {
    this.setState({ registrationDone: false });
  }

  render() {
    let car = require("../../../../assets/car.png");
    let model = require("../../../../assets/model.png");
    let register = require("../../../../assets/register-no.png");
    let years = require("../../../../assets/years.png");
    let vins = require("../../../../assets/vin-no.png");
    let vin = require("../../../../assets/vin-info.png");
    let cross = require("../../../../assets/cross-popup.png");
    let congratulations = require("../../../../assets/congratulations.png");
    let datePickerHolder = null;
    let registrationDoneHolder = null;
    let driverImage = {
      uri: this.state.driverImage,
      type: 'image/jpeg',
      name: 'driverImage.jpg',
    };
    let carBrandList = this.state.carBrandList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} style={{  }} />
      );
    });

    let carModelList = this.state.carModelList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} style={{  }} />
      );
    });

    if (this.state.datePicker) {
      datePickerHolder = (
        <DateTimePicker
          // date={this.state.date}
          // onDateChange={date => this.setState({ date })}>
          // mode={}
          maximumDate={new Date()}
          value={new Date()}
          display="default"
          onChange={this.setDate}>
        </DateTimePicker>
      )
    }

    if (this.state.registrationDone) {
      registrationDoneHolder = (
        <Modal transparent={true}>
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={styles.container}>
              <TouchableOpacity style={{ width: 40, height: 40, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} onPress={this.closeModal.bind(this)}>
                <Image source={cross} style={{ width: 20, height: 20, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
              </TouchableOpacity>
              <Image source={congratulations} style={{ height: 100, width: 100, alignSelf: 'center' }}></Image>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 18, }}>Congratulations</Text>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 12,  }}>Congratulations for completing your registration</Text>
              <Button rounded style={{ width: 160, height: 40, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: '#FFFFFF', width: 160, textAlign: 'center', }}>{this.state.code}</Text>
              </Button>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 12,  }}>Your Generated ID</Text>
            </View>
          </View>
        </Modal>
      )
    }

    return (
      <SafeAreaView style={styles.wrapper}>
        <Header style={{ backgroundColor: '#d55459' }}>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              <Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 21, height: 21 }} />
            </Button>
          </Left>
          <Body>
            <Title style={{  }}>Driver Registration</Title>
          </Body>
        </Header>
        <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ width: '100%', height: 180 }}>
          <Image source={driverImage} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20, }}></Image>
          <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10,  }}>{this.state.driverFirstName + " " + this.state.driverLastName}</Text>
        </LinearGradient>
        {this.state.loading ?
          <ActivityIndicator
            animating={this.state.loading}
            color='#FF0000'
            size="large"
            style={styles.activityIndicator} />
          :
          <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Image source={car} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
              <Picker
                selectedValue={this.state.carBrand}
                style={{ height: 45, width: '90%', marginLeft: 36 }}
                onValueChange={(itemValue, itemIndex) =>
                  // this.setState({ carBrand: itemValue })}
                  this.getCarBrandsValue(itemValue)}>
                {/* <Picker.Item label="" value="java" />
            <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Car' style={{  }} />
                {carBrandList}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Image source={model} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
              <Picker
                selectedValue={this.state.carModel}
                style={{ height: 45, width: '90%', marginLeft: 36 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ carModel: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Model' style={{  }} />
                {carModelList}
              </Picker>
            </View>
            <Item regular style={styles.viewLabel1}>
              <Image source={register} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
              <Input style={styles.input} placeholder='Registration no' onChangeText={(text) => this.setState({ registrationNo: text })} />
            </Item>
            <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
              <Image source={years} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
              <Text style={{ color: '#000000', paddingLeft: 45, alignSelf: 'center', fontSize: 16,  }}>{this.state.date}</Text>
              {/* <Image source={splashImg} style={{ width: 30, height: 30, marginRight: 10, alignSelf: 'center' }}></Image> */}
            </TouchableOpacity>
            <Item regular style={styles.viewLabel1}>
              <Image source={vins} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
              <Input style={{ color: '#000000', fontWeight: 'bold', fontSize: '15', paddingLeft: 45, flex: 3, textAlign: 'left', fontSize: 12,  }} placeholder='VIN Number' onChangeText={(text) => this.setState({ VINno: text })} />
              <Image source={vin} style={{ width: 25, height: 25, marginRight: 10 }}></Image>
            </Item>
            <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 30, backgroundColor: '#f5900e' }} onPress={this.driverRegister.bind(this)}>
              {this.state.loadingRegister ?
                <ActivityIndicator
                  animating={this.state.loadingRegister}
                  color='#FFFFFF'
                  size="large"
                  style={styles.activityIndicator} />
                :
                <Text style={{ color: '#FFFFFF', }}>Submit</Text>}
            </Button>
            {datePickerHolder}
            {registrationDoneHolder}
          </ScrollView>}
        <Toast ref="toast" />
      </SafeAreaView>
    )
  }

}

export default DriverRegistration2;