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

  ManageDealEdit() {
    this.props.navigation.navigate('ManageDealEdit')
  }

  goBack() {
    this.props.navigation.navigate('CreateAudiance');
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
              <Body style={{ paddingLeft: 40 }}>
                <Title style={{ color: 'black' }}>Manage Deals</Title>
              </Body>
            </Header>
            <Text style={{ paddingLeft: 20, marginTop: 20, color: 'black', fontWeight: 'bold' }}> Deal Name <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Item regular style={[styles.viewLabel1, { marginTop: 8, borderRadius: 10, backgroundColor: 'white' }]}>
              <Input style={styles.input} placeholder='Preset' onChangeText={(text) => this.setState({ location: text })} />
            </Item>
            <Text style={{ paddingLeft: 20, marginTop: 20, color: 'black', fontWeight: 'bold' }}> Business Manager <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Item regular style={[styles.viewLabel1, { marginTop: 8, borderRadius: 10, backgroundColor: 'white' }]}>
              <Input style={styles.input} placeholder='Create an audiance' onChangeText={(text) => this.setState({ description: text })} />
            </Item>
            <Text style={{ paddingLeft: 20, marginTop: 20, color: 'black', fontWeight: 'bold' }}> Deals Date <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Item regular style={[styles.viewLabel1, { marginTop: 8, borderRadius: 10, backgroundColor: 'white' }]}>
              <Input style={styles.input} placeholder='Preset' onChangeText={(text) => this.setState({ location: text })} />
            </Item>
            <Text style={{ paddingLeft: 20, marginTop: 20, color: 'black', fontWeight: 'bold' }}> Address <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Item regular style={[styles.viewLabel1, { marginTop: 8, borderRadius: 10, backgroundColor: 'white' }]}>
              <Input style={styles.input} placeholder='Create an audiance' onChangeText={(text) => this.setState({ description: text })} />
            </Item>

            <Button block style={{ width: '90%', borderRadius: 10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }} onPress={() => this.ManageDealEdit()}>
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