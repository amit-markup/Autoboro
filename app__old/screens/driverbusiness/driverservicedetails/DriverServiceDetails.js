import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';

class DriverServiceDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

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


    render() {

        let splashImg = require("../../../../assets/sample1.jpg");

        return (
            <SafeAreaView style={styles.wrapper}>
                {/* <Image source={splashImg}></Image> */}

                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{  }}>Service Details</Title>
                    </Body>
                </Header>

                <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', height: 180, backgroundColor: '#FFFFFF' }}>
                    <Image style={{width:'100%', height:120}} source={splashImg}></Image>
                </View>
            </SafeAreaView>
        )
    }

}

export default DriverServiceDetails;