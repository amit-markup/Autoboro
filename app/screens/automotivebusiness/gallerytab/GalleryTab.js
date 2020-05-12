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

export default class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "2D%", title1:'Car Wash', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
        {id:2, title: "2D%", title1:'Times', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3, title: "2D%", title1:'Gas Station', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"}, 
        {id:4, title: "2D%", title1:'Car Wash', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"}, 
        {id:5, title: "2D%", title1:'Times', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"}, 
        {id:6, title: "2D%", title1:'Gas Station', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"}, 
        {id:7, title: "2D%", title1:'Times', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"}, 
        {id:8, title: "2D%", title1:'Car Wash', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
        {id:9, title: "2D%", title1:'Times', title2: " off today!",  count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
        {id:9, title: "2D%", title1:'Gas Station', title2: " off today!", count:'Lorem ipsum kuntum..', image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
      ]
    };
  }

  createDeals = () => {
    this.props.navigation.navigate('CreateDeals')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor:'white'}}>
          <Left>
            <Button transparent>
            <Image source={require('../../../../assets/t13.png')} style={{width:25, height:25}} />
            </Button>
          </Left>
          <Body style={{paddingLeft:70}}>
            <Title style={{color:'black'}}>Deals</Title>
          </Body>
        </Header>
        <ScrollView>
        <View style={{marginTop:10, borderRadius:5, padding:10}}>
          <View style={{alignContent:'center', alignItems:'center', alignSelf:'center', justifyContent:'center', borderRadius:10}}>
            <Image source={require('../../../../assets/t16.png')} style={{width:330, height:150, borderRadius:10}}/>
          </View>
          <Text style={{alignSelf:'flex-end'}}>eadvertisement</Text>
        </View>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={require('../../../../assets/t6.png')}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.count, {marginLeft:8, fontWeight:'bold', fontSize:16}]}>{item.title1}</Text>
                  <Text style={[styles.count, {marginLeft:8}]}>{item.count}</Text>
                  <View style={{flexDirection:'row', borderRadius:9,}}>
                  <Text style={[styles.title, {color:'red', marginLeft:8}]}>{item.title}</Text>
                  <Text style={[styles.title]}>{item.title2}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
          </ScrollView>
          <TouchableOpacity  onPress={()=> this.createDeals()} style={{position:'absolute', alignSelf:'flex-end', marginTop:610, backgroundColor:'#e8252b', borderRadius:30, padding:10}}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>Create Deals</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
    backgroundColor:'#f1f1f1'
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    //backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
    // borderRadius:10
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
    backgroundColor:'white', borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  cardImage:{
    flex: 1,
    height: 110,
    width: null,
    borderRadius:8
  },
  imageContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius:9,
    elevation: 9,
  },
  /******** card components **************/
  title:{
    fontSize:15,
    fontWeight:'bold',
    color:"black"
  },
  count:{
    fontSize:14,
    color:"black"
  },
}); 