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
  Dimensions
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
let deviceWidth = Dimensions.get('window').width

export default class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        { id: 1, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
        { id: 2, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
      ]
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <Left>
            <Button transparent onPress={this.props.navigation.navigate('GalleryTab')}>
              <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 25 }}>
            <Title style={{ color: 'black' }}>Services Details</Title>
          </Body>
        </Header>
        <View style={{ marginTop: 5, borderRadius: 5, padding: 10 }}>
          <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <Image source={{ uri: 'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg' }} style={{ width: deviceWidth / 1.1, borderTopRightRadius: 5, borderTopLeftRadius: 5, height: 170 }} />
          </View>
          <View style={{ padding: 20, width: deviceWidth / 1.1, alignSelf: 'center', backgroundColor: 'white', }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Lorem ipsum dolor</Text>
            <Text style={{ marginTop: 5, fontSize: 14 }}>Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150, width: 165,
    borderRadius: 8
  },

  mainImage: {

    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain'

  },

  modalView: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'

  },

  TouchableOpacity_Style: {

    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute'

  }

}); 