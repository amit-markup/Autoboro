import React, { Component } from 'react';
import { Text, View, Switch, TouchableOpacity, Button, Platform, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class HelloWorldApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pushNotification: false,
      EmailSwitch: false
    }
  }

  pushNotification = (value) => {
    this.setState({ pushNotification: value })
  }
  EmailSwitch = (value) => {
    this.setState({ EmailSwitch: value })
  }

  goBack() {
    this.props.navigation.goBack();
}

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header
          leftComponent={<TouchableOpacity transparent onPress={this.goBack.bind(this)} title=""><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></TouchableOpacity>}
          centerComponent={{ text: 'Setting', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', padding: 13, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Push Notifications</Text>
            <Switch
              onTintColor="red"
              style={{ marginBottom: 10 }}
              thumbTintColor="#fff"
              tintColor="gray"
              onValueChange={this.pushNotification}
              value={this.state.pushNotification} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 1, padding: 13, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Email</Text>
            <Switch
              onTintColor="red"
              style={{ marginBottom: 10 }}
              thumbTintColor="#fff"
              tintColor="gray"
              onValueChange={this.EmailSwitch}
              value={this.state.EmailSwitch} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16, padding: 15, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Change Password</Text>
            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21 }} />
          </View>
          {/* <View style={{ flexDirection: 'row', marginTop: 16, padding: 15, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Change Diving License</Text>
            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16, padding: 15, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Select Language</Text>
            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16, padding: 15, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Reward</Text>
            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21 }} />
          </View>
          <View style={{ marginTop: 16, padding: 15, justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 5 }}>
            <Text>Reward</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image source={require('../../../../assets/images/facebook.png')} style={{ width: 21, height: 21 }} />
              <Image source={require('../../../../assets/images/twitter.png')} style={{ width: 21, height: 21, marginLeft: 20 }} />
              <Image source={require('../../../../assets/images/Instagram.png')} style={{ width: 21, height: 21, marginLeft: 20 }} />
            </View>
          </View> */}
        </View>
      </View>
    );
  }
}