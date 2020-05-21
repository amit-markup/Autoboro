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
      bio: '',
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

  ManageDeal() {
    this.props.navigation.navigate('ManageDeal');
  }

  goBack() {
    this.props.navigation.navigate('CreateDeals');
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
            <Header style={{ backgroundColor: 'white' }}>
              <Left>
                <Button transparent onPress={this.goBack.bind(this)}>
                  <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, transform: [{ rotate: '185deg' }] }} />
                </Button>
              </Left>
              <Body style={{ paddingRight: 20 }}>
                <Title style={{ color: 'black' }}>Create Your Audience</Title>
              </Body>
            </Header>


            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Gender' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Age' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Distance' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Image source={require('../../../../assets/car.png')} style={{ width: 18, marginTop: 15, marginLeft: 3, height: 15, position: 'absolute' }} />
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '95%', marginLeft: 17 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Car Type' style={{ , }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Image source={require('../../../../assets/car.png')} style={{ width: 18, marginTop: 15, marginLeft: 3, height: 15, position: 'absolute' }} />
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '95%', marginLeft: 17 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Age of Car' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Client Type' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>
            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Payment Type' style={{  }} />
                {/* {languageList} */}
              </Picker>
            </View>


            <Button block style={{ width: '90%', borderRadius: 10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }} onPress={() => this.ManageDeal()}>
              {this.state.loadingRegister ?

                <ActivityIndicator
                  animating={this.state.loadingRegister}
                  color='#FFFFFF'
                  size="large"
                  style={styles.activityIndicator} />
                :

                <Text style={{ color: '#FFFFFF', }}>Submit</Text>}
            </Button>

          </View>

        </ScrollView>

        <Toast ref="toast" />

      </SafeAreaView>
    )
  }

}

export default Registration2;