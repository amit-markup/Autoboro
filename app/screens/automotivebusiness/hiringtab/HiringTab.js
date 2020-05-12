import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    RefreshControl,
    Linking
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Header, Left, Body, Item, Right, Button, Input, Icon, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class EventsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: 0,
            refreshing:false
        };
    }



    componentDidMount(){
        // this._interval = setInterval(() => {
        //     this.getJoblisting();
        // }, 1000);
        this.getJoblisting();
      }

      componentDidUpdate(prevProps, prevState) {
        if (this.props.navigation.getParam('BusinessHiring') !== prevProps.navigation.getParam('BusinessHiring')) {
            this.getJoblisting()
        }

    }

      onRefresh() {
        this.getJoblisting()
      }
    
      getJoblisting = async () => {
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var bid = profile.id
        var Token = profile.token
        console.log(bid)
        let formdata = new FormData();
        console.log('formdata', formdata)
        formdata.append("bid", bid);
        await fetch('http://autoboro.markupdesigns.org/api/businessJobListing',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    console.log("responseJson", JSON.stringify(responseJson))
                    this.setState({ dataSource: responseJson['data'] })
                    console.log('hiring', this.state.dataSource)
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    async deleteJoblisting(item) {
        var Jobid = item.id
        var profile = JSON.parse(await AsyncStorage.getItem("profile"));
        var bid = profile.id
        var Token = profile.token
        console.log(bid)
        let formdata = new FormData();
        console.log('formdata', formdata)
        formdata.append("jobid", Jobid);
        formdata.append("bid", bid);
        await fetch('http://autoboro.markupdesigns.org/api/deleteJob',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'Success') {
                    this.getJoblisting();
                }
                else
                    alert(responseJson.msg)
            }).catch((error) => {
                console.error(error);
            })
    }

    editHiring (item) {
        console.log('itemmm', item)
        this.props.navigation.navigate('EditHiring', {item:item})
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: "#ffffff", marginBottom: 15 }}>
                    <Left>
                        <Button transparent onPress={this.goBack.bind(this)}>
                            {/* <Icon name='arrow-back'/> */}
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 75 }}>
                        <Title style={{ color: 'black', fontSize: 16 }}>Hiring</Title>
                    </Body>
                </Header>
                <ScrollView refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
                <Header style={{ backgroundColor: 'transparent', marginLeft: 0 }} searchBar rounded noLeft noShadow>
                    <Item>
                        <Input placeholder="Search"  />
                        <Icon name="ios-search" />
                    </Item>
                    <Right style={{ maxWidth: 85, marginLeft: 4, justifyContent: 'center', marginRight: 2 }}>
                    <TouchableWithoutFeedback style={{ backgroundColor: '#383232', margin: 5,  }}>
                            <Icon name="ios-funnel" style={{ fontSize: 20, padding: 9,borderRadius: 5, color: 'white', backgroundColor: '#383232', width:37 }} />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateHiring')} style={{ margin: 1 }} >
                    <Image source={require('../../../../assets/images/plus.png')} style={{ width: 38, height: 38, borderRadius: 5 }} />
                    </TouchableOpacity>
                </Right>
                </Header>
                <FlatList enableEmptySections={true}
                    style={styles.eventList}
                    data={this.state.dataSource}
                    extraData={this.state}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={(item) => {
                        return (
                            <View onPress={() => this.eventClickListener("row")}>
                                <View style={styles.eventBox}>
                                    <View style={styles.eventContent}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{width:"85%"}}>
                                            <Text style={styles.userName}>{item.item.title}</Text>
                                            </View>
                                            <View style={{ paddingTop: 0, width:"15%" }}>
                                                <Text style={[styles.userNames, { fontSize: 10, paddingTop: 3 }]}>{item.item.date}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.description}>{item.item.description}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <TouchableOpacity onPress={()=> this.editHiring(item.item)}>
                                                <Text style={[styles.userName, { marginLeft: 5, padding: 5, backgroundColor: '#333', width: 60, borderRadius: 5, color: '#fff', paddingLeft: 18 }]}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=> this.deleteJoblisting(item.item)}>
                                                <Text style={[styles.userName, { marginLeft: 10, padding: 5, backgroundColor: '#ba4141', width: 60, borderRadius: 5, color: '#fff', paddingLeft: 13 }]}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
                    </ScrollView>
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
        marginTop: 0,
        marginBottom: 0,
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
        marginLeft: 0,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10
    },
    description: {
        fontSize: 12,
        color: "#646464",
    },
    eventTime: {
        fontSize: 18,
        color: "#151515",
    },
    userName: {
        fontSize: 13,
        color: "#151515",
        fontWeight: 'bold'
    },
    userNames: {
        fontSize: 8,
        color: "#151515",
    },
});