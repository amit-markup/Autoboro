import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';


export default class Groups extends Component {
    state = {
        data: [
            {
                name: 'Amit',
                price: 30,
                expiryDate: 90
            },
            {
                name: 'Vikash',
                price: 65,
                expiryDate: 2
            },
            {
                name: 'Raja',
                price: 32,
                expiryDate: 1
            },
            {
                name: 'nikita',
                price: 75,
                expiryDate: 600
            },
            {
                name: 'raj',
                price: 120,
                expiryDate: 200
            }
        ],
        thData: [
            { title: 'Name', sortBy: null },
            { title: 'Price', sortBy: 'price' },
            { title: 'Expiry Date', sortBy: 'expiryDate' }
        ],
        sortBy: 'price',
        sortDirection: 1
    };

    get sortedData() {
        const { sortBy, sortDirection, data } = this.state;
        if (sortBy !== 'price' && sortBy !== 'expiryDate') {
            return data.slice();
        }
        return data.sort((a, b) => sortDirection * (b[sortBy] - a[sortBy]));
    }

    setSortBy(sortBy) {
        if (sortBy === null) return;
        this.setState(({ sortBy: curSortBy, sortDirection }) => ({
            sortDirection: sortBy === curSortBy ? -1 * sortDirection : 1,
            sortBy
        }));
    }

    render() {
        const { thData, sortBy: curSortBy, sortDirection } = this.state;
        return (
            <ScrollView style={styles.root}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {thData.map(({ title, sortBy }) =>
                            <TouchableOpacity onPress={() => this.setSortBy(sortBy)}>
                                <Text>{title}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View>
                        {this.sortedData.map(({ name, price, expiryDate }) => (
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }} key={name}>
                                <Text>{name}</Text>
                                <Text>{price}</Text>
                                <Text>{expiryDate}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF"
    },
    mainContentStyle: {

    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 25,
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    memberImage: {
        height: 30,
        width: 30,
        marginRight: 4,
        borderRadius: 10,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    countMembers: {
        color: "#20B2AA"
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    groupName: {
        fontSize: 23,
        color: "#1E90FF"
    },
    groupMembersContent: {
        flexDirection: 'row',
        marginTop: 10
    }
});