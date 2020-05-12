import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        { id: 1, flower_image_url: "https://lorempixel.com/400/200/nature/6/"},
        { id: 2, flower_image_url: "https://lorempixel.com/400/200/nature/6/"},
        ]
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header style={{backgroundColor:"#ffffff"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('GalleryTab')}>
              <Image source={require('../../../../assets/t13.png')} style={{width:25, height:25}} />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 25 }}>
            <Title style={{color:'black'}}>Services Details</Title>
          </Body>
        </Header>
        <View style={{marginTop:5, borderRadius:5, padding:10}}>
          <View style={{alignContent:'center', alignItems:'center', alignSelf:'center', justifyContent:'center', borderRadius:10}}>
            <Image source={{uri:'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg'}} style={{width:340, height:150, borderTopRightRadius:10, borderTopLeftRadius:10}}/>
          </View>
          <View style={{padding:16,  backgroundColor:'white',}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:17}}>Lorem ipsum dolor</Text>
            <Text style={{marginTop:5, fontSize:14}}>Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor </Text>
          </View>
        </View>
        <View style={{padding:10}}>
          <Text>Gas Prices</Text>
        <View style={{marginTop:5, backgroundColor:'#424244', borderRadius:5, padding:15}}>
          <View style={{padding:16, flexDirection:'row', justifyContent:'space-between'}}>
            <View>
            <View style={{backgroundColor:'#d3d3d3', borderRadius:8, padding:5}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>$ 4.159</Text>
            </View>
            <Text style={{color:'white', fontSize:11, alignSelf:'center'}}>Regular</Text>
            </View>
            <View>
            <View style={{backgroundColor:'#d3d3d3', borderRadius:8, padding:5}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>$ 4.159</Text>
            </View>
            <Text style={{color:'white', fontSize:11, alignSelf:'center'}}>Moderate</Text>
            </View>
            <View>
            <View style={{backgroundColor:'#d3d3d3', borderRadius:8, padding:5}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>$ 4.159</Text>
            </View>
            <Text style={{color:'white', fontSize:11, alignSelf:'center'}}>Premium</Text>
            </View>
            <View>
            <View style={{backgroundColor:'#d3d3d3', borderRadius:8, padding:5}}>
            <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>$ 4.159</Text>
            </View>
            <Text style={{color:'white', fontSize:11, alignSelf:'center'}}>Dissent</Text>
            </View>
          </View>
          <Text style={{color:'white', fontSize:14, alignSelf:'center'}}>Last Updated on Dec 6, 2019</Text>
        </View>
        </View>
        <View style={{padding:10}}>
          <View style={{flexDirection:'row', marginBottom:5, justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold'}}>Gallery</Text>
            <TouchableOpacity>
            <Text style={{color:'red', marginRight:5}}>See More ></Text>
            </TouchableOpacity>
          </View>
        <FlatList
            data={ this.state.dataSource }
            renderItem={({item}) => 
              <View style={{flex:1, flexDirection: 'column', margin:1 }}> 
                <TouchableOpacity>
                  <Image style={styles.imageThumbnail} source = {require('../../../../assets/t8.png')} />
                </TouchableOpacity>
              </View>
            }
            numColumns = { 2 }
            keyExtractor={(item, index) => index}
           />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MainContainer :{
    
    justifyContent: 'center',
    flex:1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
     
    },
     
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150, width:165,
     borderRadius:8
    },
  
    mainImage:{
  
     justifyContent: 'center',
     alignItems: 'center',
     height: '100%',
     width:'98%',
     resizeMode : 'contain'
  
    },
  
    modalView:{
  
     flex:1, 
     justifyContent: 'center', 
     alignItems: 'center', 
     backgroundColor: 'rgba(0,0,0,0.4)'
  
    },
  
    TouchableOpacity_Style:{
  
     width:25, 
     height: 25, 
     top:9, 
     right:9, 
     position: 'absolute'
  
 }

}); 