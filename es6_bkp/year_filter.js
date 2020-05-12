import React, { Component } from 'react';
import {
    Text, View, Button,TouchableOpacity, Image, StyleSheet, Alert, FlatList
} from 'react-native';


const data = [{
    "id": 58,
    "year": 2000,
    "value": "1120",
  }, {
    "id": 58,
    "year": 2001,
    "value": "1,980",
  },
  {
    "id": 58,
    "year": 2014,
    "value": "600",
  }, {
    "id": 58,
    "year": 2015,
    "value": "200",
  }, {
    "id": 58,
    "year": 2016,
    "value": "180",
  }, {
    "id": 58,
    "year": 2017,
    "value": "145",
  }, {
    "id": 58,
    "year": 2018,
    "value": "1650",
  }, {
    "id": 58,
    "year": 2019,
    "value": "1444",
  }
]

export default class MedicalClearlance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    componentDidMount() {
        const url = 'https://next.json-generator.com/api/json/get/V1geuzIDB'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson', responseJson)
                this.setState({ data: responseJson.Employe })
            })
            .catch((error) => {
                console.log('gfdh');
                console.log(error);
                console.log('sdhsdh');
            })
    }

    buttonFilterMac(item) {
        let lastFiveYrs = data.filter(function(item) {
            return new Date().getFullYear() - item.year <= 5;
          });
          console.log(lastFiveYrs)
    }




    render() {
        return (
            <View style={{ alignContent: 'center', justifyContent: 'center', }}>
                <TouchableOpacity onPress={()=> this.buttonFilterMac()} style={{width:150, height:50, backgroundColor:'green'}}>
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}