// import React from 'react';
// import { View, Image } from 'react-native';
// import styles from './styles';
// import { SafeAreaView, StackActions, NavigationActions,createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import ProfileTab from '../../automotivebusiness/profiletab/ProfileTab';
// import GalleryTab from '../../automotivebusiness/gallerytab/GalleryTab';
// import StatisticsTab from '../../automotivebusiness/statisticstab/StatisticsTab';
// import HiringTab from '../../automotivebusiness/hiringtab/HiringTab';
// import MagazineTab from '../../automotivebusiness/magazinetab/MagazineTab';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default class AutomotiveHome extends React.Component{

//     constructor(props){
//         super(props);
        
//         this.state = {
            
//         }

//         // this.navigateToIntro();
//     }

//     // navigateToIntro(){
//     //     console.log("test", "in this")

//     //     let that = this;
//     //     setTimeout(function(){ that.setIntroStack(); }, 3000);
   
//     // }

//     // setIntroStack(){
//     //     const resetAction = StackActions.reset({
//     //         index: 0,
//     //         actions: [NavigationActions.navigate({ routeName: 'Intro' })],
//     //     });
//     //     this.props.navigation.dispatch(resetAction);
//     // }

    
//     render(){

//         // let splashImg = require("../../../assets/splash_bg.png");
        
//         return(
//             <App/>
            
//         )
            
        
//     }

// }

// const TabNavigator = createMaterialBottomTabNavigator({
//     // Profile: ProfileTab,
//     // Gallery: GalleryTab,
//     // Statistics: StatisticsTab,
//     // Hiring: HiringTab,
//     // Magazine: MagazineTab,
//     Profile: {
//         screen: ProfileTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-home' size={25} color={tintColor} />
//           )
//         })
//       },
//     Gallery: {
//         screen: GalleryTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-list' size={25} color={tintColor} />
//           )
//         })
//       },
//     Statistics: {
//         screen: StatisticsTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-options' size={25} color={tintColor} />
//           )
//         })
//     },
//     Hiring: {
//         screen: HiringTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-options' size={25} color={tintColor} />
//           )
//         })
//     },
//     Magazine: {
//         screen: MagazineTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-options' size={25} color={tintColor} />
//           )
//         })
//     },
// },
// {
//     initialRouteName: 'Gallery',
//     activeTintColor: '#F44336',
// },
// );

// const App = createAppContainer(TabNavigator) ;
