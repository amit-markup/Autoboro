import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calls: [
                { id: 1, name: "Mark Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 2, name: "Clark Man", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 3, name: "Jaden Boor", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
                { id: 4, name: "Srick Tree", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { id: 5, name: "Erick Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { id: 6, name: "Francis Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { id: 8, name: "Matilde Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { id: 9, name: "John Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { id: 10, name: "Fermod Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 11, name: "Danny Doe", status: "active", image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
            ]
        };
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DriverInboxClaim')}>
                <View style={styles.row}>
                    <Image source={{ uri: item.image }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">American Natural Gas Unveils</Text>
                            <Text style={styles.mblTxt}>2 Days ago</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>Lorem ipsum is dummy content.</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
                <View style={{ padding: 20 }} >
                    <FlatList
                        extraData={this.state}
                        data={this.state.calls}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={this.renderItem} />
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