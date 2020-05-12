import React from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';

class DriverHomeTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: true,
        }

        this.getServicesApi();
    }

    async getServicesApi() {
        try {
            let response = await fetch(
                Constants.BASE_URL + 'services', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            if (response.status == 200) {
                this.setState({ dataSource: responseJson['data'] });
            }
            // this.setLanguagePicker(response.status, responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    goToServiceList(){
        console.log("goToServiceList******", this.props.navigation);
        this.props.navigation.navigate('DriverServicesList');
    }

    // _renderCell(cell) {
    //     return <View onLayout={event => {
    //         var width = event.nativeEvent.layout.width;
    //         if (this.state.cellWidth != width) {
    //             this.setState({ cellWidth: width })
    //         }
    //         if (this.state.cellHeight != width) {
    //             this.setState({ cellHeight: width })
    //         }
    //     }}>
    //         <View style={{ width: this.state.cellWidth, height: this.state.cellHeight, justifyContent: 'center', backgroundColor: cell.backgroundColor }}
    //             source={require("../../../../assets/splash_bg.png")}>
    //             <Text style={{ backgroundColor: '#0004', textAlign: 'center', color: '#fff', fontSize: 24 }}>test</Text>
    //         </View>
    //     </View>
    // }

    renderItem = data =>

        <TouchableOpacity
            style={{ height: 90, width: '30%', backgroundColor: '#FFFFFF', margin: '1.5%', justifyContent: 'center' }} onPress={this.goToServiceList.bind(this)}>

            <Image
                source={{ uri: data.item.icon_image }}
                style={{ width: 30, height: 30, alignSelf: 'center', margin: 5 }} />

            <Text style={{ color: "#000000", fontSize: 12, alignSelf: 'center', textAlign: 'center' }}>  {data.item.name}  </Text>

            {/* <Image
        source={data.item.isSelect ? require("../../../../assets/splash_bg.png") : ''}
        style={{ width: 30, height: 30, margin: 5 , alignSelf:'flex-end'}} /> */}

        </TouchableOpacity>


    render() {

        // let splashImg = require("../../../assets/splash_bg.png");

        return (
            <SafeAreaView style={styles.wrapper}>
                <Text style={{ height: 30, alignSelf: 'flex-start', marginLeft: '5%', marginRight: '5%', color: '#000000', marginTop: 10 }}>Maintenance</Text>
                {/* {this.state.loading ?

                    <ActivityIndicator
                        animating={this.state.loading}
                        color='#FF0000'
                        size="large"
                        style={styles.activityIndicator} />
                    :
                    <View>
                        <GridView dataSource={this.state.dataSource}
                            spacing={8}
                            style={{ padding: 16 }}
                            renderCell={this._renderCell.bind(this)} />
                    </View>} */}

                {this.state.loading ?

                    <ActivityIndicator
                        animating={this.state.loading}
                        color='#FF0000'
                        size="large"
                        style={styles.activityIndicator} />
                    :
                    <View style={{ marginLeft: '5%', marginRight: '5%', width: '90%', justifyContent:'center' }}>
                        <FlatList
                            numColumns={3}
                            data={this.state.dataSource}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.id.toString()}
                            extraData={this.state}
                        />
                    </View>}
            </SafeAreaView>
        )
    }

}

export default DriverHomeTab;