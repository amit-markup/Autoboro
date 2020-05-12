import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    SectionList,
    FlatList,
    Dimensions, ActivityIndicator,RefreshControl
} from 'react-native';
import Constants from '../../../config/constant'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Header, Button } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
let deviceWidth = Dimensions.get('window').width


export default class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DataList: [],
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?tree",
            ],
            refreshing:false
        }

    }

    async componentDidMount() {
        this.getServicesApi();
    }

    async getServicesApi() {
        try {
            let response = await fetch(
                Constants.BASE_URL + 'getServiceList', {
                method: 'GET',
            });
            let responseJson = await response.json();
            console.log("responseis*****", responseJson);
            if (responseJson.status == "Success") {
                this.setState({ DataList: responseJson['data']['List'] })
                console.log('DataList', this.state.DataList)
            }
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    goToServiceList(item) {
        console.log('goToServiceList', item.id)
        this.props.navigation.navigate('DriverServicesList', {Serviceid: item.id});
    }

 
    renderItem = ({item}) => {
        console.log(item)
        return (
        <TouchableOpacity style={{ height: 90, width: '30%', backgroundColor: '#FFFFFF', margin: '1.5%', justifyContent: 'center' }} onPress={()=> this.goToServiceList(item)}>
            <Image
                source={{ uri: "http://autoboro.markupdesigns.org/"+ item.icon_image }}
                style={{ width: 30, height: 30, alignSelf: 'center', margin: 5 }} />
            <Text style={{ color: "#000000", fontSize: 12, alignSelf: 'center', textAlign: 'center' }}>  {item.name}</Text>
        </TouchableOpacity>
        )}



    service() {
        return this.state.DataList.map((item, key) => {
            var lising = item.children
            return (
                <View key={key} style={{ padding: 15, marginBottom: 30, }}>
                    <Text style={{ color: '#333', marginLeft:10 }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', width: "100%" }}>
                        <View style={{ flexDirection: 'row', width: "100%" }}>
                        <View style={{ marginLeft: '5%', marginRight: '5%', width: '90%', justifyContent:'center' }}>
                            <FlatList
                                numColumns={3}
                                data={lising}
                                renderItem={item => this.renderItem(item)}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
                            />
                        </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

    onRefresh() {
        this.getServicesApi()
    }




    render() {
        return (
            <View style={styles.wrapper}>
                <Header
                    //leftComponent={<Button transparent><Image source={require('../../../../assets/t13.png')} style={{width:25, height:25, marginBottom:25}} /></Button>}
                    centerComponent={{ text: 'HOME', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#FFF',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
                {this.state.loading ?
                    <ActivityIndicator
                        animating={this.state.loading}
                        color='#FF0000'
                        size="large"
                        style={styles.activityIndicator} />
                    :
                    <ScrollView refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <SliderBox
                                images={this.state.images}
                                onCurrentImagePressed={index =>
                                    console.warn(`image ${index} pressed`)
                                }
                                ImageComponentStyle={{ borderRadius: 5, width: '88%' }}
                            />
                            <Text style={{ alignSelf: 'flex-end', paddingRight: 30 }}>E-Advertisement</Text>
                        </View>
                        <View>
                            {this.service()}
                        </View>
                    </ScrollView>}
            </View>
        );
    }
}