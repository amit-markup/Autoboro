import { Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item
} from 'native-base';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    componentDidMount() {
        this.getData();
    }


    async getData() {
        await AsyncStorage.removeItem("DeviceToken");
        this.props.navigation.navigate('SelectProfession');
    }

    render() {
        return (
            <View></View>
        );
    }
}
export default withNavigation(Logout);