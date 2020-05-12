import React from 'react';
import { View, Image, Text, SectionList, Dimensions, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import { Header, Button } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
let deviceWidth = Dimensions.get('window').width
class DriverHomeTab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: true,
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?tree",
            ]
        }

        this.getServicesApi();
    }

    async getServicesApi() {
        try {
            let response = await fetch(
                Constants.BASE_URL + 'getServiceList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****", responseJson);
            if (responseJson.status == "Success") {
                this.setState({ dataSource: responseJson['data']['List'] });
            }
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    goToServiceList() {
        this.props.navigation.navigate('DriverServicesList');
    }
    renderItem = ({item}) => {
        console.log(item)
        return (
        <TouchableOpacity style={{ height: 90, width: '30%', backgroundColor: '#FFFFFF', margin: '1.5%', justifyContent: 'center' }} onPress={this.goToServiceList.bind(this)}>
            <Image
                source={{ uri: "http://autoboro.markupdesigns.org/"+ item.icon_image }}
                style={{ width: 30, height: 30, alignSelf: 'center', margin: 5 }} />
            <Text style={{ color: "#000000", fontSize: 12, alignSelf: 'center', textAlign: 'center' }}>  {item.name}  </Text>
        </TouchableOpacity>
        )}
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
                    <ScrollView>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <SliderBox
                                images={this.state.images}
                                onCurrentImagePressed={index =>
                                    console.warn(`image ${index} pressed`)
                                }
                                ImageComponentStyle={{ borderRadius: 5, width: '88%' }}
                            />
                            <Text style={{alignSelf:'flex-end', paddingRight:30}}>E-Advertisement</Text>
                        </View>
                        <View style={{ padding: 15, marginBottom:30 }}>
                            <Text style={{ alignSelf: 'flex-start', color: '#000000', marginTop: 5, marginLeft: 4 }}>Maintenance</Text>
                            {/* <FlatList
                                numColumns={3}
                                data={this.state.dataSource}
                                keyExtractor = {(item) => {
                                    return item.id;
                                  }}
                                renderItem={this.renderItem}
                            /> */}
                             <SectionList
                                sections={this.state.dataSource}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => this.renderItem(item)}
                                renderSectionHeader={({ section: { name } }) => (
                                <Text style={styles.header}>{name}</Text>
                                )}
                            />
                        </View>
                    </ScrollView>}
            </View>
        )
    }

}

export default DriverHomeTab;