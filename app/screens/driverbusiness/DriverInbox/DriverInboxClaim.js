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
    Button
} from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, }} >
                <Header
                   leftComponent={<TouchableOpacity transparent onPress={this.goBack.bind(this)} title=""><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 21, height: 21, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></TouchableOpacity>}
                    centerComponent={{ text: 'Inbox', style: { color: '#333', marginBottom: 25, fontSize: 16 } }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
                <View style={{ padding: 20, backgroundColor:'white', borderRadius:10, width:"95%", alignSelf:'center', marginTop:20 }} >
                   <View style={{flexDirection:'row'}}>
                       <Image style={{width:45, height:45, borderRadius:30}} source={{uri:'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                       <View style={{color:'#fff', paddingLeft:10}}>
                           <Text style={{color:'black', fontSize:12, fontWeight:'bold'}}>Autoboro</Text>
                           <Text style={{color:'gray', fontSize:10}}>11/09/2020</Text>
                       </View>
                    </View>
                    <View style={{}}>
                        <Text style={{color:'gray', fontSize:11, marginTop:6}}>Lorem ipsum is simply content for printing and typing industry.</Text>
                        <Text style={{color:'gray', fontSize:11, marginTop:10}}>Lorem ipsum is simply content for printing and typing industry. Lorem ipsum is simply content of sample.</Text>
                        <TouchableOpacity style={{padding:10, marginTop:15, borderRadius:10, backgroundColor:'#de1f27', width:110}}>
                            <Text style={{color:'white'}}>Claim a Deal</Text>
                        </TouchableOpacity>
                    </View>
                   </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    pic: {
        borderRadius: 30,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
    },
    nameTxt: {
        marginLeft: 14,
        color: '#222',
        fontSize: 12,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 10,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: 'gray',
        fontSize: 10,
        marginLeft: 15,
    },
});