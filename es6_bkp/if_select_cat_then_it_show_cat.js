import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

const persons = [{"name":"Joe","animals":[{"species":"dog","name":"Bolt"},{"species":"cat","name":"Billy"}]},{"name":"Bob","animals":[{"species":"dog","name":"Snoopy"}]}]

export default class HelloWorldApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
        }
    }

    filter() {
        const result = persons.filter(({animals}) => {
            return animals.some(({species}) => species == 'cat')
          })
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