import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Left, Body, Button, Title,  Item, Input, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Header } from 'react-native-elements';

export default class EventsView extends Component {

    constructor(props) {
        super(props);
        let BusinessID = this.props.navigation.getParam("BusinessID");
        console.log('BusinessID', BusinessID)
        this.state = {
            value: 0,
            rating: 3.5,
            Message:'',
            loadingRegister:false,
            BusinessID:BusinessID
        };
    }


    ratingCompleted(rating) {
        this.setState({
            rating: rating
        });
        console.log('rating', this.state.rating)
    }


    async CreateReviews() {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var UID = profile.id
        var Token = profile.token
        let formdata = new FormData();
        console.log(formdata)
        formdata.append("UID", UID);
        formdata.append("BusinessID", this.state.BusinessID);
        formdata.append("Rating", this.state.rating);
        formdata.append("Message", this.state.Message);
        await fetch('http://autoboro.markupdesigns.org/api/driverBusinessReview',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson', responseJson)
                if (responseJson.status === 'Success') {
                    this.success(responseJson);
                    //this.props.navigation.navigate('DriverReviews')
                }
                else
                    alert(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    async success(Reviews){
        console.log('Reviews', Reviews)
      await AsyncStorage.setItem("Reviews", JSON.stringify(Reviews));
      setTimeout(() => {
          this.props.navigation.navigate('DriverReviews', { 'Reviews': Reviews })
      }, 1000)
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Header
                    leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
                    centerComponent={{ text: 'Create Reviews', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                    />
                <View style={{padding:15}}>
                <View style={{}}>
                    <Text>Rate a Star</Text>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={30}
                        style={{paddingRight:200, marginTop:10, marginBottom:10}}
                        startingValue={this.state.rating}
                        onFinishRating={(rating)=> this.ratingCompleted(rating)}
                    />
                </View>
                <View style={{}}>
                    <Text>Message</Text>
                    <Item regular style={styles.viewLabel1}>
                    <Input style={{ color: '#000000', fontWeight: 'bold', fontSize: '15', flex: 3, textAlign: 'left', fontSize: 12, fontFamily: 'Roboto_Regular' }} placeholder='Message' onChangeText={(text) => this.setState({ Message: text })} />
                    </Item>
                </View>
                <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 30, backgroundColor: '#f5900e' }} onPress={()=> this.CreateReviews()}>
              {this.state.loadingRegister ?
                <ActivityIndicator
                  animating={this.state.loadingRegister}
                  color='#FFFFFF'
                  size="large"
                  style={styles.activityIndicator} />
                :
                <Text style={{ color: '#FFFFFF', }}>Create Reviews</Text>}
            </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    viewLabel1:{
        height:55, 
        width:'98%', 
        marginTop:15, 
        backgroundColor:'white',
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
      },

});