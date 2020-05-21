import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';

class UploadDealForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dealImg: '',
            dealName: '',
            dealPrice: '',
            dealOffer: '',
            dealLocation: '',
            dealDescription: '',
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

    takePicture() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //   const source = { uri: response.uri };
                const source = response.uri;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("imageis******", source);
                this.setState({ dealImg: source });

            }
        });
    }

    submitDeal(){
        
    }


    render() {

        let splashImg = require("../../../../assets/splash_bg.png");

        return (
            <SafeAreaView style={styles.wrapper}>
                {/* <Image source={splashImg}></Image> */}
                {/* <Text>Upload form</Text> */}

                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{  }}>Business Registration</Title>
                    </Body>
                </Header>

                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>

                    <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 270, width: '100%', backgroundColor: '#FF0000' }}>
                        <View >
                            <Image source={this.state.dealImg != '' ? { uri: this.state.dealImg } : splashImg} style={{ height: 180, width: '80%', alignSelf: 'center', marginTop: 30, marginBottom: 30 }}></Image>
                            <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', alignSelf: 'center', marginTop: 195 }} onPress={this.takePicture.bind(this)}>
                                <Image source={splashImg} style={{ height: 30, width: 30 }}></Image>
                            </TouchableOpacity>
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center',  }}>Upload deal picture</Text>
                        </View>
                    </LinearGradient>

                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Deal Name' onChangeText={(text) => this.setState({ dealName: text })} />
                    </Item>

                    <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 10, flexDirection: 'row' }}>

                        <Item regular style={styles.viewLabel2}>
                            <Input style={styles.input} placeholder='Price' onChangeText={(text) => this.setState({ dealPrice: text })} />
                        </Item>

                        <Item regular style={styles.viewLabel3}>
                            <Input style={styles.input} placeholder='Deal Offer' onChangeText={(text) => this.setState({ dealOffer: text })} />
                        </Item>

                    </View>

                    <Item regular style={styles.viewLabel1}>
                        <Input style={styles.input} placeholder='Location' onChangeText={(text) => this.setState({ dealLocation: text })} />
                    </Item>

                    <Item regular style={styles.viewLabel4}>
                        <Input style={styles.input} placeholder='Description' onChangeText={(text) => this.setState({ dealDescription: text })} />
                    </Item>

                    <Button block style={{width:'90%', marginLeft:'5%', marginRight:'5%', marginTop:15, backgroundColor:'#de1f27'}} onPress={this.submitDeal.bind(this)}>
                        <Text style={{color:'#FFFFFF', }}>SUBMIT</Text>
                    </Button>


                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default UploadDealForm;