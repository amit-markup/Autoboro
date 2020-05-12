import React from 'react';
import { View, Image, TouchableOpacity, FlatList, ImageBackground, Dimensions } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Item, Input, Icon, Button, Text, Right } from 'native-base';
import { Rating } from 'react-native-ratings';

class DriverServicesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        }

        // this.navigateToIntro();
    }

    // navigateToIntro(){
    //     console.log("test", "in this")

    //     let that = this;
    //     setTimeout(function(){ that.setIntroStack(); }, 3000);

    // }

    // setIntroStack(){
    //     const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'Intro' })],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // }

    componentDidMount() {
        const myitems = [{ "key": "r", "image": require("../../../../assets/sample1.jpg") },
        { "key": "b", "image": require("../../../../assets/sample1.jpg") },
        { "key": "j", "image": require("../../../../assets/sample1.jpg") },
        { "key": "h", "image": require("../../../../assets/sample1.jpg") },
        { "key": "k", "image": require("../../../../assets/sample1.jpg") },
        { "key": "c", "image": require("../../../../assets/sample1.jpg") },
        { "key": "d", "image": require("../../../../assets/sample1.jpg") },
        { "key": "e", "image": require("../../../../assets/sample1.jpg") },
        { "key": "f", "image": require("../../../../assets/sample1.jpg") }
        ];
        this.setState({ dataSource: myitems })
    }

    goToServiceDetails(){
        this.props.navigation.navigate('DriverServiceDetails');
    }

    renderItem = data =>

        <View style={{ width: '48%', height: 190, backgroundColor: '#FFFFFF', marginTop: 10 }}>
            <TouchableOpacity onPress={this.goToServiceDetails.bind(this)}>
                <Image
                    source={require("../../../../assets/sample1.jpg")}
                    style={{ width: '100%', height: 120 }} />

                <Text style={{ color: "#000000", fontSize: 12, width: '100%', textAlign: 'left', paddingLeft: 5 }}>Test</Text>
                <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                    <Text style={{ color: '#000000', alignSelf: 'center', flex: 0.5, textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Email:</Text>
                    <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}>Email</Text>
                </View>

                <View style={{ height: 15, flexDirection: 'row', width: '100%', marginTop: 2 }}>
                    <Text style={{ color: '#000000', alignSelf: 'center', flex: 0.5, textAlign: 'left', fontSize: 12, paddingLeft: 5 }}>Email:</Text>
                    <Text style={{ color: '#000000', textAlign: 'right', alignSelf: 'center', flex: 1.5, fontSize: 12, paddingRight: 5 }}>Email</Text>
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



    render() {

        let splashImg = require("../../../../assets/sample1.jpg");

        return (
            <SafeAreaView style={styles.wrapper}>
                {/* <Image source={splashImg}></Image> */}
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

                    {/* <TouchableOpacity style={{height:150, flex:1}}>
                        <Image source={splashImg} style={{height:150, flex:1}}></Image>
                    </TouchableOpacity> */}

                </View>

                <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 5 }}>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                    <Text style={{ color: "#000000", fontSize: 12, width: '50%', textAlign: 'right' }}>Advertisement</Text>
                </View>
                {/* <View style={{width:'90%', marginLeft:'5%', marginRight:'5%', height:45, flexDirection:'row', backgroundColor:'green'}}> */}

                <Header style={{ backgroundColor: 'transparent', marginLeft: 5 }} searchBar rounded noLeft noShadow>
                    <Item>

                        <Input placeholder="Search" />
                        <Icon name="ios-search" />
                    </Item>
                    <Right style={{ backgroundColor: 'red', maxWidth: 45, marginLeft: 10, justifyContent: 'center', marginRight: 5 }}>
                        <Icon style={{ padding: 4 }} name="ios-search" />
                    </Right>
                </Header>

                {/* <TouchableOpacity style={{width:'10%'}}>

            <Image style={{width:30, height:30}} source={splashImg}></Image>

        </TouchableOpacity> */}
                {/* </View> */}

                {/* <View> */}
                <FlatList
                    numColumns={2}
                    data={this.state.dataSource}
                    contentContainerStyle={styles.container}
                    renderItem={item => this.renderItem(item)}
                    // keyExtractor={item => item.id.toString()}
                    extraData={this.state}
                    columnWrapperStyle={styles.row} />
                {/* </View> */}


            </SafeAreaView>
        )
    }

}

export default DriverServicesList;