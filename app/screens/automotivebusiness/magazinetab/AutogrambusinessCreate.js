import React from 'react';
import { View, Image, FlatList,Slider, Text, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator, Picker } from 'react-native';
import styles from '../../automotivebusiness/Registration2/styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Container, Textarea, Content, Form, Item, Input, List, ListItem, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import Constants from '../../../config/constant'
import { Header } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class Registration2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      arrayHolder: [],
      avatarSource: '',
      Description:'',
      DealPic:""
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


        // if (strType == 'DealPic') {
        //   this.setState({ DealPic: source });

        // }
        if (strType == 'DealPic') {
            this.setState({ avatarSource: source }, () => {
              that.joinData();
            });
          }

      }
    });
  }

  joinData = () => {
    this.state.arrayHolder.push(this.state.avatarSource);
    this.setState({ arrayHolder: this.state.arrayHolder });
  }



  async saveProfile() {
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var uid = profile.id
    var Token = profile.token
    console.log(Token)
    let formdata = new FormData();
    console.log('formdata', formdata)

    this.state.arrayHolder.forEach((element) => {
        console.log(element)
         const newFile = {
           uri: element, 
           type: 'image/jpeg',
           name:'DealPic.jpg'
         }
         formdata.append('file[]', newFile.uri)
       });
    formdata.append("uid",uid);
    formdata.append("message", this.state.Description);
    await fetch('http://autoboro.markupdesigns.org/api/addAutogram',
      {
          method: 'POST',
          headers: {
              'Apiauthorization': Token,
          },
          body: formdata
      }
  ).then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.status === 'Success') {
              this.props.navigation.navigate("MagazineTab")
          }
      }).catch((error) => {
          console.error(error);
      })

}

async success(CreateDeal){
  console.log(CreateDeal)
  this.props.navigation.navigate('Deals')
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


    return (
      <SafeAreaView style={styles.wrapper}>
        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25 }} /></Button>}
          centerComponent={{ text: 'Add Autogram', style: { color: '#fff', marginBottom: 25, fontSize: 16 } }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{
            backgroundColor: '#d55459',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
          <View>
            <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 270, width: '100%', backgroundColor: '#FF0000' }}>
              <View >
                <Image source={this.state.avatarSource != '' ? { uri: this.state.avatarSource } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this, 'DealPic')}>
                  <Image source={splashImgs} style={{ height: 30, width: 30, borderRadius: 30 }}></Image>
                </TouchableOpacity>
                <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontFamily: 'Roboto_Regular' }}>Upload File</Text>
              </View>
            </LinearGradient>
            <View style={{ width: "90%", borderWidth: 1, marginLeft: 20, marginTop: 20 }}>
              <Textarea placeholder="Messsgae" rowSpan={5} bordered ref={bio => { this.bio = bio }} onChangeText={(text) => this.setState({ Description: text })} style={{ backgroundColor: '#f3f3f3', borderColor: '#e8e8e8', height: 80 }} />
            </View>
            <Button block style={{ width: '90%', borderRadius: 10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }} onPress={() => this.saveProfile()}>
              {this.state.loadingRegister ?

                <ActivityIndicator
                  animating={this.state.loadingRegister}
                  color='#FFFFFF'
                  size="large"
                  style={styles.activityIndicator} />
                :

                <Text style={{ color: '#FFFFFF', }}>ADD AUTOGRAM</Text>}
            </Button>

          </View>

        </ScrollView>

        <Toast ref="toast" />

      </SafeAreaView>
    )
  }

}

export default Registration2;