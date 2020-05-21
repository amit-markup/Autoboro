import React from 'react';
import { View, Image, FlatList, Text, PermissionsAndroid, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator, ImageBackground, Picker } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Container, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import Constants from '../../../config/constant'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { Header, Avatar } from 'react-native-elements';

class Registration2 extends React.Component {
  constructor(props) {
    super(props);
    let language = this.props.navigation.getParam("language");
    let selectedData = this.props.navigation.getParam("selectedData");
    let ownBusiness = this.props.navigation.getParam("ownBusiness");
    let Regular = this.props.navigation.getParam("Regular");
    let Midgrade = this.props.navigation.getParam("Midgrade");
    let Premium = this.props.navigation.getParam("Premium");
    let Diesel = this.props.navigation.getParam("Diesel");
    let BusinessStartTime = this.props.navigation.getParam("start_time");
    let BusinessEndTime = this.props.navigation.getParam("end_time");
    console.log('selectedData', selectedData, BusinessStartTime, BusinessEndTime)
    this.state = {
      arrayHolder: [],
      avatarSource: '',
      valueRadio: 'New',
      date: 'Date of birth',
      datePicker: false,
      registrationDone: false,
      businessImage: '',
      businessName: '',
      email: '',
      password: '',
      website: '',
      businessAddress: '',
      businessPhoneNo: '',
      managerImage: '',
      firstName: '',
      lastName: '',
      managerEmail: '',
      managerPhoneNo: '',
      language: language,
      selectedData: selectedData,
      ownBusiness: ownBusiness,
      loadingRegister: false,
      profileId: '',
      carPartTypeArr: [],
      carPartType: '',
      loading: true,
      Regular:Regular,
      Midgrade:Midgrade,
      Premium:Premium,
      Diesel:Diesel,
      currentLongitude: '',
      currentLatitude: '',
      code:'',
      BusinessDescription:'',
      BusinessStartTime:BusinessStartTime,
      BusinessEndTime:BusinessEndTime,
    //   businessTypeArr: [
    //     {
    //         "id": 1,
    //         "name": "New Part",
    //     },
    //     {
    //         "id": 2,
    //         "name": "Used Part",
    //     },
    //     {
    //         "id": 3,
    //         "name": "Both Parts",
    //     }
    // ],
    //businessTypeArr:,
      loadingBusiness: false,
    }

    this.getCarPartTypeApi();
  }

  componentDidMount() {
    this.setState({ arrayHolder: [] });
    this.getAdreess()
  }



