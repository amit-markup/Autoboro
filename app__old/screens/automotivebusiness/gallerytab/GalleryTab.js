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
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Logout from '../../../Components/Logout'

export default class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 2, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 3, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 4, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 5, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 6, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 7, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 8, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 9, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 9, title: "2D%", title2: " off today!", count: 'Te legions 100/2020', image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
      ]
    };
  }

  gallaryDetails = () => {
    this.props.navigation.navigate('GalleryTabDetails')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Image source={require('../../../../assets/t13.png')} style={{ width: 25, height: 25 }} />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 25 }}>
            <Title style={{ color: 'black' }}>Services Gallery</Title>
          </Body>

        </Header>
        <Logout />
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
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity style={styles.card} onPress={() => this.gallaryDetails()}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={require('../../../../assets/t6.png')} />
                </View>
                <View style={styles.cardContent}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.title, { color: 'red' }]}>{item.title}</Text>
                    <Text style={styles.title}>{item.title2}</Text>
                  </View>
                  <Text style={styles.count}>({item.count})</Text>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#d4d8dd'
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
    //backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
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