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
  TouchableWithoutFeedback,
  SafeAreaView,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Header, Left, Body, Item, Right, Button, Input, Icon, Title } from 'native-base';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import SendSMS from 'react-native-sms'
import Toast, { DURATION } from 'react-native-easy-toast';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FreshDataList:[],
      news: [],
      Podcast: [],
      articles: [],
      hiring: [],
      clickDataShow: 1,
      date: 'Date',
      numColumns: 3,
      datas: [
        { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
      ],
      columnCount: 3,
      columnCount2: 2,
      page:'1',
      loading:true
    };
    this.autogramListing()
  }


  async autogramListing() {
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("page", this.state.page);
    await fetch('http://autoboro.markupdesigns.org/api/autogramListing',
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
          this.setState({ data: responseJson['data'] })
          this.setState({ FreshDataList: responseJson['data'] })
          console.log('dsfsdfsjfsfsjjjsfjdsfjs', this.state.data)
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })
  }

  async autogramLike(item) {
    var autogram_id = item.id
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("autogram_id", autogram_id);
    formdata.append("type", "1");
    await fetch('http://autoboro.markupdesigns.org/api/autogramLikeDislike',
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
          console.log("dafaf", responseJson.message)
          this.refs.toast.show(JSON.stringify(responseJson['message']), DURATION.LENGTH_SHORT);
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })
  }


  async autogramDislike(item) {
    var autogram_id = item.id
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("autogram_id", autogram_id);
    formdata.append("type", "0");
    await fetch('http://autoboro.markupdesigns.org/api/autogramLikeDislike',
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
          console.log("dafaf", responseJson.message)
          this.refs.toast.show(JSON.stringify(responseJson['message']), DURATION.LENGTH_SHORT);
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })
  }



  driverAutogramDetail(item){
      this.props.navigation.navigate("DriverAutogramDetail", {item:item})
  }


 async newslisting(){
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("page", this.state.page);
    await fetch('http://autoboro.markupdesigns.org/api/newsListing',
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
                console.log("responseJson", JSON.stringify(responseJson))
                this.setState({ news: responseJson['data'] })
                console.log('news', this.state.news)
            }
            else
                alert(responseJson.msg)
        }).catch((error) => {
            console.error(error);
        })
}

async hiringlisting(){
  var profile = JSON.parse(await AsyncStorage.getItem("profile"));
  var Token = profile.token
  let formdata = new FormData();
  console.log('formdata', formdata)
  formdata.append("page", this.state.page);
  await fetch('http://autoboro.markupdesigns.org/api/driverJobListing',
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
              console.log("responseJson", JSON.stringify(responseJson))
              this.setState({ hiring: responseJson['data'] })
              console.log('hiring', this.state.hiring)
          }
          else
              alert(responseJson.msg)
      }).catch((error) => {
          console.error(error);
      })
}

async articlelisting() {
  var profile = JSON.parse(await AsyncStorage.getItem("profile"));
  var Token = profile.token
  let formdata = new FormData();
  console.log('formdata', formdata)
  formdata.append("page", this.state.page);
  await fetch('http://autoboro.markupdesigns.org/api/articleListing',
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
              this.setState({ loading: false })
              console.log("responseJson", JSON.stringify(responseJson))
              this.setState({ articles: responseJson['data'] })
              console.log('articles', this.state.articles)
          }
          else
              alert(responseJson.msg)
      }).catch((error) => {
          console.error(error);
      })
}


async podcastListing(){
  var profile = JSON.parse(await AsyncStorage.getItem("profile"));
  var Token = profile.token
  let formdata = new FormData();
  console.log('formdata', formdata)
  formdata.append("page", this.state.page);
  await fetch('http://autoboro.markupdesigns.org/api/podcastListing',
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
              console.log("responseJson", JSON.stringify(responseJson))
              this.setState({ Podcast: responseJson['data'] })
              console.log('Podcast', this.state.Podcast)
          }
          else
              alert(responseJson.msg)
      }).catch((error) => {
          console.error(error);
      })
}



