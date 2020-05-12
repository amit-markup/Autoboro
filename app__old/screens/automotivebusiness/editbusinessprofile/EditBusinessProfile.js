import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Picker, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Title, Icon, Card } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../../config/constant';
import ImagePicker from 'react-native-image-picker';

class EditBusinessProfile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            phone: '',
            address: '',
            language: '',
            facebook: '',
            twitter: '',
            instagram: '',
            website: '',
            languageList: [],
            loading: true,
            profileImg:'',
        }

        // this.navigateToIntro();
        this.getLanguageApi();
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

    async getLanguageApi() {
        // this.setState({loading:true})
        // let that = this;
        try {
            let response = await fetch(
                Constants.BASE_URL + 'languages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            if (response.status == 200) {
                this.setState({ languageList: responseJson['data'] });
            }
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

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
            // const source = { uri: response.uri };
            const source = response.uri;
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            console.log("imageis******", source);
            this.setState({ profileImg: source });
    
          }
        });
      }

    saveProfile(){
        console.log("languageis*****", this.state.language);
    }
    goBack(){
        this.props.navigation.goBack();
      }

    render() {

        let splashImg = require("../../../../assets/splash_bg.png");
        let facebook = require("../../../../assets/facebook.png");
        let insta = require("../../../../assets/insta.png");
        let twitter = require("../../../../assets/twitter.png");
        let languageList = this.state.languageList.map((list, index) => {
            return (
                <Picker.Item label={list.title} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
            );
        });

        return (
            <SafeAreaView style={styles.wrapper}>
                <Header style={{ backgroundColor: '#d55459' }}>
                    <Left>
                        <Button transparent onPress={this.goBack.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{marginLeft:50}}>
                        <Title style={{ fontFamily: 'Roboto_Regular' }}>Edit Profile</Title>
                    </Body>
                </Header>

                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>

                    <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 180, width: '100%' }}>
                        <View >
                            <Image source={this.state.profileImg != '' ? {uri:this.state.profileImg} : splashImg} style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', marginTop: 20 }}></Image>
                            <TouchableOpacity style={{ height: 30, width: 30, position: 'absolute', marginTop: 100, marginLeft: 240 }} onPress={this.takePicture.bind(this)}>
                                <Image source={splashImg} style={{ height: 30, width: 30 }}></Image>
                            </TouchableOpacity>
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontFamily: 'Roboto_Regular', marginTop: 10 }}>Richard Grant</Text>
                        </View>
                    </LinearGradient>

                    {this.state.loading ?

                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#FF0000'
                            size="large"
                            style={styles.activityIndicator} />
                        :
                        <View>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Email</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({ email: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Phone</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Phone' keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ phone: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Address</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Address' onChangeText={(text) => this.setState({ address: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Language</Text>

                            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, backgroundColor: '#FFFFFF', }}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 45, width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item value='' label='Select Language' style={{ fontFamily: 'Roboto_Regular' }} />
                                    {languageList}
                                </Picker>
                            </View>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Social Media Accounts</Text>

                            <View style={styles.viewLabel2}>
                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 30, height: 30, alignSelf: 'center', marginLeft: 10, }} source={facebook}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Input style={styles.input} placeholder='Facebook' onChangeText={(text) => this.setState({ facebook: text })} />
                                    </Item>

                                </View>

                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 30, height: 30, alignSelf: 'center', marginLeft: 10, }} source={twitter}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Input style={styles.input} placeholder='Twitter' onChangeText={(text) => this.setState({ twitter: text })} />
                                    </Item>

                                </View>

                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 30, height: 30, alignSelf: 'center', marginLeft: 10, }} source={insta}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Input style={styles.input} placeholder='Instagram' onChangeText={(text) => this.setState({ instagram: text })} />
                                    </Item>

                                </View>

                            </View>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Website</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Website' onChangeText={(text) => this.setState({ website: text })} />
                            </Item>

                            <Button block style={{width:'90%', marginLeft:'5%', marginRight:'5%', marginTop:15, backgroundColor:'#de1f27'}} onPress={this.saveProfile.bind(this)}>
                                <Text style={{color:'#FFFFFF',}}>SAVE</Text>
                            </Button>

                            <View style={{ width: '100%', height: 75 }}></View>

                        </View>}

                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default EditBusinessProfile;