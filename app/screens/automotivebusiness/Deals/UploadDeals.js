import React from 'react';
import { View, Image, FlatList, Text, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator, Picker } from 'react-native';
import styles from '../../automotivebusiness/Registration2/styles';
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

    this.state = {
      arrayHolder: [],
      avatarSource: '',
      dName: '',
      Price: '',
      managerEmail: '',
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
    }

    //this.getCarPartTypeApi();
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
                  <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, transform: [{ rotate: '185deg' }] }} />
                </Button>
              </Left>
              <Body style={{ paddingLeft: 40 }}>
                <Title style={{  }}>Upload Deals</Title>
              </Body>
            </Header>
            <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 270, width: '100%', backgroundColor: '#FF0000' }}>
              <View >
                <Image source={this.state.businessImage != '' ? { uri: this.state.businessImage } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this, 'businessImage')}>
                  <Image source={splashImg} style={{ height: 30, width: 30, borderRadius: 30 }}></Image>
                </TouchableOpacity>
                <Text style={{ color: '#FFFFFF', alignSelf: 'center',  }}>Upload Deal Picture</Text>
              </View>
            </LinearGradient>

            <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Deal Name' onChangeText={(text) => this.setState({ dName: text })} />
            </Item>
            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 20, flexDirection: 'row' }}>

              <Item regular style={styles.viewLabel2}>
                <Input style={styles.input} placeholder='Price' onChangeText={(text) => this.setState({ Price: text })} />
              </Item>

              <Item regular style={styles.viewLabel3}>
                <Input style={styles.input} placeholder='Deal Offer' onChangeText={(text) => this.setState({ dOffer: text })} />
              </Item>

            </View>
            <Item regular style={[styles.viewLabel1, { marginTop: 20 }]}>
              <Input style={styles.input} placeholder='Location' onChangeText={(text) => this.setState({ location: text })} />
            </Item>
            <Item regular style={[styles.viewLabel1, { marginTop: 20 }]}>
              <Input style={styles.input} placeholder='Description' onChangeText={(text) => this.setState({ description: text })} />
            </Item>

            <Button block style={{ width: '90%', borderRadius: 10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }}>
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