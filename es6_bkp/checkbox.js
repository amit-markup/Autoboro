import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert, FlatList
} from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class MedicalClearlance extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      checked:[],
      selected:[],
      data : [
      {
        id: 1,
        name: "ALL",
      },
      {
        id: 2,
        name: "Android",
      },
      {
        id: 3,
        name: "iOS",
      },
      {
        id: 4,
        name: "React Native",
      }
    ],
  }
}


handleChange = (index,item) => {
    let { checked,selected} = this.state;
    checked[index] = !checked[index];
    this.setState({ checked : checked});
    if(checked[index] == true){
        selected.push(item.name)
    }else {            
        selected.pop(item.name)
    }
    console.log(this.state.selected)
    }

  
  render() {
    let { data, checked } = this.state;
    return (
      <FlatList
        data={data}
        extraData={this.state}
        renderItem={({ item, index }) =>
          <CheckBox
            center
            title={item.name}
            onPress={() => this.handleChange(index,item)}
            //checked={checked[index]}
            checked={this.state.checked[index]}
             />
        }
      />
    );
  }
}