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
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Container, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Header } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      loading: true,
    };
    this.Favorites();
  }


  async Favorites() {
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var UID = profile.id
    console.log(Token)
    let formdata = new FormData();
    formdata.append("uid", UID);
    await fetch('http://autoboro.markupdesigns.org/api/favoriteList',
      {
        method: 'POST',
        body: formdata
      }
    ).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false })
        if (responseJson.status === 'Success') {
          console.log("responseJson", JSON.stringify(responseJson))
          this.setState({ data: responseJson['data'] })
          console.log('data', this.state.data)
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })
  }

  gallaryDetails = () => {
    this.props.navigation.navigate('DriverServiceGalleryDetails')
  }

  goBack() {
    this.props.navigation.goBack();
  }

  onRefresh() {
    this.Favorites()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 18, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
          centerComponent={{ text: 'Favorites', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
          rightComponent={
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity style={{ marginBottom: 20 }}>
                <Image source={require('../../../../assets/images/white-inbox.png')} style={{ width: 18, height: 18, marginBottom: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../../../assets/images/filter.png')} style={{ width: 18, height: 18, marginBottom: 2 }} />
              </TouchableOpacity>
            </View>
          }
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            height: 45,
          }}
        />
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        {this.state.loading ?
        <ActivityIndicator
          animating={this.state.loading}
          color='#FF0000'
          size="large"
          style={styles.activityIndicator} />
        :
        <FlatList style={styles.list}
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
            renderItem={(item) => {
              console.log('item', item)
              return (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.cardImage} source={{ uri: "http://autoboro.markupdesigns.org/" + item.item.BusinessCoverPic }} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.item.BusinessName}</Text>
                    <Text style={{ fontSize: 11 }}>{item.item.BusinessDescription}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.title, { fontSize: 12 }]}>Price: </Text>
                      <Text style={[styles.title, { color: 'red', fontSize: 12 }]}>${item.item.Regular}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }} />}
          </ScrollView>
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
    backgroundColor: "white",
    flexBasis: '45%',
    marginHorizontal: 10,
    padding: 5
  },
  cardContent: {
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

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