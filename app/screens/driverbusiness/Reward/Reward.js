//Example of React Native Speedometer Graph
import React, { Component } from 'react';
//Import React
import { SafeAreaView, Image, TouchableOpacity, Button, StyleSheet, TextInput, Text, View } from 'react-native';
//Import basic component from React Native
import RNSpeedometer from 'react-native-speedometer';
//Import library for Speedometer
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';

import { Header, Left, Body, Title } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        refreshing:false,
        Data1:[],
        Data2:[],
        Data3:[],
        Data:[],
        value:0,
        Rewardpoints:0,
        reddemRewardpoints:[]
    }
    this.getReward();
    this.driverRewardPoints();
}

async getReward() {
  try {
      let response = await fetch(
          Constants.BASE_URL + 'rewardGifts', {
          method: 'GET',
      });
      let responseJson = await response.json();
      console.log("responseis*****", responseJson);
      if (responseJson.status == "Success") {
          this.setState({ Data1: responseJson['data'][0] })
          this.setState({ Data2: responseJson['data'][1] })
          this.setState({ Data3: responseJson['data'][2] })
          this.setState({ Data: responseJson['data'] })
          console.log('sgsdfhsh', this.state.Data)
          this.claimRewardPoints(this.state.Data)
      }
      return responseJson;
  } catch (error) {
      console.error(error);
  }
}

async driverRewardPoints() {
  var profile = JSON.parse(await AsyncStorage.getItem("profile"));
  var ProfileId = profile.id
  var Token = profile.token
  console.log('Token', Token)
  let formdata = new FormData();
  console.log('formdata', formdata)
  formdata.append("uid", ProfileId);
  await fetch('http://autoboro.markupdesigns.org/api/driverRewardPoints',
      {
          method: 'POST',
          headers: {
              'Apiauthorization': Token,
          },
          body: formdata
      }
  ).then((response) => response.json())
      .then((responseJson) => {
          console.log('formdata', responseJson)
          if (responseJson.status === 'Success') {
              this.setState({Rewardpoints:responseJson['data']})
          }
      }).catch((error) => {
          console.error(error);
      })
}


async claimRewardPoints(item) {
  console.log('item', item[0].id)
  var giftid = item[0].id
  var profile = JSON.parse(await AsyncStorage.getItem("profile"));
  var ProfileId = profile.id
  var Token = profile.token
  console.log('Token', Token)
  let formdata = new FormData();
  console.log('formdata', formdata)
  formdata.append("uid", ProfileId);
  formdata.append("giftid", giftid);
  await fetch('http://autoboro.markupdesigns.org/api/redeemRewardPoints',
      {
          method: 'POST',
          headers: {
              'Apiauthorization': Token,
          },
          body: formdata
      }
  ).then((response) => response.json())
      .then((responseJson) => {
          console.log('formdata', responseJson)
          if (responseJson.status === 'Success') {
              this.setState({reddemRewardpoints:responseJson['data']})
              console.log("redeeem reward", this.state.reddemRewardpoints)
              this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
          }
      }).catch((error) => {
        this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
      })
}

  //setting the value for Speedometer

  goBack() {
    this.props.navigation.goBack();
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header style={{ backgroundColor: "#ffffff" }}>
                    <Left>
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                    </Left>
                    <Body style={{ paddingLeft: 55 }}>
                        <Title style={{ color: 'black' }}>Reward</Title>
                    </Body>
                </Header>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <View>
          <Text style={{ marginTop: 90, transform: [{ rotate: '-63deg' }] }}>{this.state.Data1.name}</Text>
          </View>
          <Text style={{ marginTop: 10, transform: [{ rotate: '-25deg' }] }}>{this.state.Data2.name}</Text>
          <Text style={{ marginTop: 10, transform: [{ rotate: '25deg' }] }}>{this.state.Data3.name}</Text>
          <Text style={{ marginTop: 90, transform: [{ rotate: '63deg' }] }}>{this.state.Data1.name}</Text>
        </View>
        <RNSpeedometer
          value={this.state.Rewardpoints}
          size={300}
          labelNoteStyle={{ fontSize: 13, color: '#333' }}
          wrapperStyle={{ position: 'absolute', marginTop: 100 }}
          labels={[
            {
              name: 'Points',
              labelColor: '#ff2900',
              activeBarColor: '#57e067',
            },
            {
              name: 'Points',
              labelColor: '#f4ab44',
              activeBarColor: '#43cc53',
            },
            {
              name: 'Points',
              labelColor: '#00ff6b',
              activeBarColor: '#57e067',
            },
            {
              name: 'Points',
              labelColor: '#00ff6b',
              activeBarColor: '#43cc53',
            },
          ]}
        //Labels for the different steps of Speedometer
        />

<View style={{ marginTop: 180, marginLeft:55, position:'absolute', justifyContent:'center', alignContent:'center'}}>
          <View>
          <Text style={{ marginLeft: 0, transform: [{ rotate: '-70deg' }], color:'#fff' }}>{this.state.Data1.point}</Text>
          <Text style={{ marginLeft: 22, transform: [{ rotate: '-70deg' }], color:'#fff' }}>Points</Text>
          </View>
        </View>

        <View style={{ marginTop: 120, marginLeft:125, position:'absolute', justifyContent:'center', alignContent:'center'}}>
          <View>
          <Text style={{ marginLeft: 0, transform: [{ rotate: '-30deg' }], color:'#fff' }}>{this.state.Data2.point}</Text>
          <Text style={{ marginLeft: 3, transform: [{ rotate: '-30deg' }], color:'#fff' }}>Points</Text>
          </View>
        </View>

        <View style={{ marginTop: 115, marginLeft:220, position:'absolute', justifyContent:'center', alignContent:'center'}}>
          <View>
          <Text style={{ marginLeft: 15, transform: [{ rotate: '33deg' }], color:'#fff' }}>{this.state.Data3.point}</Text>
          <Text style={{ marginLeft: 0, transform: [{ rotate: '33deg' }], color:'#fff' }}>Points</Text>
          </View>
        </View>

        <View style={{ marginTop: 180, marginLeft:280, position:'absolute', justifyContent:'center', alignContent:'center'}}>
          <View>
          <Text style={{ marginLeft: 25, transform: [{ rotate: '65deg' }], color:'#fff' }}>{this.state.Data1.point}</Text>
          <Text style={{ marginLeft: 0, transform: [{ rotate: '65deg' }], color:'#fff' }}>Points</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', alignSelf: 'center', height: 100, width: 350, backgroundColor: '#fff', marginTop: 160 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Conratulations!</Text>
          <Text>Mr. Richard Grant</Text>
        </View>
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Click below green button to claim your rewards</Text>
        </View>
        <TouchableOpacity onPress={()=> this.claimRewardPoints(this.state.Data)} style={{ alignSelf: 'center', marginTop: 25, padding: 15, backgroundColor: 'green', marginBottom: 20, width: 160, borderRadius: 10 }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>CLAIM NOW</Text>
        </TouchableOpacity>
        <Toast ref="toast" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 25,
    fontSize: 16,
    marginTop: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
});