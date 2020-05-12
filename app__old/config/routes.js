import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import React from 'react';
import Splash from '../screens/splash/Splash';
import Intro from '../screens/intro/Intro';
import Login from '../screens/login/Login';
import SelectProfession from '../screens/selectprofession/SelectProfession';
import ForgotPassword from '../screens/forgotpassword/ForgotPassword';
import ChangePassword from '../screens/changepassword/ChangePassword';
import Registration1 from '../screens/automotivebusiness/Registration1/Registration1';
import Registration2 from '../screens/automotivebusiness/Registration2/Registration2';
// import AutomotiveHome from '../screens/automotivebusiness/automotivehome/AutomotiveHome';
import DriverRegistration1 from '../screens/driverbusiness/driverregistration1/DriverRegistration1';
import DriverRegistration2 from '../screens/driverbusiness/driverregistration2/DriverRegistration2';
// import DriverHome from '../screens/driverbusiness/driverhome/DriverHome';
import EditBusinessProfile from '../screens/automotivebusiness/editbusinessprofile/EditBusinessProfile';
import ProfileTab from '../screens/automotivebusiness/profiletab/ProfileTab';
import GalleryTab from '../screens/automotivebusiness/gallerytab/GalleryTab';
import GalleryTabDetails from '../screens/automotivebusiness/gallerytab/GalleryTabDetails';
import Deals from '../screens/automotivebusiness/Deals/index';
import CreateDeals from '../screens/automotivebusiness/Deals/CreateDeals';
import UploadDeals from '../screens/automotivebusiness/Deals/UploadDeals';
import ManageDeal from '../screens/automotivebusiness/Deals/ManageDeal';
import StatisticsTab from '../screens/automotivebusiness/statisticstab/StatisticsTab';
import HiringTab from '../screens/automotivebusiness/hiringtab/HiringTab';
import MagazineTab from '../screens/automotivebusiness/magazinetab/MagazineTab';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DriverDealsTab from '../screens/driverbusiness/driverdealstab/DriverDealsTab';
import DriverFavoritesTab from '../screens/driverbusiness/driverfavoritestab/DriverFavoritesTab';
import DriverHomeTab from '../screens/driverbusiness/driverhometab/DriverHomeTab';
import DriverMagazineTab from '../screens/driverbusiness/drivermagazinetab/DriverMagazineTab'
import DriverProfileTab from '../screens/driverbusiness/driverprofiletab/DriverProfileTab';
import UploadDealForm from '../screens/automotivebusiness/uploaddealform/UploadDealForm';
import DriverServicesList from '../screens/driverbusiness/driverserviceslist/DriverServicesList';
import DriverServiceDetails from '../screens/driverbusiness/driverservicedetails/DriverServiceDetails';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';


const loginStack = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Splash'
        },
    },
    Intro: {
        screen: Intro,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Intro'
        },
    },
    SelectProfession: {
        screen: SelectProfession,
        navigationOptions: {
            header: () => null,
            headerTitle: 'SelectProfession'
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Login'
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ForgotPassword'
        },
    },
    ChangePassword: {        // it can be commented in future..
        screen: ChangePassword,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ChangePassword'
        },
    },
    DriverRegistration1: {
        screen: DriverRegistration1,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverRegistration1'
        },
    },
    DriverRegistration2: {
        screen: DriverRegistration2,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverRegistration2'
        },
    },
    Registration1: {
        screen: Registration1,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Registration1'
        },
    },
    Registration2: {
        screen: Registration2,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Registration2'
        },
    },
    // Deals: {
    //     screen: Deals,
    //     navigationOptions: {
    //         header: () => null,
    //         headerTitle: 'Deals'
    //     },
    // },
    // CreateDeals: {
    //     screen: CreateDeals,
    //     navigationOptions: {
    //         header: () => null,
    //         headerTitle: 'CreateDeals'
    //     },
    // },
    UploadDealForm: {
        screen: UploadDealForm,
        navigationOptions: {
            header: () => null,
            headerTitle: 'UploadDealForm'
        },
    },
},
    {
        initialRouteName: 'Splash',
        transitionConfig: () => fromRight(200),
    }
);


const businessProfileTabStack = createStackNavigator({
    Profile: {
        screen: ProfileTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Profile'
        },
    },

    EditBusinessProfile: {
        screen: EditBusinessProfile,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Splash'
        },
    },
    Deals: {
        screen: Deals,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Deals'
        },
    },
    CreateDeals: {
        screen: CreateDeals,
        navigationOptions: {
            header: () => null,
            headerTitle: 'CreateDeals'
        },
    },
    UploadDeals: {
        screen: UploadDeals,
        navigationOptions: {
            header: () => null,
            headerTitle: 'UploadDeals'
        },
    },
    ManageDeal: {
        screen: ManageDeal,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ManageDeal'
        },
    },

}, {
    initialRouteName: 'Profile',
    transitionConfig: () => fromRight(200),
}
);
businessProfileTabStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'EditBusinessProfile') {
        tabBarVisible = false
    }


    return {
        tabBarVisible,

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        )
    };
};

