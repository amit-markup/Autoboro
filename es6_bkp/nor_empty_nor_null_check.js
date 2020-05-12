import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';


export default class HelloWorldApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
        }
    }

    filter() {
        var array = [{id: "1"}, {id: "2"}, {id: ""}, {something: "else"}, {id: "3"}, {id: "4"}];
        var filteredArray = array.filter(x => x.id != "" && x.id != null);
        console.log(filteredArray);
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