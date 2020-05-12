import React, { Component } from 'react';
import {
    ListView,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    FlatList
} from 'react-native';

const data = {
    "profile": [
      {
        "proid": {
          "user": "kohinoor"
        },
        "image": "/media/profiles/DSCN3253.JPG",
        "shoptype": "Clothes",
        "city": "Ahemednagar"
      },
      {
        "proid": {
          "user": "shrawani"
        },
        "image": "/media/profiles/PicsArt_08-17-09.24.48_qA94ILU.jpg",
        "shoptype": "Cat Shop",
        "city": "Kopargaon"
      },
      {
        "proid": {
          "user": "rajpal"
        },
        "image": "/media/profiles/PicsArt_08-17-09.24.48_T3birjf.jpg",
        "shoptype": "Clothings",
        "city": "Sangamner"
      },
    ],
    "post": [
      {
        "id": 120,
        "content": "Old Mi Stocks or Sell !!!",
        "url": null,
        "shareproductdealer": "kohinoor",
        "shareproducttype": "Xiaomi Mi",
        "shareproductid": "68",
        "username": "kohinoor",
        "updated": "2017-09-08T10:49:11Z",
        "timestamp": "2017-09-08T10:49:11Z"
      },
      {
        "id": 119,
        "content": "Hello... Miahe...",
        "url": null,
        "shareproductdealer": null,
        "shareproducttype": null,
        "shareproductid": null,
        "username": "shrawani",
        "updated": "2017-09-08T10:38:14Z",
        "timestamp": "2017-09-08T10:38:14Z"
      },
      {
        "id": 115,
        "content": "hello jockey",
        "url": null,
        "shareproductdealer": "rajpal",
        "shareproducttype": "jockey",
        "shareproductid": "65",
        "username": "rajpal",
        "updated": "2017-08-16T11:22:32Z",
        "timestamp": "2017-08-16T11:22:32Z"
      }
    ]
  };
class PopoverFilter extends Component {

    constructor(props) {
        super();
        this.state = {
            //eventTracks: filter
        }
        //this.show = this.show.bind(this);
    }

    render() {
        return (
            <TouchableOpacity style={{backgroundColor:'green', width:110, height:50}} onPress={()=> this.filter()}>
                <Text>Save</Text>
            </TouchableOpacity>
        );
    }

    filter(){
        const profiles = data.profile;
        const posts = data.post;
        const profilePosts = profiles.map(item => ({
        profile: item,
        post: posts.filter(post => post.username === item.proid.user)
        }));
        console.log(profilePosts);
    }
}

export default PopoverFilter;