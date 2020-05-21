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
  TextInput,
  RefreshControl, ActivityIndicator,
} from 'react-native';
import { Container, Header, Left, Body, List, ListItem, Item, Thumbnail, Right, Button, Icon, Title } from 'native-base';
let deviceWidth = Dimensions.get('window').width
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class Blog extends Component {

  constructor(props) {
    super(props);
    let item = this.props.navigation.getParam("item");
    console.log("itemitemitem: ", item)
    this.state = {
      dataSource: item,
      data: [],
      comment: [],
      commentss: [],
      Comments: '',
      commentFoc: false,
      editCommentid: '',
      refreshing: false,
      reply_comment_id: '',
      type: 1,
      autogram: '',
      parentComments:'',
      childComments:'',
      loading:false,
      
    };
    this.FetchComments()
  }



  async FetchComments() {
    let item = this.props.navigation.getParam("item");
    var autogram_id = item.id
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("autogram_id", autogram_id);
    await fetch('http://autoboro.markupdesigns.org/api/autogramCommentList',
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
          this.setState({ comment: responseJson['data']['comment'] })
          this.setState({ commentss: responseJson['data']['comment'] })
          console.log('dsfsdfsjfsfsjjjsfjdsfjs', this.state.commentss, this.state.comment)
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })

  }

  AddComments = async () => {
    let item = this.props.navigation.getParam("item");
    var autogram_id = item.id
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("autogram_id", autogram_id);
    formdata.append("comment", this.state.Comments);
    formdata.append("reply_comment_id", "");
    await fetch('http://autoboro.markupdesigns.org/api/autogramAddComment',
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
          //let item = this.state.comment_id
          this.FetchComments()
          this.handleRefresh();
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })

  }


  EditComment = async (data) => {
    this.myTextInput.focus()
    this.setState({ commentFoc: true, Comments: data.comment, reply_comment_id: data.reply_comment_id })

  }

  async AddReply(data) {
    console.log("reply_comment_id", data)
    this.myTextInput.focus()
    this.setState({ commentFoc: true, reply_comment_id: data.comment_id, autogram: data.user_id })

  }

  async ReplyComments() {
    let item = this.props.navigation.getParam("item");
    var autogram_id = item.id
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", this.state.autogram);
    formdata.append("autogram_id", autogram_id);
    formdata.append("comment", this.state.Comments);
    formdata.append("reply_comment_id", this.state.reply_comment_id);
    await fetch('http://autoboro.markupdesigns.org/api/autogramAddComment',
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
          this.handleRefresh();
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })

  }

  async LikeComments(items) {
    var comment_id = items.comment_id
    console.log('items', items)
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", uid);
    formdata.append("comment_id", comment_id);
    formdata.append("type", this.state.type);
    await fetch('http://autoboro.markupdesigns.org/api/autogramCommentLikeDislike',
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
          //let item = this.state.comment_id
          this.FetchComments()
          //this.refs.toast.show(JSON.stringify(responseJson['message']), DURATION.LENGTH_SHORT);
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })

  }



  DeleteComments = async (items) => {
    var comment_id = items.comment_id
    var user_id = items.user_id
    console.log('items', items)
    var profile = JSON.parse(await AsyncStorage.getItem("profile"));
    var Token = profile.token
    //var uid = profile.id
    let formdata = new FormData();
    console.log('formdata', formdata)
    formdata.append("uid", user_id);
    formdata.append("comment_id", comment_id);
    await fetch('http://autoboro.markupdesigns.org/api/autogramDeleteComment',
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
          this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
          this.FetchComments()
        }
        else
          alert(responseJson.msg)
      }).catch((error) => {
        console.error(error);
      })

  }


  async autogramLike() {
    let item = this.props.navigation.getParam("item");
    console.log("itemitemitem: ", item)
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


  async autogramDislike() {
    let item = this.props.navigation.getParam("item");
    console.log("itemitemitem: ", item)
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


  handleRefresh = () => {
    this.FetchComments();
  }

  goBack() {
    this.props.navigation.goBack();
  }


  onRefresh() {
    this.FetchComments()
}


  renderItem = ({ item }) => {
    var Notification = item
    console.log("children", Notification)
    return (
      <View style={[styles.containers, { marginLeft: 58 }]}>
        <TouchableOpacity>
          <Image style={styles.image} source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.data.files }} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{this.state.data.BusinessName}</Text>
          </View>
          <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style
              ={{ flexDirection: 'row', width: 35 }} onPress={() => this.LikeComments(Notification)}>
              <Image source={require('../../../../assets/images/like.png')} style={{ maxHeight: 12, maxWidth: 12, resizeMode: 'contain', marginTop: 4 }} />
              <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Like</Text>
            </TouchableOpacity>
            <Text style={{  fontSize: 10, fontWeight: 'bold', paddingTop: 3 }}>{Notification.countLike === '0' ? null : Notification.countLike}</Text>
            {/* <TouchableOpacity onPress={() => { this.EditComment(Notification) }}>
              <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Edit</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.DeleteComments(Notification)} >
              <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.AddReply(Notification)}>
              <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Reply</Text>
            </TouchableOpacity>
            <Text note style={{ color: '#333', paddingLeft: 10, fontSize: 10, paddingTop: 3 }}>{moment(Notification.is_created).fromNow()}</Text>
          </View>
          {/* {this.state.commentFocss ? 
                  <Item style={{
                  width: '80%', borderColor: '#1c4478', borderWidth: 2,
                  bottom: 0,
                  left: 35, backgroundColor: 'white'
                }}>
                <Left >
                  <TextInput placeholder="Add a comment"
                    onChangeText={childComments => this.setState({ childComments })}
                    ref={(ref) => { this.myTextInput = ref }}
                    multiline={true}
                    value={this.state.childComments}
                    placeholderTextColor='grey' style={{ fontSize: 13, color: 'grey' }} />
                </Left>
                <Right style={{ maxWidth: 60 }}><Button disabled={this.state.Comments === "" ? true : false} transparent style={{ paddingRight: 5 }} onPress={this.ReplyComments}>
                    <Text style={{ color: '#1c4478', fontWeight: 'bold' }}>Reply</Text></Button>
                </Right>
              </Item>:null} */}
        </View>
      </View>
    )
  }




  service() {
    return this.state.comment.map((item, key) => {
      const Notification = item;
      var Reply = Notification.children
      return (
        <View>
          <View style={[styles.containerss, { backgroundColor: '#fff', }]}>
            <TouchableOpacity>
              <Image style={styles.image} source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.data.files }} />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{this.state.data.BusinessName}</Text>
              </View>
              <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style
                  ={{ flexDirection: 'row', width: 35 }} onPress={() => this.LikeComments(Notification)}>
                  <Image source={require('../../../../assets/images/like.png')} style={{ maxHeight: 12, maxWidth: 12, resizeMode: 'contain', marginTop: 4 }} />
                  <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Like</Text>
                </TouchableOpacity>
                <Text style={{  fontSize: 10, fontWeight: 'bold', paddingTop: 3 }}>{Notification.countLike === '0' ? null : Notification.countLike}</Text>
                {/* <TouchableOpacity onPress={() => { this.EditComment(Notification) }}>
                  <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Edit</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => this.DeleteComments(Notification)} >
                  <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.AddReply(Notification)}>
                  <Text style={{ color: '#1c4478', fontSize: 10, paddingLeft: 5, paddingTop: 3 }}>Reply</Text>
                </TouchableOpacity>
                <Text note style={{ color: '#333', paddingLeft: 10, fontSize: 10, paddingTop: 3 }}>{moment(Notification.is_created).fromNow()}</Text>
              </View>
              {/* {this.state.commentFocs ? 
                  <Item style={{
                  width: '80%', borderColor: '#1c4478', borderWidth: 2,
                  bottom: 0,
                  left: 35, backgroundColor: 'white'
                }} key={key}>
                <Left >
                  <TextInput placeholder="Add a comment"
                    onChangeText={parentComments => this.setState({ parentComments })}
                    ref={(ref) => { this.myTextInput = ref }}
                    multiline={true}
                    value={this.state.parentComments}
                    placeholderTextColor='grey' style={{ fontSize: 13, color: 'grey' }} />
                </Left>
                <Right style={{ maxWidth: 60 }}><Button disabled={this.state.Comments === "" ? true : false} transparent style={{ paddingRight: 5 }} onPress={this.ReplyComments}>
                    <Text style={{ color: '#1c4478', fontWeight: 'bold' }}>Reply</Text></Button>
                </Right>
              </Item>:null} */}
            </View>
          </View>
       <View style={{marginBottom:2,marginTop:-8}}>
          <FlatList
            style={styles.root}
            data={Reply}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            extraData={this.state}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={item => this.renderItem(item)} />
            </View>
        </View>
      )
    })
  }

  render() {
    return (
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
        />
        }>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <Left>
            <Button transparent onPress={this.goBack.bind(this)}>
              <Image source={require('../../../../assets/t13.png')} style={{ width: 22, height: 22 }} />
            </Button>
          </Left>
          <Body style={{ paddingLeft: 48 }}>
            <Title style={{ color: 'black', fontSize: 17 }}>Magazine Detail</Title>
          </Body>
        </Header>

        
        <View style={styles.card}>
          <Image style={{ width: deviceWidth / 1.1, height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.dataSource.files }} />
          <View style={{ padding: 16, width: deviceWidth / 1.1, alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row' }}>
            <View style={{ marginLeft: 2, width: "14%" }}>
              <Image source={{ uri: "http://autoboro.markupdesigns.org/" + this.state.dataSource.files }} style={{ width: 40, height: 40, borderRadius: 30 }} />
            </View>
            <View style={{ marginLeft: 2, width: "68%" }}>
              <Text style={{ fontSize: 12 }}>{this.state.dataSource.message}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, width: "18%" }}>
              <TouchableOpacity onPress={()=> this.autogramLike()}>
                <Image source={require('../../../../assets/images/like.png')} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.autogramDislike()}>
                <Image source={require('../../../../assets/images/dislike.png')} style={{ width: 25, height: 25, marginLeft: 3 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.loading ?
            <ActivityIndicator
              animating={this.state.loading}
              color='#FF0000'
              size="large"
              style={styles.activityIndicator} />
            :
        <View style={{ padding: 18 }}>
          <Item style={{
            width: '100%', borderColor: '#1c4478', borderWidth: 2,
            bottom: 5,
            left: 0, backgroundColor: 'white'
          }}>
            <Left >
              <TextInput placeholder="Add a comment"
                onChangeText={Comments => this.setState({ Comments })}
                ref={(ref) => { this.myTextInput = ref }}
                multiline={true}
                value={this.state.Comments}
                placeholderTextColor='grey' style={{ fontSize: 13, color: 'grey' }} />
            </Left>
            <Right style={{ maxWidth: 60 }}>
              {this.state.commentFoc ? <Button disabled={this.state.Comments === "" ? true : false} transparent style={{ paddingRight: 5 }} onPress={()=> this.ReplyComments()}>
                    <Text style={{ color: '#1c4478', fontWeight: 'bold' }}>Reply</Text></Button> :
                <Button onPress={this.AddComments} disabled={this.state.Comments === "" ? true : false} transparent style={{ paddingRight: 5 }}><Text style={{ color: '#1c4478', fontWeight: 'bold' }}>POST</Text>
                </Button>}
            </Right>

            
          </Item>
          {this.service()}
        </View>}
        <Toast ref="toast" />
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,

  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
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

  },
  activityIndicator: {
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 },











  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  containers: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom:5
  },

  containerss: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },

  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

}); 