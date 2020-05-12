import React from 'react';
import { View, Image, Slider, TouchableOpacity, StatusBar, Modal, TouchableWithoutFeedback, TouchableHighlight, FlatList, ImageBackground, Dimensions } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import { Header, Item, Input, Icon, Button, Text, Right, List, ListItem, CheckBox, Left, Body, Title } from 'native-base';
import { Rating } from 'react-native-ratings';

class DriverServicesList extends React.Component {

    constructor(props) {
        super(props);

        let Serviceid = this.props.navigation.getParam("Serviceid");
        console.log('Serviceid', Serviceid)
        this.state = {
            dataSource: [],
            isFilter: false,
            Serviceid:Serviceid,
            value: 0
        }
    }
    componentDidMount() {
        const myitems = [
            { "key": "r", "image": require("../../../../assets/sample1.jpg"), "name": "Amoco Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "b", "image": require("../../../../assets/sample1.jpg"), "name": "US Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "j", "image": require("../../../../assets/sample1.jpg"), "name": "Amoco Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "h", "image": require("../../../../assets/sample1.jpg"), "name": "Amoco Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "k", "image": require("../../../../assets/sample1.jpg"), "name": "US Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "c", "image": require("../../../../assets/sample1.jpg"), "name": "Amoco Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "d", "image": require("../../../../assets/sample1.jpg"), "name": "US Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "e", "image": require("../../../../assets/sample1.jpg"), "name": "Amoco Gas Station", "price": "$15.00", "Distance": "2.7 miles away" },
            { "key": "f", "image": require("../../../../assets/sample1.jpg"), "name": "US Gas Station", "price": "$15.00", "Distance": "2.7 miles away" }
        ];
        this.setState({ dataSource: myitems })
        this.setState({ FreshDataList: myitems })
    }


    getMoreData = async () => {
        let formdata = new FormData();
        formdata.append("Serviceid", this.state.Serviceid);
        await fetch('http://autoboro.markupdesigns.org/api/businessListing',
          {
            method: 'POST',
            body: formdata
          }
        ).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.status ==='Success'){
              console.log("responseJson" ,JSON.stringify(responseJson))
              this.setState({ dataSource: responseJson['data']['Listing'] })
              this.setState({ FreshDataList: responseJson['data']['Listing'] })
              console.log('dataSource', this.state.dataSource)
            }
            else
            alert(responseJson.msg)
          }).catch((error) => {
            console.error(error);
          })
      }

    goToServiceDetails() {
        this.props.navigation.navigate('DriverServiceDetails');
    }

    searchFilterFunction = (term) => {
        console.log('term:', term)
        let FreshDataList = [...this.state.FreshDataList]
        if (term === '') {
            this.setState({ dataSource: FreshDataList })
        } else {
            var term = term.toUpperCase()
            var filterList = FreshDataList.filter(item => {
                return item.name.toUpperCase().includes(term)
            })
            this.setState({ dataSource: filterList })
        }
    };

    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value),
            };
        });
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ width: '48%', height: 190, backgroundColor: '#FFFFFF', marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DriverServiceDetails')}>
                    <Image
                        source={require("../../../../assets/sample1.jpg")}
                        style={{ width: '100%', height: 120 }} />
                    <Text style={{ color: "#000000", fontSize: 12, width: '100%', textAlign: 'left', paddingLeft: 5, fontWeight: 'bold' }}>{item.name}</Text>
                    <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                        <Text style={{ color: '#000000', alignSelf: 'center', textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Price</Text>
                        <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}>{item.price}</Text>
                    </View>
                    <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                        <Text style={{ color: '#000000', alignSelf: 'center', textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Distance</Text>
                        <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}>{item.Distance}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', marginTop: 5, paddingLeft: 5 }}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={10}
                            startingValue={3}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    goBack() {
        this.props.navigation.goBack();
    }

    open() {
        this.setState({ isFilter: true })
    }

    render() {
        let splashImg = require("../../../../assets/sample1.jpg");
        return (
            <SafeAreaView style={styles.wrapper}>
                <Header style={{ backgroundColor: "#ffffff" }}>
                    <Left>
                        <Button transparent>
                            <Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, transform: [{ rotate: '185deg' }] }} />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 55 }}>
                        <Title style={{ color: 'black' }}>Services</Title>
                    </Body>
                </Header>
                <View style={{ width: '100%', height: 120, marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: '45%', marginLeft: '5%', paddingRight: 2 }}>
                        <Image source={splashImg} style={{ height: 120, width: '100%' }}></Image>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', marginLeft: 100 }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '45%', marginRight: '5%', paddingLeft: 2 }}>
                        <Image source={splashImg} style={{ height: 120, width: '100%' }}></Image>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', marginLeft: 100 }}>
                            <Image source={splashImg} style={{ height: 20, width: 20, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 5 }}>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                </View>
                <Header style={{ backgroundColor: 'transparent', marginLeft: 5 }} searchBar rounded noLeft noShadow>
                    <Item>
                        <Input placeholder="Search" onChangeText={text => this.searchFilterFunction(text)} />
                        <Icon name="ios-search" />
                    </Item>
                    <Right style={{ backgroundColor: '#383232', maxWidth: 45, marginLeft: 10, justifyContent: 'center', marginRight: 5 }}>
                        <TouchableWithoutFeedback style={{ backgroundColor: '#383232', margin: 5 }} onPress={() => this.setState({ isFilter: true })}>
                            <Icon name="ios-funnel" style={{ fontSize: 25, padding: 6, color: 'white', backgroundColor: '#383232' }} />
                        </TouchableWithoutFeedback>
                    </Right>
                </Header>
                <View style={{ paddingBottom: 350 }}>
                    <FlatList
                        numColumns={2}
                        data={this.state.dataSource}
                        contentContainerStyle={styles.container}
                        renderItem={item => this.renderItem(item)}
                        // keyExtractor={item => item.id.toString()}
                        extraData={this.state}
                        columnWrapperStyle={styles.row} />
                </View>
                <Modal
                    transparent={true}
                    visible={this.state.isFilter}
                    animationType='slide'
                    onRequestClose={this.closeModal}>

                    <View style={{
                        position: 'relative',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                        justifyContent: 'space-between',

                        backgroundColor: 'white'
                    }}>
                        <TouchableHighlight onPress={() => this.setState({ isFilter: false, }, () => { this.getMoreData })} style={{ alignItems: 'flex-end' }}>

                            <Icon name="md-close" style={{ padding: 5, right: 1.5, fontSize: 30, color: 'black', margin: 10 }} />
                        </TouchableHighlight>
                        <View style={{
                            flex: 1
                        }}>
                            <List style={{ borderColor: '#e26d0e', borderWidth: 1, backgroundColor: 'white' }}>
                                <ListItem itemDivider style={{ backgroundColor: '#e26d0e', padding: 0, }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Sort By Distance</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: 'white', padding: 0 }} >
                                    <Left>
                                        <Slider
                                            step={1}
                                            maximumValue={45}
                                            onSlidingComplete={this.change.bind(this)}
                                            onValueChange={this.change.bind(this)}
                                            style={{ flex: 1 }}
                                            value={this.state.value}
                                            thumbTintColor='#e26d0e'
                                            maximumTrackTintColor='black'
                                            minimumTrackTintColor='#e26d0e'
                                        />
                                    </Left>
                                    <Right>
                                        <Text style={{ color: '#5c391b', fontSize: 14 }}>{this.state.value} km</Text>
                                    </Right>
                                </ListItem>
                            </List>

                            <List style={{ borderColor: '#e26d0e', borderWidth: 1, backgroundColor: '#f2dece' }}>
                                <ListItem itemDivider style={{ backgroundColor: '#e26d0e', padding: 0 }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Sort By Catogory</Text>
                                </ListItem>
                            </List>

                            <FlatList
                                data={this.state.allCat}
                                renderItem={({ item, index }) => (
                                    <View style={{ flex: 1, padding: 1 }}>

                                        <List style={{ borderColor: 'white', borderWidth: 1, backgroundColor: 'white' }}>

                                            <ListItem style={{ backgroundColor: 'white', padding: 0 }} >

                                                <Left>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('USregister')}>
                                                        <Text style={{ color: '#5c391b', fontSize: 14 }}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                </Left>
                                                <Right>
                                                    <CheckBox color='#e26d0e' style={{ paddingHorizontal: 5 }} checked={this.state.isChecked[index]}
                                                        onPress={() => this.isIconCheckedOrNot(item, index)} />
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </View>
                                )}

                                keyExtractor={(item, index) => index.toString()}
                            />
                            <Text></Text>

                            <Button block style={{ marginHorizontal: 20, backgroundColor: '#e26d0e', }} >
                                <Text>Apply</Text>
                            </Button>
                            <Text>
                            </Text>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        )
    }
}

export default DriverServicesList;