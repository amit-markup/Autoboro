import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';


class StatisticsTab extends React.Component{

    constructor(props){
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

    
    render(){

        // let splashImg = require("../../../assets/splash_bg.png");
        
        return(
            <SafeAreaView style={styles.wrapper}>
                {/* <Image source={splashImg}></Image> */}
                <Text>Statistics Tab</Text>
            </SafeAreaView>
        )
    }

}

export default StatisticsTab;