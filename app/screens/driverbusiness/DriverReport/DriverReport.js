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
      Description:'',
    }
  }




  async saveProfile() {
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    console.log('profile', profile)
    var UID = profile.id
    var Token = profile.token
    console.log(Token)
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", UID);
    formdata.append("message", this.state.Description);
    await fetch('http://autoboro.markupdesigns.org/api/reportProblem',
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
              this.props.navigation.navigate('DriverServiceDetails')
              this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
          }
      }).catch((error) => {
          console.error(error);
      })

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
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Report a Problem', style: { color: 'black', marginBottom: 25, fontSize: 16 } }}
          //rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
          <View>
            
            <View style={{ width: "90%", borderWidth: 1, marginLeft: 20, marginTop: 20 }}>
              <Textarea placeholder="Describe the issue" rowSpan={5} bordered onChangeText={(text) => this.setState({ Description: text })} style={{ backgroundColor: '#fff', borderColor: '#e8e8e8', height: 100, marginTop:-0 }} />
            </View>
            <Button block style={{ width: '90%', borderRadius: 10, marginLeft: '5%', marginRight: '5%', marginTop: 30, marginBottom: 50, backgroundColor: '#bd3c41' }} onPress={() => this.saveProfile()}>
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