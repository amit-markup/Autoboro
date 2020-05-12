import { Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import {
    Container, Header, Content, Button, Card, CardItem,
    Text, Body, Form, Item
} from 'native-base';
import { withNavigation } from 'react-navigation';

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
        await AsyncStorage.removeItem('profile');
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.signout()} style={{ marginTop: 10, marginBottom: 10, alignContent: 'center', alignItems: 'center', backgroundColor: '#1b244d', height: "22%", marginBottom: "10%" }}>
                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                        <View style={{ position: 'absolute', marginTop: "6%" }}>
                        </View>
                        <Text style={{ borderBottomColor: 'gray', alignContent: 'center', justifyContent: 'center', borderBottomWidth: 1, width: '50%', marginTop: "6%", color: '#fff', marginLeft: '9%' }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default withNavigation(Logout);