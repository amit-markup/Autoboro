import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

var myArray = [{
    "title": "title one",
    "category": ["dogs", "cats", "pets"]
  },
  {
    "title": "title two",
    "category": ["gold fish", "pets"]
  }
];
  
export default class HelloWorldApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
        }
    }

    filter() {
        var result = [...new Set([].concat(...myArray.map(e => e.category)))]
        console.log(result)
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* {this.state.data.map(Item => (
          <View>
            <Text>{Item.name}</Text>
            <Text>{Item.age}</Text>
        </View>
      ))} */}
                <TouchableOpacity onPress={() => this.filter()} style={{ backgroundColor: 'green', width: 150, height: 50, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text>Button</Text>
                </TouchableOpacity>
            </View>
        );
    }
}