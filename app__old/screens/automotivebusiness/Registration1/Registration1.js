import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, KeyboardAvoidingView, Picker } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Icon, Item, Input, Label, Button, Left, Body, Right, Title } from 'native-base';
import Constants from '../../../config/constant'
import Toast, { DURATION } from 'react-native-easy-toast';

class Registration1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      languageList: [],
      language: '',
      loading: true,
      ownBusiness:'',
      showServices:false,
      selectedData:[],
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
    let that = this;
    try {
      let response = await fetch(
        Constants.BASE_URL + 'languages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // this.setState({ loading: false })
      let responseJson = await response.json();
      console.log("responseis*****" + JSON.stringify(responseJson) + "******" + response.status);
      if (response.status == 200) {
          this.setState({ languageList: responseJson['data'] }, () => {
            that.getServicesApi();
          })
      }
      // this.setLanguagePicker(response.status, responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    // this.fetchData();
  }

  // getServicesApi() {
  //   // fetch("https://jsonplaceholder.typicode.com/photos")
  //   fetch(Constants.BASE_URL+'services')
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       responseJson = responseJson['data'].map(item => {
  //         console.log("response is********", item);
  //         item.isSelect = false;
  //         item.selectedClass = styles.list;
  //         return item;
  //       }); this.setState({
  //         loading: false,
  //         dataSource: responseJson['data'],
  //       });
  //     }).catch(error => {
  //       this.setState({ loading: false });
  //     });
  // }


  async getServicesApi(){
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

  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
      styles.selected : styles.list;
    // const index = this.state.dataSource.findIndex(
    //   item => data.item.id === item.id
    // );
    // this.state.dataSource[index] = data.item;
    
    data.item.isSelect ? this.state.selectedData.push(data.item.id) : this.state.selectedData.pop(data.item.id)
    this.setState({dataSource: this.state.dataSource, selectedData:this.state.selectedData});
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  renderItem = data =>
  
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}>

      <Image
        source={{ uri: data.item.icon_image }}
        style={{ width: 30, height: 30, margin: 5 }} />

      <Text style={styles.lightText}>  {data.item.name}  </Text>

      <Image
        source={data.item.isSelect ? require("../../../../assets/7.png") : null}
        style={{ width: 30, height: 30, margin: 5 , alignSelf:'flex-end'}} />

    </TouchableOpacity>

  getSevicesList(){
    // this.state.showServices = !this.state.showServices;
    // console.log("showservices****", this.state.showServices);
    this.setState({showServices: !this.state.showServices})
  }  

  goToBusinessRegister(){
    // this.props.navigation.navigate('UploadDealForm');       // to comment..
    // return;
    //this.props.navigation.navigate('Registration2',  {language : this.state.language, selectedData:this.state.selectedData, ownBusiness: this.state.ownBusiness});

    if (this.state.language == '' || this.state.language == null || this.state.language == undefined) {
        this.refs.toast.show('Please select a language.', DURATION.LENGTH_SHORT);
        return;
    }
    else{
      if(this.state.selectedData.length == 0 || this.state.selectedData == null){
        if(this.state.ownBusiness == '' || this.state.ownBusiness == null){
            this.refs.toast.show('Please enter your business.', DURATION.LENGTH_SHORT);
            return;
        }
      }
      this.props.navigation.navigate('Registration2',  {language : this.state.language, selectedData:this.state.selectedData, ownBusiness: this.state.ownBusiness});
    }
    
  }   

  goback(){
    this.props.navigation.navigate('SelectProfession')
  }

  render() {
    // const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;if (this.state.loading) {return (
    // <View style={styles.loader}>
    //  <ActivityIndicator size="large" color="purple" />
    // </View>
    // );
    // }
    
    let splashImg = require("../../../../assets/5.png");

    let languageList = this.state.languageList.map((list, index) => {
      return (
        <Picker.Item label={list.title} value={list.id} key={index} style={{  }} />
      );
    });
    let logoImg = require("../../../../assets/4.png");

    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* <View style={{ width: '100%', height: 45, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
          <Text style={styles.headline}>Business Registration</Text>
        </View> */}
        <Header style={{backgroundColor:'white'}}>
          <Left>
            <Button transparent onPress={() => this.goback()}>
            <Image style={{width:30, height:30}} source={logoImg}></Image>
            </Button>
          </Left>
          <Body>
            <Title style={{  color:'#333', paddingLeft:14 }}>Auto Business</Title>
          </Body>
        </Header>

        {/* <Text style={styles.title}>Hello This is test</Text> */}

        {this.state.loading ?

          <ActivityIndicator
            animating={this.state.loading}
            color='#FF0000'
            size="large"
            style={styles.activityIndicator} />
          :
          <View>

            <View style={{ width: '90%', marginLeft: '5%',backgroundColor:'white', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 45, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                <Picker.Item value='' label='Select Language' style={{  }} />
                {languageList}
              </Picker>
            </View>

            <View style={{ width: '90%', height:45, marginLeft: '5%', marginRight: '5%', marginTop: 10, borderColor: '#000000', borderRadius: 1, borderWidth: 1, backgroundColor:'white'}}>
              <TouchableOpacity style={{ width: '100%', height:45, flexDirection: 'row'}} onPress={this.getSevicesList.bind(this)}>
                <Text style={{ flex:1.5, alignSelf:'center', color: '#FFFFFF', fontSize: 12, marginLeft: 10, marginRight: 10, color:'#000000' }}>Automotive Business</Text>
                <Image source={splashImg} style={{ width: 1, height: 8, alignSelf: 'center', flex:0.15, marginRight:10 }}></Image>
              </TouchableOpacity>
            </View>


            {/* <View style={{ width: '100%', height: 300, marginTop:1 }}>
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}
                extraData={this.state}
              />
            </View> */}

            {this.state.showServices ? <View style={{ width: '100%', height: 300, marginTop:1 }}>
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}
                extraData={this.state}
              />
            </View> : null}


            {/* <View style={styles.numberBox}>
   <Text style={styles.number}>{itemNumber}</Text>
   </View> */}
            {/* <TouchableOpacity style={styles.icon}>
     <View>
       <Icon
         raised
         name="shopping-cart"
         type="font-awesome"
         color="#e3e3e3" 
         size={30} 
         onPress={() => this.goToStore()}
         containerStyle={{ backgroundColor: "#FA7B5F" }}
       />
     </View>
  </TouchableOpacity> */}

            <Text style={{ height: 45, textAlign: 'center', marginTop: 10, color: '#000000', fontSize: 12, marginLeft: 10, marginRight: 10 }}>If the above required service is not available then enter your own business below</Text>

            {/* <View style={styles.viewLabel1}>
    <Item floatingLabel style={styles.inputStyle}>
        <Label style={styles.labelInput}>Enter your own</Label>
        <Input style={styles.input}/>
    </Item>
  </View> */}

            <Item regular style={styles.viewLabel1}>
              <Input style={styles.input} placeholder='Enter your own' onChangeText={(text) => this.setState({ ownBusiness: text })}/>
            </Item>

            <Button block style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 20, backgroundColor:'#f5900e' }} onPress={this.goToBusinessRegister.bind(this)}>
            <Text style={{ color: '#FFFFFF', }}>Continue</Text>
          </Button>

          </View>}

          <Toast ref="toast" />

      </KeyboardAvoidingView>
    );
    // render(){

    //     let splashImg = require("../../../assets/splash_bg.png");

    //     return(
    //         <SafeAreaView style={styles.wrapper}>
    //             <Image source={splashImg}></Image>
    //         </SafeAreaView>
    //     )
  }

}

export default Registration1;