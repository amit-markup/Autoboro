import React from 'react';
import { View, Image, Dimensions, Picker, Text, ScrollView } from 'react-native';
import {
    PieChart, LineChart
} from 'react-native-chart-kit';
import { Header, Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
    {
        name: "Visitor",
        population: 1,
        color: "#36a07f",
        legendFontColor: "#36a07f",
        legendFontSize: 15
    },
    {
        name: "Gender",
        population: 2,
        color: "#e2e238",
        legendFontColor: "#e2e238",
        legendFontSize: 15
    },
    {
        name: "Source",
        population: 3,
        color: "#ea5d62",
        legendFontColor: "#ea5d62",
        legendFontSize: 15
    },
    {
        name: "Source",
        population: 4,
        color: "#c97ec0",
        legendFontColor: "#c97ec0",
        legendFontSize: 15
    },
];

class StatisticsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carPartType: '',
        }
        //this.setData();
    }

    // async setData(){
    //     var notification = JSON.parse(await AsyncStorage.getItem("notification"));
    //     AsyncStorage.removeItem(notification)
    // }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    //leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/next-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25, transform: [{ rotate: '185deg' }] }} /></Button>}
                    centerComponent={{ text: 'Statics', style: { color: 'black', marginBottom: 25, fontSize: 16 } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />
                <ScrollView style={{}}>
                    <View style={{ width: '90%', flexDirection: 'row', marginLeft: '5%', marginRight: '5%', marginTop: 10, }}>
                        <View style={{ width: '50%', borderRadius: 5, borderWidth: 1, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, borderColor: '#000000' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                        <View style={{ width: '50%', borderRadius: 5, borderWidth: 1, marginLeft: 5, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, marginLeft: 10 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                    </View>
                    <LineChart
                        data={{
                            labels: [
                                '10',
                                '20',
                                '30',
                                '40',
                                '50',
                                '60',
                            ],
                            datasets: [
                                {
                                    data: [10, 20, 30, 40, 50, 60],
                                    strokeWidth: 2,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width / 1.1}
                        height={240}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            alignSelf: 'center'
                        }}
                    />


                    <View style={{ width: '90%', flexDirection: 'row', marginLeft: '5%', marginRight: '5%', marginTop: 10, }}>
                        <View style={{ width: '100%', borderRadius: 5, borderWidth: 1, marginLeft: 5, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, marginLeft: 10 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                    </View>
                    <PieChart
                        data={data}
                        width={Dimensions.get('window').width / 1.1}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{ alignSelf: 'center', borderRadius: 16, marginTop: 15 }}
                        accessor="population"
                        backgroundColor="#fff"
                        paddingLeft="15"
                        absolute
                    />
                    <View style={{ width: '90%', flexDirection: 'row', marginLeft: '5%', marginRight: '5%', marginTop: 10, }}>
                        <View style={{ width: '50%', borderRadius: 5, borderWidth: 1, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, borderColor: '#000000' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                        <View style={{ width: '50%', borderRadius: 5, borderWidth: 1, marginLeft: 5, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, marginLeft: 10 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ width: '91%', flexDirection: 'row', marginLeft: '5%', marginRight: '5%', marginBottom: 20, marginTop: 10, }}>
                        <View style={{ width: '100%', borderRadius: 5, borderWidth: 1, marginLeft: 0, borderColor: "#ada6a6" }}>
                            <Picker
                                selectedValue={this.state.carPartType}
                                style={{ height: 40, marginLeft: 5 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.getBusinessTypeApi(itemValue)
                                }>
                                <Picker.Item value='' label='Select Part' style={{  }} />
                            </Picker>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default StatisticsTab;