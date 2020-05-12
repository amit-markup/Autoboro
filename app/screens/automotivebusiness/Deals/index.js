import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Container, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Header } from 'react-native-elements';
let deviceWidth = Dimensions.get('window').width
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from '@react-native-community/async-storage';

export default class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?tree",
      ],
      refreshing:false
    };
    this.getDeal();
  }



  async getDeal() {
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    console.log('profile', profile)
    var BusinessID = profile.id
    var Token = profile.token
    console.log(Token)
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("BusinessID", BusinessID);
    await fetch('http://autoboro.markupdesigns.org/api/businessDealListing',
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
              this.setState({data:responseJson['data']})
          }
      }).catch((error) => {
          console.error(error);
      })

}

createDeals(){
  this.props.navigation.navigate('CreateDeals')
}
  goBack() {
    this.props.navigation.navigate('ProfileTab');
  }

  onRefresh() {
    this.getDeal()
}
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Deals', style: { color: 'black', marginBottom: 25, fontSize: 16 } }}
          // rightComponent={
          //   <View style={{ flexDirection: 'row', }}>
          //     <TouchableOpacity style={{ marginBottom: 20 }}>
          //       <Image source={{uri:''}} style={{ width: 18, height: 18, marginBottom: 1 }} />
          //     </TouchableOpacity>
          //     <TouchableOpacity>
          //       <Image source={require('../../../../assets/images/filter.png')} style={{ width: 18, height: 18, marginBottom: 2 }} />
          //     </TouchableOpacity>
          //   </View>}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <ScrollView refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
          <View style={{ flex: 1, marginTop: 15 }}>
            <SliderBox
              images={this.state.images}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              ImageComponentStyle={{ borderRadius: 5, width:'91%' }}
            />
          </View>
          <FlatList 
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              console.log(item)
              return (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.cardImage} source={{ uri: "http://autoboro.markupdesigns.org/" + item.DealPic }} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.count, { marginLeft: 8, fontWeight: 'bold', fontSize: 16 }]}>{item.DealName}</Text>
                    <Text style={[styles.count, { marginLeft: 8 }]}>{item.Description}</Text>
                    <View style={{ borderRadius: 9, }}>
                      <Text style={[styles.title, { color: 'red', marginLeft: 8 }]}>${item.DealPrice}</Text>
                      <Text style={[styles.title,{marginLeft:6}]}>{item.DealOffer}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }} />
        </ScrollView>
        <TouchableOpacity onPress={() => this.createDeals()} style={{ position: 'absolute', backgroundColor: '#e8252b', borderRadius: 30, padding: 10, alignSelf: 'flex-end', bottom: 5, right: 5 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Create Deals</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#f1f1f1'
  },
  list: {
    paddingHorizontal: 10,
    marginTop: 20
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    //backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
    // borderRadius:10
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
    backgroundColor: 'white', borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardImage: {
    flex: 1,
    height: 110,
    width: null,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 9,
    elevation: 9,
  },
  /******** card components **************/
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "black"
  },
  count: {
    fontSize: 14,
    color: "black"
  },
}); 