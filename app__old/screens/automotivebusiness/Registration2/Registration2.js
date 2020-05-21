import React from 'react';
import { View, Image, FlatList, Text, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator, Picker } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import Constants from '../../../config/constant'

class Registration2 extends React.Component {

  constructor(props) {
    super(props);
    let language = this.props.navigation.getParam("language");
    let selectedData = this.props.navigation.getParam("selectedData");
    let ownBusiness = this.props.navigation.getParam("ownBusiness");

    this.state = {
      arrayHolder: [],
      avatarSource: '',
      valueRadio: '',
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
      businessTypeArr: [],
      loadingBusiness: false,
    }

    this.getCarPartTypeApi();
  }

  componentDidMount() {
    this.setState({ arrayHolder: [] });
  }

  async getCarPartTypeApi() {
    try {
      let response = await fetch(
        Constants.BASE_URL + 'carparttype', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (response.status == 200) {
        this.setState({ carPartTypeArr: responseJson['data'] });
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

  // renderItem = (data) =>{
  //   return(
  //     <Image
  //     source={data}
  //     style={{ width: 40, height: 40, backgroundColor:'green'}}/>
  //   )
  // }

  validateEmail(email) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(email).toLowerCase());
  }


  async doRegister() {
     //this.setState({ registrationDone: true })       // to comment..
    // this.setState({profileId:'test'}, () => {
    //   this.setState({registrationDone:true});
    // })

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
    else if (this.state.arrayHolder.length == 0 || this.state.arrayHolder == null) {
      this.refs.toast.show('Please upload business logo image.', DURATION.LENGTH_SHORT);
      return;
    }
    else if(this.state.carPartType == '' || this.state.carPartType == null || this.state.carPartType == undefined){
      this.refs.toast.show('Please select a car part type.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.valueRadio == '' || this.state.valueRadio == null) {
      this.refs.toast.show('Please select a part type.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.email == '' || this.state.email == null) {
      this.refs.toast.show('Please enter email.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (!this.validateEmail(this.state.email)) {
      this.refs.toast.show('Email entered is not valid.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.website == '' || this.state.website == null) {
      this.refs.toast.show('Please enter website.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.businessAddress == '' || this.state.businessAddress == null) {
      this.refs.toast.show('Please enter business address.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.businessPhoneNo == '' || this.state.businessPhoneNo == null) {
      this.refs.toast.show('Please enter business phone no.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.managerImage == '' || this.state.managerImage == null) {
      this.refs.toast.show('Please upload a manager image.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.firstName == '' || this.state.firstName == null) {
      this.refs.toast.show('Please enter first name.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.lastName == '' || this.state.lastName == null) {
      this.refs.toast.show('Please enter last name.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.managerEmail == '' || this.state.managerEmail == null) {
      this.refs.toast.show('Please enter email.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (!this.validateEmail(this.state.managerEmail)) {
      this.refs.toast.show('Email entered is not valid.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.password == '' || this.state.password == null) {
      this.refs.toast.show('Please enter password.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.date == 'Date of birth' || this.state.date == '' || this.state.date == null) {
      this.refs.toast.show('Please enter date of birth', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.managerPhoneNo == '' || this.state.managerPhoneNo == null) {
      this.refs.toast.show('Please enter manager phone no.', DURATION.LENGTH_SHORT);
      return;
    }
    else {
      this.setState({ loadingRegister: true });
      let businessImage = {
        uri: this.state.businessImage,
        type: 'image/jpeg',
        name: 'businessImage.jpg',
      };

      let managerImage = {
        uri: this.state.managerImage,
        type: 'image/jpeg',
        name: 'managerImage.jpeg',
      };

      let formdata = new FormData();
      this.state.arrayHolder.forEach((element) => {
        const newFile = {
          uri: element,
          type: 'image/jpeg',
          name: 'businessLogo.jpeg',
        }
        formdata.append('business_galleries[]', newFile)
      });
      this.state.selectedData.forEach((element) => {
        formdata.append('services[]', element)
      });

      formdata.append("language_id", this.state.language)
      // formdata.append("services[]", this.state.selectedData)
      formdata.append("own_custom_service", this.state.ownBusiness)
      formdata.append("business_name", this.state.businessName)
      formdata.append("type", this.state.carPartType)      //earlier it was '1'
      formdata.append("part", this.state.valueRadio)
      formdata.append("business_email", this.state.email)
      formdata.append("business_phone", this.state.businessPhoneNo)
      formdata.append("website", this.state.website)
      formdata.append("address", this.state.businessAddress)
      formdata.append("first_name", this.state.firstName)
      formdata.append("last_name", this.state.lastName)
      formdata.append("email", this.state.managerEmail)
      formdata.append("dob", this.state.date)
      formdata.append("user_phone", this.state.managerPhoneNo)
      formdata.append("password", this.state.password)
      formdata.append("password_confirmation", this.state.password)
      formdata.append("is_term_accept", '1')
      formdata.append("profile_pic", businessImage)
      // formdata.append("business_galleries[]", '')
      formdata.append("avatar", managerImage)

      try {
        let response = await fetch(
          Constants.BASE_URL + 'auth/business/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          body: formdata,
        });
        this.setState({ loadingRegister: false })
        let responseJson = await response.json();
        if (response.status == 201) {
          console.log("in success*********");
          this.setState({ profileId: responseJson['data']['profile_id'] }, () => {
            this.setState({ registrationDone: true });
          })
          this.refs.toast.show(JSON.stringify(responseJson['data']['message']), DURATION.LENGTH_SHORT);
        }
        else {
          this.refs.toast.show(JSON.stringify(responseJson['error']['message']), DURATION.LENGTH_SHORT);
        }
        return responseJson;
      } catch (error) {
        console.error(error);
        this.setState({ loadingRegister: false })
      }
    }

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
    this.setState({ businessTypeArr: [] }, async () => {
      try {
        let response = await fetch(
          Constants.BASE_URL + 'businesstype', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        that.setState({ loadingBusiness: false });
        let responseJson = await response.json();
        console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
        if (response.status == 200) {
          that.setState({ businessTypeArr: responseJson['data'] });
        }
        return responseJson;
      } catch (error) {
        console.error(error);
        that.setState({ loadingBusiness: false });
      }
    })
  }

  // takePicture(){
  //   const options = {
  //     title: 'Select Image',
  //     // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: response.uri };

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({businessImage: source});
  //     }
  //   });
  // }

  goBack(){
    this.props.navigation.goBack();
  }

  render() {

    let splashImg = require("../../../../assets/splash_bg.png");
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

    let businessTypeRadio = this.state.businessTypeArr.map((list, index) => {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{  }}>{list.name}</Text>
          <RadioButton value={list.id} color={"#FF0000"} uncheckedColor={'#000000'} />
        </View>
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
              <TouchableOpacity style={{ width: 40, height: 40, alignSelf: 'flex-end' }} onPress={this.closeModal.bind(this)}>
                <Image source={popup} style={{ width: 20, height: 20, marginRight:10, marginTop:10, alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} />
              </TouchableOpacity>
              <Image source={congratulations} style={{ height: 100, width: 100, alignSelf: 'center' }}></Image>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 18,  }}>Congratulations</Text>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 12,  }}>Congratulations for completing your registration</Text>
              <Button rounded style={{ width: 160, height: 40, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: '#FFFFFF', width: 160, textAlign: 'center',  }}>{this.state.profileId}</Text>
              </Button>
              <Text style={{ alignSelf: 'center', color: '#000000', marginTop: 10, fontSize: 12,  }}>Your Generated ID</Text>
            </View>
          </View>
        </Modal>
      )
    }

    return (
      <SafeAreaView style={styles.wrapper}>
        {/* <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{  }}>Business Registration</Title>
          </Body>
        </Header> */}
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>

          {this.state.loading ?

            <ActivityIndicator
              animating={this.state.loading}
              color='#FF0000'
              size="large"
              style={styles.activityIndicator} />
            :
            <View>
              <Header style={{ backgroundColor: '#d55459' }}>
                <Left>
                  <Button transparent >
                    <Icon name='arrow-back' onPress={this.goBack.bind(this)}/>
                  </Button>
                </Left>
                <Body>
                  <Title style={{}}>Driver Registration</Title>
                </Body>
              </Header>
              <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 270, width: '100%', backgroundColor: '#FF0000' }}>
                <View >
                  <Image source={this.state.businessImage != '' ? { uri: this.state.businessImage } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                  <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this, 'businessImage')}>
                    <Image source={splashImg} style={{ height: 30, width: 30, borderRadius:30 }}></Image>
                  </TouchableOpacity>
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

              <View style={{ width: '90%', height: 100, backgroundColor: '#FF0000', marginLeft: '5%', marginRight: '5%', marginTop: 10 }}>
                <FlatList
                  numColumns={5}
                  data={this.state.arrayHolder}
                  extraData={this.state.arrayHolder}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({ item, index }) => (
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity style={{ width: '20%', height: 90, marginTop: 5 }} onPress={() => this.deleteItem(index)}>
                        <Image source={{ uri: item }} style={{ width: '95%', height: 90, marginLeft: '0%' }} ></Image>
                        <Image source={splashImg} style={{ width: 20, height: 20, alignSelf: 'flex-end', position: 'absolute' }}></Image>
                      </TouchableOpacity>
                    </View>)}
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

              {this.state.loadingBusiness ?

                <ActivityIndicator
                  animating={this.state.loadingBusiness}
                  color='#FF0000'
                  size="large"
                  style={styles.activityIndicator} />
                :
                <View style={{ flexDirection: 'row', marginTop: 10, width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                  <RadioButton.Group
                    onValueChange={valueRadio => this.setState({ valueRadio })}
                    value={this.state.valueRadio}>
                    {/* <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{  }}>New Part</Text>
                    <RadioButton value="new" color={"#FF0000"} uncheckedColor={'#000000'} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{  }}>Use Part</Text>
                    <RadioButton value="used" color={"#FF0000"} uncheckedColor={'#000000'} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{  }}>New & Use Part</Text>
                    <RadioButton value="both" color={"#FF0000"} uncheckedColor={'#000000'} />
                  </View> */}
                    {businessTypeRadio}
                  </RadioButton.Group>
                </View>}

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

              <Text style={{ width: '90%', marginLeft: '5%', marginTop: 15,  }}>Manager</Text>

              <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 180, backgroundColor: 'white', marginTop: 5, borderRadius:5 }}>
                <Image source={this.state.managerImage != '' ? { uri: this.state.managerImage } : splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
                <TouchableOpacity style={{ width: 40, height: 40, position: 'absolute', marginLeft: 200, marginTop: 90 }} onPress={this.takePicture.bind(this, 'managerImage')}>
                  <Image source={splashImg} style={{ width: 30, marginLeft:20, marginTop:7, height: 30, borderRadius:30 }}></Image>
                </TouchableOpacity>
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

                  <Text style={{ color: '#FFFFFF',  }}>Submit</Text>}
              </Button>

              {/* <FlatList
              numColumns={5}
              data={this.state.arrayHolder}
              extraData={this.state.arrayHolder}
              keyExtractor={(index) => index.toString()}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={item => this.renderItem(item)}
              renderItem={({ item,index }) => (
                <View style={{  height:60, width:60,padding:2, backgroundColor:'green' ,marginBottom:100}}>
                   <Icon name = "md-close"style={{ fontSize:30, alignSelf:'flex-end',marginVertical:-10,zIndex: 5,}} onPress={()=>{this.deleteItem(index)}}/>
                   <Image name="md-close" source={require('../../img/logo/logo.png')} style={{ height:40, width:40, backgroundColor:'#FF0000'}} onPress={()=>{this.deleteItem(index)}}/>
                  <Image style={styles.imageThumbnail} source={{ uri: item.path }} /> 
    
                  <Image source={splashImg} style={{width:40, height:40}}></Image>
                 
                </View>)}/> */}

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