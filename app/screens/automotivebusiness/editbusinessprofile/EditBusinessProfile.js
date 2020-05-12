import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Linking, Picker, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Content, Form, Item, Input, Label, Button, Left, Body, Title, Card } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../../config/constant';
import ImagePicker from 'react-native-image-picker';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Header, Icon, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class EditBusinessProfile extends React.Component {

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
            profileImage: '',
            firstName: '',
            lastName: '',
            Avatar:''

        }

        
    }

    async componentDidMount() {
        this.getUser()
        this.getLanguageApi();
    }

    async getUser() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'))
        let Avatar = "http://autoboro.markupdesigns.org/"+profile.Avatar
        console.log("Avatar: ", profile)
    
        this.setState({
            firstName: profile['FirstName'],
            lastName: profile['LastName'],
            profileImage: Avatar,
            email: profile['Email'],
            phone: profile['PhoneNumber'],
            address: profile['BusinessAddress'],
            website: profile['BusinessWebsite'],
            language: profile['LanguageID'],
        })
        console.log('imageeee', this.state.profileImage)
    }
    async getLanguageApi() {
        try {
          let response = await fetch(
            Constants.BASE_URL + 'languageList', {
            method: 'GET',
          });
          // this.setState({ loading: false })
          let responseJson = await response.json();
          if (responseJson.status == "Success") {
            this.setState({ languageList: responseJson['data']['language'] })
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
                this.setState({ profileImage: source });
                console.log("ima****", this.state.profileImage);
            }
        });
    }

    validateEmail(email) {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(String(email).toLowerCase());
    }



      async saveProfile() {
          this.setState({ loadingRegister: true });
          let profileImage = {
            uri: this.state.profileImage,
            type: 'image/jpeg',
            name: 'managerImage.jpg',
          };
          var profile = JSON.parse(await AsyncStorage.getItem("profile"));
          console.log('profile', profile)
          var ProfileId = profile.id
          var Token = profile.token
          console.log(Token)
          let formdata = new FormData();
          console.log('formdata', formdata)
          formdata.append("Avatar",profileImage);
          formdata.append("id", ProfileId);
          formdata.append("FirstName", this.state.firstName)
          formdata.append("LastName", this.state.lastName)
          formdata.append("Email", this.state.email)
          formdata.append("PhoneNumber", this.state.phone)
          formdata.append("BusinessWebsite", this.state.website)
          formdata.append("BusinessAddress", this.state.address)
          formdata.append("LanguageID", this.state.language)
          await fetch('http://autoboro.markupdesigns.org/api/businessEditProfile',
            {
                method: 'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status === 'Success' && responseJson['data'][0]['id']) {
                    this.success(responseJson['data'][0]);
                }
            }).catch((error) => {
                console.error(error);
            })

      }

      async success(BusinessProfile){
          console.log('BusinessProfileBusinessProfileBusinessProfile', BusinessProfile)
        await AsyncStorage.setItem("BusinessProfile", JSON.stringify(BusinessProfile));
        await AsyncStorage.setItem("userid", BusinessProfile.id);
		setTimeout(() => {
			this.props.navigation.navigate('Profile', { 'BusinessProfile': BusinessProfile })
		}, 1000)
      }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let languageList = this.state.languageList.map((list, index) => {
            return (
                <Picker.Item label={list.name} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
            );
        });
        return (
            <SafeAreaView style={styles.wrapper}>
                <Header
                    leftComponent={<Button transparent onPress={this.goBack.bind(this)}><Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 25, height: 25, marginBottom: 25 }} /></Button>}
                    centerComponent={{ text: 'Edit Profile', style: { color: '#fff', marginBottom: 25, fontSize: 16 } }}
                    containerStyle={{
                        backgroundColor: '#d55459',
                        justifyContent: 'space-around',
                        height: 45,
                    }}
                />

                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
                    <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ height: 180, width: '100%' }}>
                        <View style={{ marginTop: 5 }}>
                            <Avatar
                                size={110}
                                onEditPress={this.takePicture.bind(this)}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                                containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center', marginTop:10 }}
                                source={{uri:this.state.profileImage}}
                                imageProps={{ resizeMode: 'cover' }}
                                showEditButton
                            />
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontFamily: 'Roboto_Regular', marginTop: 10 }}>{this.state.firstName} {this.state.lastName}</Text>
                        </View>
                    </LinearGradient>
                    {/* {this.state.loading ?

                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#FF0000'
                            size="large"
                            style={styles.activityIndicator} />
                        : */}
                        <View>

                        <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 75, marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ marginRight: '5%', marginTop: 10, color: '#000000', position:'absolute' }}>First Name</Text>
                        <Text style={{ marginLeft: '54%', marginTop: 10, color: '#000000', position:'absolute' }}>Last Name</Text>
                        <Item regular style={[styles.viewLabel111, {width:"48%"}]}>
                            <Input style={styles.input} placeholder='First name' value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })} />
                        </Item>
                        <Item regular style={[styles.viewLabel111, {width:"46%"}]}>
                            <Input style={styles.input} value={this.state.lastName} placeholder='Last name' onChangeText={(text) => this.setState({ lastName: text })} />
                        </Item>
                        </View>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Email</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Phone</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Phone' value={this.state.phone} keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ phone: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Address</Text>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Address' value={this.state.address} onChangeText={(text) => this.setState({ address: text })} />
                            </Item>

                            

                            {/* <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Social Media Accounts</Text>

                            <View style={styles.viewLabel2}>
                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', marginLeft: 10, }} source={facebook}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Text style={{ color: 'blue', marginLeft: 10 }} onPress={() => Linking.openURL('https://www.facebook.com/')}>https://www.facebook.com/</Text>
                                    </Item>

                                </View>

                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', marginLeft: 10, }} source={twitter}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Text style={{ color: 'blue', marginLeft: 10 }} onPress={() => Linking.openURL('https://twitter.com/login?lang=en')}>https://twitter.com/</Text>
                                    </Item>
                                </View>
                                <View style={{ width: '100%', height: 45, flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', marginLeft: 10, }} source={insta}></Image>
                                    <Item regular style={{ color: '#000000', alignSelf: 'center', marginLeft: 10, flex: 1, height: 45, borderColor: '#FFFFFF' }}>
                                        <Text style={{ color: 'blue', marginLeft: 10 }} onPress={() => Linking.openURL('https://www.instagram.com/')}>https://www.instagram.com/</Text>
                                    </Item>
                                </View>
                            </View> */}

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Website</Text>
                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} placeholder='Website' value={this.state.website} onChangeText={(text) => this.setState({ website: text })} />
                            </Item>

                            <Text style={{ marginLeft: '5%', marginRight: '5%', marginTop: 10, color: '#000000' }}>Language</Text>

                            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, backgroundColor: '#FFFFFF', }}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 45, width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item value={this.state.language} label='Select Language' style={{ fontFamily: 'Roboto_Regular' }} />
                                    {languageList}
                                </Picker>
                            </View>
                            <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, backgroundColor: '#de1f27' }} onPress={()=> this.saveProfile()} >
                                <Text style={{ color: '#FFFFFF', }}>SAVE</Text>
                            </Button>
                            <View style={{ width: '100%', height: 75 }}></View>
                        </View>
                        {/* } */}

                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default EditBusinessProfile;