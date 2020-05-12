import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

const data = [
    {
      id: 1,
      name: 'A',
      status: 1
    },
    {
      id: 2,
      name: 'B',
      status: 1
    },
    {
      id: 3,
      name: 'C',
      status: 3
    },
    {
      id: 4,
      name: 'D',
      status: 2
    }
  ]
  
  const selectedStatus = [
    {
      id: 1,
      status: 1
    },
    {
      status: 3
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
        var result = [];
        data.forEach((value) => {
            selectedStatus.forEach(val => {
                if(value.status == val.status) { 
                    result.push(value) 
                } 
            }); 
        });
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