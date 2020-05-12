import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

const family =[{"name":"Jack",  "age": 26},
              {"name":"Jill",  "age": 22},
              {"name":"James", "age": 5 },
              {"name":"Jenny", "age": 2 }];

export default class HelloWorldApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: family,
        }
      }

    filter(){
        const adults = family.filter(({ age }) => age > 18 );
        console.log(adults)
        this.setState({ data: adults}); 
    }

  render() {

    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {this.state.data.map(Item => (
          <View>
            <Text>{Item.name}</Text>
            <Text>{Item.age}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={()=> this.filter()} style={{backgroundColor:'green', width:150, height:50, alignContent:'center', alignItems:'center', alignSelf:'center'}}>
          <Text>Button</Text>
      </TouchableOpacity>
      </View>
    );
  }
}