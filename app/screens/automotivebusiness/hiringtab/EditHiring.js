import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Header, Left, Body, Item, Right, Button, Input, Icon, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class EventsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: 0,
            datePicker: false,
            date: 'Date',
        };
    }


    
    async componentDidMount() {
        this.getHiring()
    }

    async getHiring() {
        let item = this.props.navigation.getParam("item");
        console.log("itemitemitem: ", item)
    
        this.setState({
            title: item['title'],
            description: item['description'],
            date: item['date'],
        })
        console.log('imageeee', this.state.profileImage)
    }
    
   async EditJob() {
      var profile = JSON.parse(await AsyncStorage.getItem("profile"));
      let item = this.props.navigation.getParam("item");
      var jobid = item.id
      var bid = profile.id
      var Token = profile.token
      console.log(bid)
      let formdata = new FormData();
      console.log('formdata', formdata)
      formdata.append("jobid", jobid);
      formdata.append("bid", bid);
      formdata.append("title", this.state.title);
      formdata.append("description", this.state.description);
      formdata.append("date", this.state.date);
      await fetch('http://autoboro.markupdesigns.org/api/editJob',
          {
              method: 'POST',
              headers: {
                'Apiauthorization': Token,
            },
              body: formdata
          }
      ).then((response) => response.json())
          .then((responseJson) => {
              if (responseJson.status === 'Success') {
                this.success(responseJson);
                // this.props.navigation.navigate('HiringTab')
              }
              else
                  alert(responseJson.msg)
          }).catch((error) => {
              console.error(error);
          })
    }

    async success(BusinessHiring){
        console.log('BusinessHiring', BusinessHiring)
      await AsyncStorage.setItem("BusinessHiring", JSON.stringify(BusinessHiring));
      setTimeout(() => {
          this.props.navigation.navigate('HiringTab', { 'BusinessHiring': BusinessHiring })
      }, 1000)
    }

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

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let datePickerHolder = null
        let dob = require("../../../../assets/dob-icon.png");
        if (this.state.datePicker) {
            datePickerHolder = (
              <DateTimePicker
                // date={this.state.date}
                // onDateChange={date => this.setState({ date })}>
                // mode={}
                value={new Date()}
                display="default"
                onChange={this.setDate}>
              </DateTimePicker>
            )
          }
        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: "#ffffff", marginBottom: 0 }}>
                    <Left>
                        <Button transparent onPress={this.goBack.bind(this)}>
                            {/* <Icon name='arrow-back'/> */}
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 50 }}>
                        <Title style={{ color: 'black', fontSize: 16 }}>Edit Hiring</Title>
                    </Body>
                </Header>

                <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
                    <Item regular style={styles.viewLabel1}>
                    <Input style={styles.input} value={this.state.title} placeholder='Job Title' onChangeText={(text) => this.setState({ title: text })} />
                    </Item>
                    <Item regular style={styles.viewLabel1}>
                    <Input style={styles.input} value={this.state.description} placeholder='Job Description' onChangeText={(text) => this.setState({ description: text })} />
                    </Item>
                    <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
                        <Text style={{ color: '#000000', paddingLeft: 10, flex: 3, alignSelf: 'center',  }}>{this.state.date}</Text>
                        <Image source={dob} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }}></Image>
                    </TouchableOpacity>

                    <Button onPress={()=> this.EditJob()} block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, backgroundColor: '#f5900e', marginBottom: 10 }}>
                    <Text style={{ color: '#FFFFFF' }}>SAVE</Text>
                    </Button>
                    {datePickerHolder}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DCDCDC",
        flex: 1,
    },
    eventList: {
        marginTop: 0,
    },
    eventBox: {
        padding: 10,
        marginTop: 0,
        marginBottom: 0,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        width: 35,
        height: 35,
        borderRadius: 30
    },
    eventMonth: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 0,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10
    },
    viewLabel4:{
        height:45, 
        width:'90%', 
        marginTop:10,
        marginRight:'5%', 
        marginLeft:'5%', 
        borderColor:'#000000',
        flexDirection:'row', 
        borderRadius:1, 
        borderWidth: 1,
      },
    viewLabel1: {
        height: 45,
        width: '90%',
        marginTop: 15,
        marginRight: '5%',
        marginLeft: '5%',
        borderColor: '#000000',
        borderRadius: 1,
        borderWidth: 1,
        backgroundColor: '#ffffff',
      },
      input: {
        fontSize: 12,
        textAlign: 'left',
        paddingLeft: 10,
        
      },
});