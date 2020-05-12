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
    let item = this.props.navigation.getParam("item");
    console.log("itemitemitem: ", item)
    this.state = {
      dataSource: item
    };
  }


  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header style={{backgroundColor:"#ffffff"}}>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              <Image source={require('../../../../assets/t13.png')} style={{width:22, height:22}} />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 48 }}>
            <Title style={{color:'black', fontSize:17}}>Helpful Tips</Title>
          </Body>
        </Header>
        <View style={{ marginTop: 5, borderRadius: 5, padding: 13 }}>
                        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Image
                                source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.dataSource.files }}
                                style={{ width: deviceWidth / 1.1, height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                        </View>
                        <View style={{ padding: 16, width: deviceWidth / 1.1, alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row' }}>
                            <View style={{}}>
                                <Text style={{ marginTop: 0, fontSize: 14 }}>{this.state.dataSource.message}</Text>
                            </View>
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