  getAdreess = async()=>{
    var that =this;
    
    if(Platform.OS === 'ios'){
      this.callLocation(that);
    }else{
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            // @ts-ignore
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
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
          alert("err",err);
          console.warn(err)
        }
      }
      requestLocationPermission();
    }    
   }
     callLocation(that){
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
        //Will give you the current location
         (position) => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
         
            that.setState({ currentLongitude:currentLongitude,
              currentLatitude:currentLatitude, });
            
  
            console.log(currentLatitude,currentLongitude)
         },
         (error) => alert(error.message),
         { enableHighAccuracy: false, timeout:3600000, maximumAge: 1000 }
      );
      that.watchID = Geolocation.watchPosition((position) => {
        //Will give you the location on location change
          console.log(position);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
         that.setState({ currentLongitude:currentLongitude });
         //Setting state Longitude to re re-render the Longitude Text
         that.setState({ currentLatitude:currentLatitude });
         //Setting state Latitude to re re-render the Longitude Text
      })
     
  }


  async getCarPartTypeApi() {
    try {
      let response = await fetch(
        Constants.BASE_URL + 'getTypePart', {
        method: 'GET',
      });
      this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (response.status == 200) {
        this.setState({ carPartTypeArr: responseJson['data']['List'] });
      }
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  takePicture(strType) {
    let that = this;
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
        const source = response.uri;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("imageis******", source);


        if (strType == 'businessImage') {
          this.setState({ businessImage: source });

        }
        else if (strType == 'businessLogo') {
          this.setState({ avatarSource: source }, () => {
            that.joinData();
          });
        }
        else if (strType == 'managerImage') {
          this.setState({ managerImage: source });
        }

      }
    });
  }

  joinData = () => {
    this.state.arrayHolder.push(this.state.avatarSource);
    this.setState({ arrayHolder: this.state.arrayHolder });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  deleteItem = (position) => {
    console.log("deletethis", "********" + position)
    var array = [...this.state.arrayHolder]; // make a separate copy of the array
    var index = position
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        arrayHolder: array,
      });
    }
    //   console.warn(item.path)
    //  let final =this.state.images.filter(data=> data.path item.path)
  }

  validateEmail(email) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(email).toLowerCase());
  }


  async doRegister() {

    if (this.state.language == '' || this.state.language == null || this.state.language == undefined) {
      this.refs.toast.show('Please select a language.', DURATION.LENGTH_SHORT);
      return;
    }
    if (this.state.businessImage == '' || this.state.businessImage == null) {
      this.refs.toast.show('Please upload business profile image.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.businessName == '' || this.state.businessName == null) {
      this.refs.toast.show('Please enter business name.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.businessName == '' || this.state.businessName == null) {
      this.refs.toast.show('Please enter business name.', DURATION.LENGTH_SHORT);
      return;
    }
    else {
      console.log('fdsfsdf')
      this.setState({ loadingRegister: true });
      let businessImage = {
        uri: this.state.businessImage,
        type: 'image/jpeg',
        name: 'businessImage.jpg',
      };

      let managerImage = {
        uri: this.state.managerImage,
        type: 'image/jpeg',
        name: 'managerImage.jpg',
      };
      let selectedData = this.props.navigation.getParam("selectedData");
      let formdata = new FormData();
      console.log('formdata', formdata)
      this.state.arrayHolder.forEach((element, i) => {
        console.log(element)
         const newFile = {
           uri: element, 
           type: 'image/jpeg',
           name:'businessLogo.jpg'
         }
         formdata.append('BusinessPic[]', newFile)
         console.log('newFile',newFile)
       });

       this.state.selectedData.forEach((element) => {
        formdata.append('ServicesID', element)
      });
      //formdata.append('ServicesID', this.state.selectedData)
      formdata.append("LanguageID", this.state.language)
      formdata.append("BusinessName", this.state.businessName)
      formdata.append("BusinessType", this.state.carPartType)      //earlier it was '1'
      formdata.append("BusinessPartType", this.state.valueRadio)
      formdata.append("BusinessEmail", this.state.email)
      formdata.append("BusinessPhoneNumber", this.state.businessPhoneNo)
      formdata.append("BusinessWebsite", this.state.website)
      formdata.append("BusinessAddress", this.state.businessAddress)
      formdata.append("FirstName", this.state.firstName)
      formdata.append("LastName", this.state.lastName)
      formdata.append("Email", this.state.managerEmail)
      formdata.append("DOB", this.state.date)
      formdata.append("PhoneNumber", this.state.managerPhoneNo)
      formdata.append("Password", this.state.password)
      formdata.append("BusinessCoverPic", businessImage)
      formdata.append("Avatar", managerImage)
      formdata.append("Regular", this.state.Regular)
      formdata.append("Midgrade", this.state.Midgrade)
      formdata.append("Diesel", this.state.Diesel)
      formdata.append("Premium", this.state.Premium)
      formdata.append("Latitude", this.state.currentLatitude)
      formdata.append("Longitude", this.state.currentLongitude)
      formdata.append("BusinessDescription", this.state.BusinessDescription)
      formdata.append("BusinessStartTime", this.state.BusinessStartTime)
      formdata.append("BusinessEndTime", this.state.BusinessEndTime)

      try {
        let response = await fetch(
          Constants.BASE_URL + 'businessRegistration', {
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

  showDatePicker() {
    // this.setState({date: new Date()}, () => {
    //   this.setState({datePicker:true})
    // })
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

  closeModal() {
    this.setState({ registrationDone: false });
  }

  getBusinessTypeApi(itemValue) {
    let that = this;
    this.setState({ loadingBusiness: true });
    this.setState({ carPartType: itemValue });
    
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {

    let splashImg = require("../../../../assets/splash_bg.png");
    let splashImgs = require("../../../../assets/images/upload-image.png");
    let popup = require("../../../../assets/cross-popup.png");
    let congratulations = require("../../../../assets/congratulations.png");
    let dob = require("../../../../assets/dob-icon.png");
    let splash = require("../../../../assets/camera.png");
    let datePickerHolder = null
    let registrationDoneHolder = null

    let carPartTypeList = this.state.carPartTypeArr.map((list, index) => {
      return (
        <Picker.Item label={list.name} value={list.id} key={index} style={{  }} />
      );
    });

    // let businessTypeRadio = this.state.businessTypeArr.map((list, index) => {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center' }}>
    //       <Text style={{  }}>{list.name}</Text>
    //       <RadioButton value={list.id} color={"#FF0000"} uncheckedColor={'#000000'} />
    //     </View>
    //   );
    // });

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
              <TouchableOpacity style={{ width: 40, height: 40, alignSelf: 'flex-end' }} onPress={this.closeModal.bind(this)}>
                <Image source={popup} style={{ width: 20, height: 20, marginRight: 10, marginTop: 10, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
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
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
          {this.state.loading ?
            <ActivityIndicator
              animating={this.state.loading}
              color='#FF0000'
              size="large"
              style={styles.activityIndicator} />
            :
            <View>
              <Header
                    leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25 }} /></Button>}
                    centerComponent={{ text: 'Business Registration', style: { color: '#fff', marginBottom: 25, fontSize: 16 } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#d55459',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
              <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 180, width: '100%', backgroundColor: '#FF0000', }}>
                <View >
                  {/* <Image source={this.state.businessImage != '' ? { uri: this.state.businessImage } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                  <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this, 'businessImage')}>
                    <Image source={splashImgs} style={{ height: 30, width: 30, borderRadius: 30 }}></Image>
                  </TouchableOpacity> */}
                  {/* <Avatar
                      source={{
                        uri:
                          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                      }}
                      showEditButton

                    /> */}
                  <Avatar
                    size={110}
                    onEditPress={this.takePicture.bind(this, 'businessImage')}
                    overlayContainerStyle={{ backgroundColor: '#FFF' }}
                    rounded
                    icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                    containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center',marginTop:20 }}
                    source={this.state.businessImage != '' ? { uri: this.state.businessImage } : splashImg}
                    imageProps={{ resizeMode: 'cover' }}
                    showEditButton
                  />
                  <Text style={{ color: '#FFFFFF', alignSelf: 'center',  }}>Upload business profile picture</Text>
                </View>
              </LinearGradient>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Business Name' onChangeText={(text) => this.setState({ businessName: text })} />
              </Item>

              <Text style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, marginRight: 10, textAlign: 'center', marginTop: 10,  }}>Please upload a photo of your business location and the logo of your business.</Text>

              {/* <Image source={splashImg}></Image> */}
              {/* <Button block onPress={this.takePicture.bind(this)}>
                    <Text style={{color:'#FFFFFF'}}>Take Picture</Text>
                </Button> */}

              <View style={{ width: '90%', height: 100, backgroundColor: '#a32227', marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                <FlatList
                  numColumns={5}
                  data={this.state.arrayHolder}
                  extraData={this.state.arrayHolder}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({ item, index }) => (
                    // <View style={{ flex: 1 }}>
                    //   <TouchableOpacity style={{ width: '30%', height: 90, marginTop: 5 }} onPress={() => this.deleteItem(index)}>
                    //     <Image source={{ uri: item }} style={{ width: '95%', height: 90, marginLeft: '0%' }} ></Image>
                    //     <Image source={splashImg} style={{ width: 20, height: 20, alignSelf: 'flex-end', position: 'absolute' }}></Image>
                    //   </TouchableOpacity>
                    // </View>
                    <View style={{  flex:1,padding:2 }}>
                      <TouchableOpacity onPress={()=>{this.deleteItem(index)}} style = {{alignContent:'flex-end',alignItems:'flex-end'}}></TouchableOpacity>
                        <Image source={{ uri: item }} style={{ width: '100%', height: 105, marginLeft: '0%' }} ></Image>
                        <Image source={require('../../../../assets/images/close-red.png')} style={{ width: 15, height: 15, marginTop:3, Right:5, alignSelf: 'flex-end', position: 'absolute' }}></Image>

                  <Text>
                    <Text></Text>
                  </Text>
                  </View>
                    )}
                />
              </View>

              <TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: 'grey', marginLeft: '5%', marginRight: '5%', justifyContent: 'center' }} onPress={this.takePicture.bind(this, 'businessLogo')}>
                <Image source={splash} style={{ height: 25, width: 25, alignSelf: 'center' }}></Image>
              </TouchableOpacity>

              <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
                <Picker
                  selectedValue={this.state.carPartType}
                  style={{ height: 45, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.getBusinessTypeApi(itemValue)
                  }>
                  <Picker.Item value='' label='Select Part' style={{  }} />
                  {carPartTypeList}
                </Picker>
              </View>

              {/* <Image source={this.state.avatarSource} style={{height:50, width:50}}></Image> */}
{/* 
              {this.state.loadingBusiness ?

                <ActivityIndicator
                  animating={this.state.loadingBusiness}
                  color='#FF0000'
                  size="large"
                  style={styles.activityIndicator} />
                : */}
                {/* <View style={{ flexDirection: 'row', marginTop: 10, width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                  <RadioButton.Group
                    onValueChange={valueRadio => this.setState({ valueRadio })}
                    value={this.state.valueRadio}>
                    {businessTypeRadio}
                  </RadioButton.Group>
                </View> */}
                {/* } */}

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Email Address' onChangeText={(text) => this.setState({ email: text })} />
              </Item>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Website' onChangeText={(text) => this.setState({ website: text })} />
              </Item>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Full business address' onChangeText={(text) => this.setState({ businessAddress: text })} />
              </Item>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Business Phone number' keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ businessPhoneNo: text })} />
              </Item>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Business Description' onChangeText={(text) => this.setState({ BusinessDescription: text })} />
              </Item>

              <Text style={{ width: '90%', marginLeft: '5%', marginTop: 15,  }}>Manager</Text>

              <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 180, backgroundColor: 'white', marginTop: 5, borderRadius: 5 }}>
                <Avatar
                  size={110}
                  onEditPress={this.takePicture.bind(this, 'managerImage')}
                  overlayContainerStyle={{ backgroundColor: '#FFF' }}
                  rounded
                  icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                  containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center', marginTop:10 }}
                  source={this.state.managerImage != '' ? { uri: this.state.managerImage } : splashImg}
                  imageProps={{ resizeMode: 'cover' }}
                  showEditButton
                />
                <Text style={{ color: 'black', alignSelf: 'center', marginTop: 10,  }}>Upload profile picture</Text>
              </View>

              <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 10, flexDirection: 'row' }}>

                <Item regular style={styles.viewLabel2}>
                  <Input style={styles.input} placeholder='First name' onChangeText={(text) => this.setState({ firstName: text })} />
                </Item>

                <Item regular style={styles.viewLabel3}>
                  <Input style={styles.input} placeholder='Last name' onChangeText={(text) => this.setState({ lastName: text })} />
                </Item>

              </View>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({ managerEmail: text })} />
              </Item>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
              </Item>

              <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
                <Text style={{ color: '#000000', paddingLeft: 10, flex: 3, alignSelf: 'center',  }}>{this.state.date}</Text>
                <Image source={dob} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }}></Image>
              </TouchableOpacity>

              <Item regular style={styles.viewLabel1}>
                <Input style={styles.input} placeholder='Manager Phone number' keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ managerPhoneNo: text })} />
              </Item>

              {/* <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} placeholder='Phone number' disabled/>
          </Item> */}

              <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, marginBottom: 90, backgroundColor: '#f5900e' }} onPress={this.doRegister.bind(this)}>
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

            </View>}

        </ScrollView>

        <Toast ref="toast" />

      </SafeAreaView>
    )
  }

}

export default Registration2;