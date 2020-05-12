import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Left, Body, Button, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from 'react-native-elements';

export default class EventsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: 0,
            delete: 'delete'
        };

    }

    componentDidMount() {
        // this._interval = setInterval(() => {
        //     this.ServiceListing();
        // }, 1000);
        this.ServiceListing();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.navigation.getParam('Reviews') !== prevProps.navigation.getParam('Reviews')) {
            this.ServiceListing()
        }

    }

    ServiceListing = async () => {
        // var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        // var BusinessID = profile.id
        let BusinessID = this.props.navigation.getParam("BusinessID");
        console.log('BusinessID', BusinessID)
        let formdata = new FormData();
        formdata.append("BusinessID", BusinessID);
        await fetch('http://autoboro.markupdesigns.org/api/businessReviewList',
            {
                method: 'POST',
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    this.setState({ dataSource: responseJson['data'] })
                    console.log('dataSource', this.state.dataSource)
                }
                else
                console.log(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    goBack() {
        this.props.navigation.goBack();
    }

    CreateReviews() {
        let BusinessID = this.props.navigation.getParam("BusinessID");
        console.log('BusinessID', BusinessID)
        this.props.navigation.navigate('CreateReviews', { BusinessID: BusinessID })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
                    centerComponent={{ text: 'Reviews', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View>
                        <Text style={{}}>Reviews</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, borderRadius: 5 }} onPress={() => this.CreateReviews()}>
                        <Text style={{ color: 'white' }}>Create Reviews</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.eventList}
                    data={this.state.dataSource}
                    keyExtractor={item => item.id}
                    renderItem={(item) => {
                        console.log(item)
                        return (
                            <View>
                                <View style={styles.eventBox}>
                                    <View style={styles.eventDate}>
                                        <Image source={{ uri: "http://autoboro.markupdesigns.org/" + item.item.Avatar }} style={[styles.eventDay, { alignSelf: 'center', alignContent: 'center', alignItems: 'center' }]} />
                                        <Text style={[styles.eventMonth, { alignSelf: 'center', alignContent: 'center', alignItems: 'center' }]}>{item.item.Rating}</Text>
                                        <Text style={styles.eventMonth}>Reviews</Text>
                                    </View>
                                    <View style={styles.eventContent}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.userName}>{item.item.FirstName} {item.item.LastName}</Text>
                                            <View style={{ paddingLeft: 150, paddingTop: 4 }}>
                                                <Rating
                                                    type='star'
                                                    ratingCount={5}
                                                    imageSize={10}
                                                    startingValue={item.item.Rating}
                                                />
                                            </View>
                                        </View>
                                        <Text style={styles.description}>{item.item.Message}</Text>
                                        {/* <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, height: 73, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignSelf: 'flex-end', position: 'absolute', marginTop: 0 }} onPress={() => this.deleteItem(item)}>
                                            <Text style={{ marginTop: 14, color: 'white' }}>Delete</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DCDCDC",
        flex: 1,
    },
    eventList: {
        marginTop: 0,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        width: 35,
        height: 35,
        borderRadius: 30
    },
    eventMonth: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10
    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    eventTime: {
        fontSize: 18,
        color: "#151515",
    },
    userName: {
        fontSize: 16,
        color: "#151515",
    },
});