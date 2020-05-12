import React from 'react';
import { View, Image, Text, Picker, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';

class DriverRegistration1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datePicker: false,
      date: 'Date of birth',
      loading: true,
      languageList: [],
      language: '',
      firstName: '',
      lastName: '',
      profileImage: '',
      email: '',
      password: '',
      phoneNo: '',
    }

    // this.navigateToIntro();

    this.getLanguageApi();
  }

  // navigateToIntro(){
  //     console.log("test", "in this")

  //     let that = this;
  //     setTimeout(function(){ that.setIntroStack(); }, 3000);

  // }

  // setIntroStack(){
  //     const resetAction = StackActions.reset({
  //         index: 0,
  //         actions: [NavigationActions.navigate({ routeName: 'Intro' })],
  //     });
  //     this.props.navigation.dispatch(resetAction);
  // }

  componentDidMount() {

  }

  takePicture() {
    const options = {
      title: 'Select Image',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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

        this.setState({ profileImage: source });
      }
    });
  }

  async getLanguageApi() {
    // this.setState({loading:true})
    try {
      let response = await fetch(
        Constants.BASE_URL + 'languageList', {
        method: 'GET',
      });
      this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (responseJson.status == "Success") {
        this.setState({ languageList: responseJson.data.language })
      }
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  // setLanguagePicker(statusCode, responseJson) {
  //   if (statusCode == 200) {
  //     this.setState({ languageList: responseJson['data'] }, () => {
  //       console.log("listis******" + this.state.languageList);
  //     })
  //   }
  // }

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

  validateEmail(email) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(email).toLowerCase());
  }

  driverRegisterContinue() {
    //this.props.navigation.navigate('DriverRegistration2',  {profileImage : this.state.profileImage, language : this.state.language, firstName:this.state.firstName, lastName:this.state.lastName, email:this.state.email, password:this.state.password, phoneNo:this.state.phoneNo, date:this.state.date});
    console.log("finallanguageis******" + this.state.language);
    if (this.state.profileImage == '' || this.state.profileImage == null) {
      this.refs.toast.show('Please select a profile image.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.language == '' || this.state.language == null || this.state.language == undefined) {
      this.refs.toast.show('Please select a language.', DURATION.LENGTH_SHORT);
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
    else if (this.state.email == '' || this.state.email == null) {
      this.refs.toast.show('Please enter email.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (!this.validateEmail(this.state.email)) {
      this.refs.toast.show('Email entered is not valid.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.password == '' || this.state.password == null) {
      this.refs.toast.show('Please enter password.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.phoneNo == '' || this.state.phoneNo == null) {
      this.refs.toast.show('Please enter phone no.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.date == 'Date of birth' || this.state.date == '' || this.state.date == null) {
      this.refs.toast.show('Please enter date of birth', DURATION.LENGTH_SHORT);
      return;
    }
    else {
      this.props.navigation.navigate('DriverRegistration2', { profileImage: this.state.profileImage, language: this.state.language, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, phoneNo: this.state.phoneNo, date: this.state.date });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {

    let splashImg = require("../../../../assets/splash_bg.png");
    let date = require("../../../../assets/images/calender-black.png");
    let upload = require("../../../../assets/images/upload-image.png");
    let datePickerHolder = null

    let languageList = this.state.languageList.map((list, index) => {
      // console.log('languageList', list)
      return (
        <Picker.Item label={list.name} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
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

    return (
      <SafeAreaView style={styles.wrapper}>
        {/* <Image source={splashImg}></Image> */}

        {/* <View style={{ width: '100%', height: 45, backgroundColor: '#FF0000', justifyContent: 'center' }}>
                    <Text style={styles.headline}>Driver Registration1</Text>
                </View> */}
        <Header style={{ backgroundColor: '#d55459' }}>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              {/* <Icon name='arrow-back'/> */}
              <Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 21, height: 21 }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontFamily: 'Roboto_Regular' }}>Driver Registration</Title>
          </Body>
        </Header>


        <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ width: '100%', height: 180 }}>
          <View style={{ width: '100%', height: 180 }}>
            {/* <Image source={this.state.profileImage!='' ? {uri:this.state.profileImage} : splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
          <TouchableOpacity style={{width:40, height:40, position:'absolute', marginLeft:230, marginTop:90}} onPress={this.takePicture.bind(this)}>
            <Image source={upload} style={{ width: 40, height: 40, borderRadius:30}}></Image>
          </TouchableOpacity> */}
            <Avatar
              size={110}
              onEditPress={this.takePicture.bind(this)}
              overlayContainerStyle={{ backgroundColor: '#FFF' }}
              rounded
              icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
              containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center' }}
              source={this.state.profileImage != '' ? { uri: this.state.profileImage } : splashImg}
              imageProps={{ resizeMode: 'cover' }}
              showEditButton
            />
            <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto_Regular' }}>Upload profile picture</Text>
          </View>
        </LinearGradient>

        {/* <View style={{ width: '100%', height: 180, backgroundColor: '#FF0000' }}>
                    <Image source={splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
                    <Image source={splashImg} style={{ width: 40, height: 40, position: 'absolute', marginLeft: 200, marginTop: 90 }}></Image>
                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10 }}>Upload profile picture</Text>
                </View> */}

        {this.state.loading ?

          <ActivityIndicator
            animating={this.state.loading}
            color='#FF0000'
            size="large"
            style={styles.activityIndicator} />
          :
          <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: '#ffffff', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Language' style={{ fontFamily: 'Roboto_Regular' }} />
                {languageList}
              </Picker>
            </View>

            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 15, flexDirection: 'row' }}>

              <Item regular style={styles.viewLabel2}>
                <Input style={styles.input} placeholder='First name' onChangeText={(text) => this.setState({ firstName: text })} />
              </Item>

              <Item regular style={styles.viewLabel3}>
                <Input style={styles.input} placeholder='Last name' onChangeText={(text) => this.setState({ lastName: text })} />
              </Item>

            </View>

            <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({ email: text })} />
            </Item>

            <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
            </Item>

            <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Phone number' keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ phoneNo: text })} />
            </Item>

            <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
              <Text style={{ color: '#000000', paddingLeft: 10, flex: 3, alignSelf: 'center', fontFamily: 'Roboto_Regular' }}>{this.state.date}</Text>
              <Image source={date} style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 10 }}></Image>
            </TouchableOpacity>

            <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, backgroundColor: '#f5900e', marginBottom: 10 }} onPress={this.driverRegisterContinue.bind(this)}>
              <Text style={{ color: '#FFFFFF' }}>CONTINUE</Text>
            </Button>

            {datePickerHolder}

          </ScrollView>}

        <Toast ref="toast" />

      </SafeAreaView>
    )
  }

}

export default DriverRegistration1;