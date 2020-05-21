import React from 'react';
import { View, Image, FlatList, Text, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator, Picker } from 'react-native';
import styles from '../../automotivebusiness/Registration2/styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Container, Textarea, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import Constants from '../../../config/constant'

class Registration2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        arrayHolder: [],
        avatarSource: '',
        dName: '',
        Price: '',
        managerEmail: '',
        bio:'',
        dOffer: '',
        location: '',
        description: '',
        loading: true,
        businessTypeArr: [],
        loadingBusiness: false,
        businessImage: '',
        businessName: '',
        loadingRegister: false,
        profileId: '',
        carPartTypeArr: [],
        carPartType: '',
        loading: true,
        businessTypeArr: [],
        loadingBusiness: false,
        languageList: [],
        language: '',
        }

    //this.getLanguageApi();
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


  render() {

    let splashImg = require("../../../../assets/splash_bg.png");
    let popup = require("../../../../assets/cross-popup.png");
    let congratulations = require("../../../../assets/congratulations.png");
    let dob = require("../../../../assets/dob-icon.png");
    let splash = require("../../../../assets/camera.png");
    let datePickerHolder = null
    let registrationDoneHolder = null

    return (
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View>
              <Header style={{ backgroundColor: '#d55459' }}>
                <Left>
                  <Button transparent >
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body style={{paddingLeft:40}}>
                  <Title style={{}}>Create Deals</Title>
                </Body>
              </Header>
              <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 270, width: '100%', backgroundColor: '#FF0000' }}>
                <View >
                  <Image source={this.state.businessImage != '' ? { uri: this.state.businessImage } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                  <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this, 'businessImage')}>
                    <Image source={splashImg} style={{ height: 30, width: 30, borderRadius:30 }}></Image>
                  </TouchableOpacity>
                  <Text style={{ color: '#FFFFFF', alignSelf: 'center',  }}>Upload Deal Picture</Text>
                </View>
              </LinearGradient>

              <View style={{ width: "90%", borderWidth:1, marginLeft:20, marginTop:20 }}>
                    <Textarea placeholder="Please Specify the deal" rowSpan={5} bordered ref={bio => { this.bio = bio }} onChangeText={(text) => this.setState({ 'bio': text })} style={{backgroundColor: '#f3f3f3', borderColor: '#e8e8e8', height:80}} />
                </View>
              <View style={{ width: '90%', marginLeft: '5%',backgroundColor:'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 45, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                    }>
                    {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                    <Picker.Item value='' label='Select Language' style={{  }} />
                    {/* {languageList} */}
                </Picker>
                </View>
              <Item regular style={[styles.viewLabel1, {marginTop:20}]}>
                <Input style={styles.input} placeholder='Preset' onChangeText={(text) => this.setState({ location: text })} />
              </Item>
              <Item regular style={[styles.viewLabel1, {marginTop:20}]}>
                <Input style={styles.input} placeholder='Create an audiance' onChangeText={(text) => this.setState({ description: text })} />
              </Item>

              <Button block style={{ width: '90%', borderRadius:10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }}>
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

            </View>

        </ScrollView>

        <Toast ref="toast" />

      </SafeAreaView>
    )
  }

}

export default Registration2;