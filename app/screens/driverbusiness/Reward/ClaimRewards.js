import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { Container, Left, Body, Right, Button, Icon, Title } from 'native-base';
let deviceWidth = Dimensions.get('window').width
import { Header } from 'react-native-elements';

export default class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                { id: 1, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
                { id: 2, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
                { id: 3, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
                { id: 4, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
                { id: 5, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
                { id: 6, flower_image_url: "https://lorempixel.com/400/200/nature/6/" },
            ]
        };
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Header
                    leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
                    centerComponent={{ text: 'Claim Rewards', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    //rightComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/t13.png')} style={{width:25, height:25, marginBottom:25}} /></Button>}
                    // rightComponent={
                    //   <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                    //     <TouchableOpacity>
                    //       <Image source={require('../../../../assets/t13.png')} style={{ width: 25, height: 25, marginBottom: 5 }} />
                    //     </TouchableOpacity>
                    //     <TouchableOpacity>
                    //       <Image source={require('../../../../assets/t13.png')} style={{ width: 25, height: 25, marginBottom: 5 }} />
                    //     </TouchableOpacity>
                    //   </View>
                    // }
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
                <View style={{ marginTop: 5, borderRadius: 5, padding: 10 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Image source={require('../../../../assets/rewards.png')} style={{ width: deviceWidth / 1.1, height: 230, borderRadius: 5 }} />
                    </View>
                </View>


                <View style={{ padding: 16, backgroundColor: 'white', width: deviceWidth / 1.1, alignSelf: 'center', borderRadius: 4, alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '30%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image source={require('../../../../assets/rewards.png')} style={{ height: 100, width: 100, borderRadius: 5 }} />
                            </View>
                        </View>
                        <View style={{ width: '70%', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Full Name: </Text>
                                <Text style={{ color: '#333', fontSize: 13 }}>Richard Grant</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Car Model: </Text>
                                <Text style={{ color: '#333', fontSize: 13 }}>Auto Blog</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Year of Car: </Text>
                                <Text style={{ color: '#333', fontSize: 13 }}>2014</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Vin Number: </Text>
                                <Text style={{ color: '#333', fontSize: 13 }}>JT152EEA100302159</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#dbd4d4', padding: 10, borderRadius: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Address:</Text>
                            <Text style={{ fontSize: 10, color: 'red' }}>See this business autoboro profile</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontSize: 12 }}>Silver Star AutoBlog</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontSize: 12 }}>3440 Tousands Oaks Blvd, CA 91362</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>Tel:</Text>
                            <Text style={{ fontSize: 12, }}> (805) 267-3100</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ClaimRewardDriver')} style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#51bc12', padding: 15, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>PRINT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', width: 165, borderRadius: 4, backgroundColor: '#de1f27', padding: 15, alignSelf: 'center', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>SHARE</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150, width: 165,
        borderRadius: 8
    },

    mainImage: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain'

    },

    modalView: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'

    },

    TouchableOpacity_Style: {

        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute'

    }

}); 