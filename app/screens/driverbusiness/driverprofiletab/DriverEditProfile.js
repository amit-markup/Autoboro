import React from 'react';
import { View, Image, Text, Picker, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from './style';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container,  Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePicker from 'react-native-image-picker';
import { Header, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class DriverRegistration1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            datePicker: false,
            date: 'Date of birth',
            loading: true,
            languageList: [],
            language: '',
            firstName: '',
            lastName: '',
            profileImage: '',
            email: '',
            password: '',
            phoneNo: '',
            carBrandList: [],
            carBrand: '',
            carModelList: [],
            carModel: '',
            loading: true,
            registrationNo: '',
            VINno: '',
            Latitude: '123654',
            Longitude: '123654',
            currentLongitude: '',
            currentLatitude: '',
            loadingRegister: false,
        }

        this.getCarBrandsApi();
        //this.getLanguageApi();
    }


    async componentDidMount() {
        this.getUser()
        this.getLanguageApi();
    }

    async getUser() {
        var profile = JSON.parse(await AsyncStorage.getItem('profile'))
        let Avatar = "http://autoboro.markupdesigns.org/" + profile['Avatar']
        console.log("profile: ", profile)
    
        this.setState({
            firstName: profile['FirstName'],
            lastName: profile['LastName'],
            profileImage: Avatar,
            email: profile['Email'],
            phone: profile['PhoneNumber'],
            date: profile['DOB'],
            registrationNo: profile['CarRegistrationNumber'],
            VINno: profile['VinNumber'],
            carModel: profile['CarModel'],
            carBrand: profile['CarMake'],
            language: profile['LanguageID'],
        })
        console.log('imageeee', this.state.phone)
    }

    takePicture() {
        const options = {
            title: 'Select Image',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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

                this.setState({ profileImage: source });
            }
        });
    }

    async getLanguageApi() {
        // this.setState({loading:true})
        try {
            let response = await fetch(
                Constants.BASE_URL + 'languageList', {
                method: 'GET',
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            if (responseJson.status == "Success") {
                this.setState({ languageList: responseJson.data.language })
            }
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    // setLanguagePicker(statusCode, responseJson) {
    //   if (statusCode == 200) {
    //     this.setState({ languageList: responseJson['data'] }, () => {
    //       console.log("listis******" + this.state.languageList);
    //     })
    //   }
    // }

    showDatePicker() {
        // this.setState({date: new Date()}, () => {
        //   this.setState({datePicker:true})
        // })
        this.setState({ datePicker: true })
    }

    setDate = (event, date) => {
        var finalDate = moment(date).format("YYYY-MM-DD");
        console.log('dateis*****', event + "*****" + date + "*********" + finalDate);
        // date = date || this.state.date;
        this.setState({
            // show: Platform.OS === 'ios' ? true : false,
            // date,
            date: finalDate,
            datePicker: false,
        });
    }

    validateEmail(email) {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(String(email).toLowerCase());
    }

    async getCarBrandsApi() {
        // this.setState({loading:true})
        try {
            let response = await fetch(
                Constants.BASE_URL + 'CarMakeModelList', {
                method: 'GET',
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            if (responseJson.status == "Success") {
                this.setState({ carBrandList: responseJson['data']["List"] })
            }
            console.log('carBrandList', this.state.carBrandList)
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
    }

    getCarBrandsValue(itemValue) {
        this.setState({ carBrand: itemValue }, () => {
            if (this.state.carBrand == '' || this.state.carBrand == null || this.state.carBrand == undefined) {
                this.setState({ carModelList: [] });
                return;
            }
            this.getCarModelsApi();
        })
    }

    async getCarModelsApi() {
        // this.setState({loading:true})
        // this.setState({ carBrand: itemValue }, () => {
        console.log("carbrandis*******" + this.state.carBrand);
        this.setState({ loading: true })
        try {
            let response = await fetch(
                Constants.BASE_URL + 'CarMakeModelList?id=' + this.state.carBrand, {
                method: 'GET',
            });
            this.setState({ loading: false })
            let responseJson = await response.json();
            console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
            if (responseJson.status == "Success") {
                this.setState({ carModelList: responseJson['data']['List'] })
            }
            return responseJson;
        } catch (error) {
            console.error(error);
            this.setState({ loading: false })
        }
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
        console.log(Token, ProfileId)
        let formdata = new FormData();
        console.log('formdata', formdata)
        formdata.append("id", ProfileId);
        formdata.append("LanguageID", this.state.language)
        formdata.append("FirstName", this.state.firstName)
        formdata.append("LastName", this.state.lastName)
        formdata.append("Email", this.state.email)
        formdata.append("PhoneNumber", this.state.phone)
        formdata.append("DOB", this.state.date)
        formdata.append("CarRegistrationNumber", this.state.registrationNo)
        formdata.append("VinNumber", this.state.VINno)
        formdata.append("CarMake", this.state.carBrand)
        formdata.append("carModel", this.state.carModel)
        formdata.append("Avatar", profileImage)
        try {
            let response = await fetch(
                Constants.BASE_URL+'driverEditProfile',{
                method:'POST',
                headers: {
                    'Apiauthorization': Token,
                },
                body: formdata,
            });
            this.setState({loading:false})
            let responseJson = await response.json();
            console.log("responseis*****"+JSON.stringify(responseJson)+"******"+response.status);
            if (responseJson.status == "Success") {
                console.log("in success*********");
                this.success(responseJson['data'])
              }
              else {
                this.refs.toast.show(JSON.stringify(responseJson['msg']), DURATION.LENGTH_SHORT);
              }
            return responseJson;
          } catch (error) {
            console.error(error);
            this.setState({loading:false})
          }

    }

    async success(DriverProfile){
    console.log('DriverProfileDriverProfile', DriverProfile)
    await AsyncStorage.setItem("DriverProfile", JSON.stringify(DriverProfile));
    await AsyncStorage.setItem("id", DriverProfile.id);
    this.props.navigation.navigate('DriverProfileTab', { 'DriverProfile': DriverProfile })
  }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {

        let splashImg = require("../../../../assets/splash_bg.png");
        let date = require("../../../../assets/images/calender-black.png");
        let upload = require("../../../../assets/images/upload-image.png");
        let datePickerHolder = null
        let car = require("../../../../assets/car.png");
        let model = require("../../../../assets/model.png");
        let register = require("../../../../assets/register-no.png");
        let years = require("../../../../assets/years.png");
        let vins = require("../../../../assets/vin-no.png");
        let vin = require("../../../../assets/vin-info.png");
        let cross = require("../../../../assets/cross-popup.png");
        let congratulations = require("../../../../assets/congratulations.png");
        let driverImage = {
            uri: this.state.driverImage,
            type: 'image/jpeg',
            name: 'driverImage.jpg',
        };
        let carBrandList = this.state.carBrandList.map((list, index) => {
            return (
                <Picker.Item label={list.title} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
            );
        });

        let carModelList = this.state.carModelList.map((list, index) => {
            return (
                <Picker.Item label={list.title} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
            );
        });

        let languageList = this.state.languageList.map((list, index) => {
            // console.log('languageList', list)
            return (
                <Picker.Item label={list.name} value={list.id} key={index} style={{ fontFamily: 'Roboto_Regular' }} />
            );
        });

        if (this.state.datePicker) {
            datePickerHolder = (
                <DateTimePicker
                    // date={this.state.date}
                    // onDateChange={date => this.setState({ date })}>
                    // mode={}
                    maximumDate={new Date()}
                    value={new Date()}
                    display="default"
                    onChange={this.setDate}>
                </DateTimePicker>
            )
        }

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
                <ScrollView style={{ marginBottom: 40 }}>

                    <LinearGradient colors={['#d55459', '#a32227', '#96151a']} style={{ width: '100%', height: 180 }}>
                        <View style={{ width: '100%', height: 180, marginTop:10 }}>
                            <Avatar
                                size={110}
                                onEditPress={this.takePicture.bind(this)}
                                overlayContainerStyle={{ backgroundColor: '#FFF' }}
                                rounded
                                icon={{ name: 'plus', type: 'font-awesome', color: 'gray', size: 20 }}
                                containerStyle={{ borderColor: 'gray', borderWidth: 0, alignSelf: 'center' }}
                                source={this.state.profileImage != '' ? { uri: this.state.profileImage } : splashImg}
                                imageProps={{ resizeMode: 'cover' }}
                                showEditButton
                            />
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto_Regular' }}>{this.state.firstName} {this.state.lastName}</Text>
                        </View>
                    </LinearGradient>

                    {this.state.loading ?

                        <ActivityIndicator
                            animating={this.state.loading}
                            color='#FF0000'
                            size="large"
                            style={styles.activityIndicator} />
                        :
                        <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
                            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: '#ffffff', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
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

                            <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 45, marginTop: 15, flexDirection: 'row' }}>

                                <Item regular style={styles.viewLabel2}>
                                    <Input style={styles.input} placeholder='First name' value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })} />
                                </Item>

                                <Item regular style={styles.viewLabel3}>
                                    <Input style={styles.input} value={this.state.lastName} placeholder='Last name' onChangeText={(text) => this.setState({ lastName: text })} />
                                </Item>

                            </View>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} value={this.state.email} placeholder='Email' onChangeText={(text) => this.setState({ email: text })} />
                            </Item>

                            <Item regular style={styles.viewLabel1}>
                                <Input style={styles.input} value={this.state.phone} placeholder='Phone number' keyboardType='numeric' maxLength={15} onChangeText={(text) => this.setState({ phone: text })} />
                            </Item>

                            <TouchableOpacity style={styles.viewLabel4} onPress={this.showDatePicker.bind(this)}>
                                <Text style={{ color: '#000000', paddingLeft: 10, flex: 3, alignSelf: 'center', fontFamily: 'Roboto_Regular' }}>{this.state.date}</Text>
                                <Image source={date} style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 10 }}></Image>
                            </TouchableOpacity>

                            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
                                <Image source={car} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
                                <Picker
                                    selectedValue={this.state.carBrand}
                                    style={{ height: 45, width: '90%', marginLeft: 36 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        // this.setState({ carBrand: itemValue })}
                                        this.getCarBrandsValue(itemValue)}>
                                    {/* <Picker.Item label="" value="java" />
            <Picker.Item label="JavaScript" value="js" /> */}
                                    <Picker.Item value='' label='Select Car' style={{ fontFamily: 'Roboto_Regular', }} />
                                    {carBrandList}
                                </Picker>
                            </View>
                            <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginRight: '5%', marginTop: 15, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
                                <Image source={model} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
                                <Picker
                                    selectedValue={this.state.carModel}
                                    style={{ height: 45, width: '90%', marginLeft: 36 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ carModel: itemValue })
                                    }>
                                    {/* <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" /> */}
                                    <Picker.Item value='' label='Select Model' style={{ fontFamily: 'Roboto_Regular' }} />
                                    {carModelList}
                                </Picker>
                            </View>

                            <Item regular style={styles.viewLabel1}>
                            <Image source={register} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
                            <Input style={styles.inputs} value={this.state.registrationNo} placeholder='Registration no' onChangeText={(text) => this.setState({ registrationNo: text })} />
                            </Item>

                            <Item regular style={styles.viewLabel1}>
                                <Image source={vins} style={{ width: 25, position: 'absolute', marginLeft: 10, marginTop: 10, height: 25, marginRight: 0 }}></Image>
                                <Input style={{ color: '#000000', fontWeight: 'bold', fontSize: '15', paddingLeft: 45, flex: 3, textAlign: 'left', fontSize: 12, fontFamily: 'Roboto_Regular' }} value={this.state.VINno} placeholder='VIN Number' onChangeText={(text) => this.setState({ VINno: text })} />
                                <Image source={vin} style={{ width: 25, height: 25, marginRight: 10 }}></Image>
                            </Item>

                            <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 15, backgroundColor: '#f5900e', marginBottom: 10 }} onPress={()=> this.saveProfile()}>
                            {/* {this.state.loadingRegister ?
                                <ActivityIndicator
                                animating={this.state.loadingRegister}
                                color='#FFFFFF'
                                size="large"
                                style={styles.activityIndicator} />
                                : */}
                                <Text style={{ color: '#FFFFFF' }}>Save</Text>
                            </Button>

                            {datePickerHolder}

                        </ScrollView>}

                    <Toast ref="toast" />
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default DriverRegistration1;