someFunction() {
  SendSMS.send({
      //Message body
      body: 'Please follow https://aboutreact.com',
      //Recipients Number
      recipients: ['0123456789'],
      //An array of types that would trigger a "completed" response when using android
      successTypes: ['sent', 'queued']
  }, (completed, cancelled, error) => {
      if(completed){
        console.log('SMS Sent Completed');
      }else if(cancelled){
        console.log('SMS Sent Cancelled');
      }else if(error){
        console.log('Some error occured');
      }
  });
}

  changeData(data) {
    if (data === "1") {
      this.setState({ clickDataShow: 1 })
    }
    else if (data === "2") {
      this.setState({ clickDataShow: 2 })
      this.articlelisting()
    }
    else if (data === "3") {
      this.setState({ clickDataShow: 3 })
      this.podcastListing()
    }
    else if (data === "4") {
      this.setState({ clickDataShow: 4 })
      this.newslisting()
    }
    else if (data === "5") {
      this.setState({ clickDataShow: 5 })
      this.hiringlisting()
    }
    else if (data === "6") {
      this.setState({ clickDataShow: 6 })
    }
    else if (data === "7") {
      this.setState({ clickDataShow: 7 })
    }
  }

  dataRender() {
    if (this.state.clickDataShow === 1) {
      return (
        this.Autogram()
      );
    }
    else if (this.state.clickDataShow === 2) {
      return (
        this.Article()
      );
    }
    else if (this.state.clickDataShow === 3) {
      return (
        this.Podcast()
      );
    }
    else if (this.state.clickDataShow === 4) {
      return (
        this.News()
      );
    }
    else if (this.state.clickDataShow === 5) {
      return (
        <View>
        {this.Hiring()}
        </View>
      );
    }
    else if (this.state.clickDataShow === 6) {
      return (
        this.CreateHiring()
      );
    }
    else if (this.state.clickDataShow === 7) {
      return (
        this.podcastDetail()
      );
    }
  }

  showDatePicker() {
    this.setState({ datePicker: true })
  }

  CreateHiring() {
    let years = require("../../../../assets/years.png");
    return (
      <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
        <Item regular style={styles.viewLabel1}>
          <Input style={styles.input} placeholder='Job Title' onChangeText={(text) => this.setState({ email: text })} />
        </Item>
        <Item regular style={styles.viewLabel1}>
          <Input style={styles.input} placeholder='Address' onChangeText={(text) => this.setState({ email: text })} />
        </Item>
        {/* <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Date' onChangeText={(text) => this.setState({ email: text })} />
            </Item> */}
        <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
          <Text style={{ color: '#000000', paddingLeft: 9, alignSelf: 'center', fontSize: 12,  }}>{this.state.date}</Text>
        </TouchableOpacity>
        <Item regular style={styles.viewLabel1}>
          <Input style={styles.input} placeholder='Description' onChangeText={(text) => this.setState({ email: text })} />
        </Item>
        <Item regular style={styles.viewLabel1}>
          <Input style={styles.input} placeholder='Amount' onChangeText={(text) => this.setState({ email: text })} />
        </Item>

        <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, backgroundColor: '#f5900e', marginBottom: 10 }}>
          <Text style={{ color: '#FFFFFF' }}>CREATE HIRING</Text>
        </Button>
      </ScrollView>
    )
  }


  Article = () => {
    return this.state.articles.map(element => {
      return (
        <ScrollView style={{ padding: 10, borderRadius: 10 }}>
          {this.state.loading ?
          <ActivityIndicator
            animating={this.state.loading}
            color='#FF0000'
            size="large"
            style={styles.activityIndicator} />
          :
          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: "40%" }}>
                <Image style={{ width: 130, height: 130, borderRadius: 5 }} source={{ uri: "http://autoboro.markupdesigns.org/" + element.featured_image }} />
              </View>
              <View style={{ paddingLeft: 0, width: "60%" }}>
                <Text style={{ color: '#5377a0' }}>{element.name}</Text>
                <Text>{element.updated_at}</Text>
                <Text style={{}}>{element.content}</Text>
              </View>
            </View>
          </View>}
        </ScrollView>
      );
    });
  };


  podcastDetail(item) {
    this.props.navigation.navigate("podcastDetail", {item:item})
  };

  Podcast() {
    return (
      <View>
        <FlatList style={styles.list}
          data={this.state.Podcast}
          keyExtractor={(item) => {
            return item.id;
          }}
          numColumns={this.state.columnCount}
          key={this.state.columnCount}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity style={[styles.card, { padding: 5 }]} onPress={() => this.podcastDetail(item)}>
                <Image source={{uri: "http://autoboro.markupdesigns.org/" + item.featured_image}} style={{width: 108, height: 108,}} />
                <Text style={{ color: '#022b58', width: 108, fontWeight: 'bold', fontSize: 11, paddingLeft:30 }}>{item.name}</Text>
              </TouchableOpacity>
            )
          }} />
      </View>
    )
  }

  News() {
    return (
      <View>
        <FlatList style={styles.lists}
          data={this.state.news}
          keyExtractor={(item) => {
            return item.id;
          }}
          numColumns={this.state.columnCount2}
          key={this.state.columnCount2}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.cards}>
                <View style={styles.imageContainers}>
                  <Image style={styles.cardImages} source={{ uri: "http://autoboro.markupdesigns.org/" + item.featured_image }} />
                </View>
                <View style={styles.cardContents}>
                  <Text style={styles.titles}>{item.name}</Text>
                  <Text style={styles.counts}>{item.content}</Text>
                </View>
              </View>
            )
          }} />
      </View>
    )
  }

  Hiring = () => {
    return this.state.hiring.map(element => {
      return (
        <ScrollView style={{ padding: 10, borderRadius: 10, }}>
          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ width: "80%" }}>
                <Text style={{ color: '#5377a0', fontWeight: 'bold' }}>{element.title}</Text>
                <Text style={{ color: '#b2aeae' }}>{element.date}</Text>
                <Text style={{}}>{element.description}</Text>
                {/* <Text style={{ color: '#5377a0', fontWeight: 'bold', fontSize: 13 }}>Amount $10,000</Text> */}
              </View>
              <View style={{ width: "20%", marginLeft: 15, flexDirection: 'column', paddingLeft: 20, borderLeftWidth: 1, borderLeftColor: 'gray' }}>
                <TouchableOpacity onPress={() => { Linking.openURL('tel:'); }}>
                <Image style={{ width: 30, height: 30, marginTop: 10, borderRadius: 5 }} source={require('../../../../assets/images/caller.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.someFunction.bind(this)}>
                <Image style={{ width: 30, height: 30, marginTop: 15, borderRadius: 5 }} source={require('../../../../assets/images/messagess.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    });
  };


  searchFilterFunction = (term) => {
    let FreshDataList = [...this.state.FreshDataList]
    if (term === '') {
        this.setState({ data: FreshDataList })
    } else {
        var term = term.toUpperCase()
        var filterList = FreshDataList.filter(item => {
            return item.message.toUpperCase().includes(term)
        })
        this.setState({ data: filterList })
    }
};

  Autogram() {
    return (
      <View style={{marginBottom:240}}>
        <Header style={{ backgroundColor: "#E6E6E6", marginLeft: 0 }} searchBar rounded noLeft noShadow>
          <Item style={{ width: 130 }} >
            <Input placeholder="Search" onChangeText={text => this.searchFilterFunction(text)} />
            <Icon name="ios-search" />
          </Item>
          <Right style={{ maxWidth: 85, marginLeft: 4, justifyContent: 'center', marginRight: 2 }}>
            <TouchableOpacity style={{ margin: 2 }}>
              <Image source={require('../../../../assets/images/black-menu.png')} style={{ width: 38, height: 38, borderRadius: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeData("6")} style={{ margin: 2 }} >
              <Image source={require('../../../../assets/images/plus.png')} style={{ width: 38, height: 38, borderRadius: 5 }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <FlatList style={styles.list}
          data={this.state.data}
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
              <TouchableOpacity style={styles.card} onPress={()=> this.driverAutogramDetail(item)}>
                <Image style={styles.cardImage} source={{ uri: "http://autoboro.markupdesigns.org/" + item.files}} />
                <View style={styles.cardFooter}>
                  <View style={{ marginLeft: 2, width: "14%" }}>
                    <Image source={{ uri: "http://autoboro.markupdesigns.org/" + item.files }} style={{ width: 40, height: 40, borderRadius: 30 }} />
                  </View>
                  <View style={{ marginLeft: 2, width: "68%" }}>
                    <Text style={{ fontSize: 12 }}>{item.message}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, width:"18%" }}>
                    <TouchableOpacity onPress={()=> this.autogramLike(item)}>
                    <Image source={require('../../../../assets/images/like.png')} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.autogramDislike(item)}>
                    <Image source={require('../../../../assets/images/dislike.png')} style={{ width: 25, height: 25, marginLeft: 3 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#ffffff", marginBottom: 0 }}>
          <Left>
            <Button transparent>
              <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
            </Button>
          </Left>
          <Body style={{ alignItems: 'center', paddingLeft: 70 }}>
            <Title style={{ color: 'black', fontSize: 16 }}>Megazine</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', backgroundColor: "#f1f1f1", padding: 5 }}>
          <TouchableOpacity onPress={() => this.changeData("1")} style={{ borderWidth: this.state.clickDataShow === 1 ? 2 : 0, backgroundColor: '#978307', borderRadius: 8, width: "16%", height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/images/autogram.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ fontSize: 9, color: '#fff' }}>Autogram</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeData("2")} style={{ borderWidth: this.state.clickDataShow === 2 ? 2 : 0, backgroundColor: '#699607', borderRadius: 8, width: "16%", height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/images/articles.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ fontSize: 9, color: '#fff' }}>Article</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeData("3")} style={{ borderWidth: this.state.clickDataShow === 3 ? 2 : 0, backgroundColor: '#07966a', borderRadius: 8, width: "16%", height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/images/podcasts.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ fontSize: 9, color: '#fff' }}>Podcast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeData("4")} style={{ borderWidth: this.state.clickDataShow === 4 ? 2 : 0, backgroundColor: '#077e96', borderRadius: 8, width: "16%", height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/images/news.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ fontSize: 9, color: '#fff' }}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeData("5")} style={{ borderWidth: this.state.clickDataShow === 5 ? 2 : 0, backgroundColor: '#4a0795', borderRadius: 8, width: "16%", height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/images/hiring.png')} style={{ width: 25, height: 25 }} />
            <Text style={{ fontSize: 9, color: '#fff' }}>Hiring</Text>
          </TouchableOpacity>
        </View>
        {this.state.clickDataShow === 1 || this.state.clickDataShow === 2 || this.state.clickDataShow === 3 || this.state.clickDataShow === 4 || this.state.clickDataShow === 5 || this.state.clickDataShow === 6 ?
          <View>
            {this.dataRender()}
          </View> : null}
          <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  containers: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 10
  },
  box: {
    padding: 5,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  title: {
    fontSize: 18,
    color: "#151515",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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




  /******** news **************/
  contain: {
    flex: 1,
    marginTop: 20,
  },
  lists: {
    paddingHorizontal: 10,
  },
  listContainers: {
    alignItems: 'center'
  },
  separators: {
    marginTop: 10,
  },
  viewLabel4: {
    height: 45,
    width: '90%',
    marginTop: 15,
    marginRight: '5%',
    marginLeft: '5%',
    borderColor: '#000000',
    flexDirection: 'row',
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  /******** card **************/
  cards: {
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '45%',
    marginHorizontal: 10,
    borderRadius: 5
  },
  cardContents: {
    paddingVertical: 17,
    justifyContent: 'space-between',
    padding: 5
  },
  cardImages: {
    flex: 1,
    height: 150,
    width: null,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  imageContainers: {
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
  titles: {
    fontSize: 12,
    color: "#778899"
  },
  counts: {
    fontSize: 13,
    flex: 1,
    fontWeight: 'bold',
    color: "#022b58"
  },
}); 