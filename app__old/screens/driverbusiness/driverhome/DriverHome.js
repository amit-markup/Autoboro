// import React from 'react';
// import { View, Image } from 'react-native';
// import styles from './styles';
// import { SafeAreaView, StackActions, NavigationActions, createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import HomeTab from '../../driverbusiness/hometab/HomeTab';
// import DealsTab from '../../driverbusiness/dealstab/DealsTab';
// import ProfileTab from '../../driverbusiness/profiletab/ProfileTab';
// import FavoritesTab from '../../driverbusiness/favoritestab/FavoritesTab';
// import MagazineTab from '../../driverbusiness/magazinetab/MagazineTab';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default class DriverHome extends React.Component{

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
//             // <SafeAreaView style={styles.wrapper}>
//             //     <Image source={splashImg}></Image>
//             // </SafeAreaView>

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
//     Home: {
//         screen: HomeTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-home' size={25} color={tintColor} />
//           )
//         })
//       },
//     Deals: {
//         screen: DealsTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-list' size={25} color={tintColor} />
//           )
//         })
//       },
//     Profile: {
//         screen: ProfileTab,
//         navigationOptions: () => ({
//           tabBarIcon: ({tintColor}) => (
//             <Icon name='ios-options' size={25} color={tintColor} />
//           )
//         })
//     },
//     Favorites: {
//         screen: FavoritesTab,
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
//     initialRouteName: 'Home',
//     activeTintColor: '#F44336',
// },
// );
// const App = createAppContainer(TabNavigator) ;