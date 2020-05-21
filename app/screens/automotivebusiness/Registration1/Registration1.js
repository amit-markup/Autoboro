import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, KeyboardAvoidingView, Picker } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title } from 'native-base';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { Header, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

class Registration1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      languageList: [],
      language: '',
      loading: true,
      ownBusiness: '',
      showServices: false,
      selectedData: [],
      Regular: '',
      Midgrade: '',
      Premium: '',
      Diesel: '',
      start_time:'',
      end_time:''
    }
    this.getLanguageApi();
  }

  async getLanguageApi() {
    var that = this;
    try {
      let response = await fetch(
        Constants.BASE_URL + 'languageList', {
        method: 'GET',
      });
      // this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (responseJson.status == "Success") {
        this.setState({ languageList: responseJson['data']['language'] }, () => {
          that.getServicesApi();
        })
      }
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  async getServicesApi() {
    try {
      let response = await fetch(
        Constants.BASE_URLS + 'services', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (response.status == 200) {
        this.setState({ dataSource: responseJson['data'] });
      }
      // this.setLanguagePicker(response.status, responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }


  // async getServicesApi() {
  //   try {
  //     let response = await fetch(
  //       Constants.BASE_URL + 'services', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     this.setState({ loading: false })
  //     let responseJson = await response.json();
  //     console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
  //     if (response.status == 200) {
  //       this.setState({ dataSource: responseJson['data'] });
  //       console.log('dsfsgsgsgsdgsgsg', this.state.dataSource)
  //     }
  //     // this.setLanguagePicker(response.status, responseJson);
  //     return responseJson;
  //   } catch (error) {
  //     console.error(error);
  //     this.setState({ loading: false })
  //   }
  // }

  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
      styles.selected : styles.list;
    // const index = this.state.dataSource.findIndex(
    //   item => data.item.id === item.id
    // );
    // this.state.dataSource[index] = data.item;

    data.item.isSelect ? this.state.selectedData.push(data.item.id) : this.state.selectedData.pop(data.item.id)
    this.setState({ dataSource: this.state.dataSource, selectedData: this.state.selectedData });
    console.log('selectedData', this.state.selectedData)
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  renderItem = data =>

    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}>

      <Image
        source={{ uri: data.item.icon_image }}
        style={{ width: 30, height: 30, margin: 5 }} />

      <Text style={styles.lightText}>  {data.item.name}  </Text>

      <Image
        source={data.item.isSelect ? require("../../../../assets/7.png") : null}
        style={{ width: 30, height: 30, margin: 5, alignSelf: 'flex-end' }} />

    </TouchableOpacity>

  getSevicesList() {
    // this.state.showServices = !this.state.showServices;
    // console.log("showservices****", this.state.showServices);
    this.setState({ showServices: !this.state.showServices })
  }

  goToBusinessRegister() {
    // this.props.navigation.navigate('UploadDealForm');       // to comment..
    // return;
    //this.props.navigation.navigate('Registration2',  {language : this.state.language, selectedData:this.state.selectedData, ownBusiness: this.state.ownBusiness});

    if (this.state.language == '' || this.state.language == null || this.state.language == undefined) {
      this.refs.toast.show('Please select a language.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.Regular == '' || this.state.Regular == null) {
      this.refs.toast.show('Please enter Regular Price.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.Midgrade == '' || this.state.Midgrade == null) {
      this.refs.toast.show('Please enter Midgrade Price.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.Premium == '' || this.state.Premium == null) {
      this.refs.toast.show('Please enter Premium Price.', DURATION.LENGTH_SHORT);
      return;
    }
    else if (this.state.Diesel == '' || this.state.Diesel == null) {
      this.refs.toast.show('Please enter Diesel Price.', DURATION.LENGTH_SHORT);
      return;
    }
    else {
      if (this.state.selectedData.length == 0 || this.state.selectedData == null) {
        if (this.state.ownBusiness == '' || this.state.ownBusiness == null) {
          this.refs.toast.show('Please enter your business.', DURATION.LENGTH_SHORT);
          return;
        }
      }
      this.props.navigation.navigate('Registration2', { language: this.state.language, selectedData: this.state.selectedData, ownBusiness: this.state.ownBusiness, Regular: this.state.Regular, Midgrade: this.state.Midgrade, Premium: this.state.Premium, Diesel: this.state.Diesel , start_time: this.state.start_time , end_time: this.state.end_time });
    }

  }

  goBack() {
    this.props.navigation.goBack();
  }
  render() {

    let splashImg = require("../../../../assets/5.png");

    let languageList = this.state.languageList.map((list, index) => {
      return (
        <Picker.Item label={list.name} value={list.id} key={index} style={{  }} />
      );
    });
    let logoImg = require("../../../../assets/4.png");

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Auto Business', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <ScrollView>

          <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 45, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item value='' label='Select Language' style={{  }} />
              {languageList}
            </Picker>
          </View>

          <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 15, flexDirection: 'row' }}>

              <Item regular style={styles.viewLabel2}>
              <DatePicker
                            style={{width:90}}
                            mode="time"
                            is24Hour={false}
                            date={this.state.start_time}
                            placeholder="00:00"
                            format='h:mm A'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(start_time) => {this.setState({start_time: start_time})}}
                            iconComponent={
                                <Icon
                                    size={0}
                                    name='clock-o'
                                    type='font-awesome'
                                    containerStyle={styles.dateIcon}
                                />
                            }
                            customStyles={{
                                dateText: styles.dateText,
                                dateInput: {borderWidth:0}
                            }}
                        />
              </Item>

              <Item regular style={styles.viewLabel3}>
              <DatePicker
                            style={{width:90}}
                            mode="time"
                            is24Hour={false}
                            date={this.state.end_time}
                            placeholder="00:00"
                            format='h:mm A'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(end_time) => {this.setState({end_time: end_time})}}
                            iconComponent={
                                <Icon
                                    size={0}
                                    name='clock-o'
                                    type='font-awesome'
                                    containerStyle={styles.dateIcon}
                                />
                            }
                            customStyles={{
                                dateText: styles.dateText,
                                dateInput: {borderWidth:0}
                            }}
                        />
              </Item>

            </View>

          <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} keyboardType='numeric' maxLength={15} placeholder='Enter Regular Price ($)' onChangeText={(text) => this.setState({ Regular: text })} />
          </Item>
          <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} keyboardType='numeric' maxLength={15} placeholder='Enter Midgrade Price ($)' onChangeText={(text) => this.setState({ Midgrade: text })} />
          </Item>
          <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} keyboardType='numeric' maxLength={15} placeholder='Enter Premium Price ($)' onChangeText={(text) => this.setState({ Premium: text })} />
          </Item>
          <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} keyboardType='numeric' maxLength={15} placeholder='Enter Diesel Price ($)' onChangeText={(text) => this.setState({ Diesel: text })} />
          </Item>

          <View style={{ width: '90%', height: 45, marginLeft: '5%', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, backgroundColor: 'white' }}>
            <TouchableOpacity style={{ width: '100%', height: 45, flexDirection: 'row' }} onPress={this.getSevicesList.bind(this)}>
              <Text style={{ flex: 1.5, alignSelf: 'center', color: '#FFFFFF', fontSize: 12, marginLeft: 10, marginRight: 10, color: '#000000' }}>Automotive Business</Text>
              <Image source={splashImg} style={{ width: 1, height: 8, alignSelf: 'center', flex: 0.15, marginRight: 10 }}></Image>
            </TouchableOpacity>
          </View>

          {this.state.showServices ?
            <ScrollView style={{ width: '100%', marginTop: 1 }}>
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}
                extraData={this.state}
              />
            </ScrollView> : null}

          <Text style={{ height: 45, textAlign: 'center', marginTop: 10, color: '#000000', fontSize: 12, marginLeft: 10, marginRight: 10 }}>If the above required service is not available then enter your own business below</Text>

          <Item regular style={styles.viewLabel1}>
            <Input style={styles.input} placeholder='Enter your own' onChangeText={(text) => this.setState({ ownBusiness: text })} />
          </Item>

          <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 20, backgroundColor: '#f5900e', marginBottom: 20 }} onPress={this.goToBusinessRegister.bind(this)}>
            <Text style={{ color: '#FFFFFF', }}>Continue</Text>
          </Button>
        </ScrollView>

        <Toast ref="toast" />

      </KeyboardAvoidingView>
    );
  }

}

export default Registration1;