const gallaryServiceTabStack = createStackNavigator({
    GalleryTab: {
        screen: GalleryTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Service Gallary'
        },
    },
    GalleryTabDetails: {
        screen: GalleryTabDetails,
        navigationOptions: {
            header: () => null,
            headerTitle: 'GalleryTabDetails'
        },
    },
}, {
    initialRouteName: 'GalleryTab',
    transitionConfig: () => fromRight(200),
}
);
businessProfileTabStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'EditBusinessProfile') {
        tabBarVisible = false
    }


    return {
        tabBarVisible,

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        )
    };
};

const driverServiceStack = createStackNavigator({
    Home: {
        screen: DriverHomeTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Home'
        },
    },

    DriverServicesList: {
        screen: DriverServicesList,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverServicesList'
        },
    },

    DriverServiceDetails: {
        screen: DriverServiceDetails,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverServiceDetails'
        },
    },
}, {
    initialRouteName: 'Home',
    transitionConfig: () => fromRight(200),
}
);
driverServiceStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'DriverServicesList') {
        tabBarVisible = false;
    }
    else if (routeName == 'DriverServiceDetails') {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        )
    };
};



// const businessTab = createMaterialBottomTabNavigator({
// Profile: businessProfileTabStack,
// Gallery: {screen: GalleryTab},
// Statistics: {screen: StatisticsTab},
// Hiring: {screen: HiringTab},
// Magazine: {screen: MagazineTab}

// }, {
//     initialRouteName: 'Gallery',
//     animationEnabled: true,
//     swipeEnabled: true,
//     tabBarPosition: "bottom",
//     tabBarOptions: {
//         style: {
//             ...Platform.select({
//                 android: {
//                     backgroundColor: 'white'
//                 }
//             })
//         },
//         activeTintColor: '#e46c0b',
//         inactiveTintColor: '#1c4478',
//         showLabel: true,
//         showIcon: true
//     }
// })
const businessTab = createBottomTabNavigator(
    {
        Profile: businessProfileTabStack,
        Gallery: { screen: gallaryServiceTabStack },
        Statistics: { screen: StatisticsTab },
        Hiring: { screen: HiringTab },
        Magazine: { screen: MagazineTab }
    },
    {
        initialRoutename: 'Profile',
        defaultNavigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                //let iconName;
                if (routeName === 'Profile') {
                    return <Image source={require("../../assets/t1.png")} style={{ width: 28, height: 28 }} />
                } else if (routeName === 'Gallery') {
                    return <Image source={require("../../assets/t2.png")} style={{ width: 28, height: 28 }} />
                }
                else if (routeName === 'Statistics') {
                    return <Image source={require("../../assets/t3.png")} style={{ width: 28, height: 28 }} />
                }
                else if (routeName === 'Hiring') {
                    return <Image source={require("../../assets/t4.png")} style={{ width: 28, height: 28 }} />
                }
                else if (routeName === 'Magazine') {
                    return <Image source={require("../../assets/t5.png")} style={{ width: 28, height: 28 }} />
                }
                //   return <Icon type='font-awesome' name={iconName}  size={20} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'red',
            activeBackgroundColor: 'white',
            inactiveTintColor: 'red',
            style: {
                backgroundColor: 'white',
            },
            labelStyle: {
                fontSize: 12,
                marginBottom: 3,
                color: 'black'
            },
            // tabStyle: {
            //   justifyContent:'space-around'
            // }
        },
    }
);

const driverTab = createMaterialBottomTabNavigator({

    // Home: {
    //     screen: DriverHomeTab
    // },
    Home: driverServiceStack,
    Deals: {
        screen: DriverDealsTab
    },
    Profile: {
        screen: DriverProfileTab
    },
    Favorites: {
        screen: DriverFavoritesTab
    },
    Magazine: {
        screen: DriverMagazineTab
    }

},
    {
        initialRouteName: 'Profile',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#e46c0b',
            inactiveTintColor: '#1c4478',
            showLabel: true,
            showIcon: true
        }
    })


const App = createSwitchNavigator({
    Login: {
        screen: loginStack,
    },
    Business: {
        screen: businessTab,
    },
    Driver: {
        screen: driverTab,
    }


});
const AppContainer = createAppContainer(App);

export default class RoutingScreen extends React.Component {
    render() {
        return <AppContainer />;
    }
}