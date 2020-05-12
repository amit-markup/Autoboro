import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import React from 'react';
import Splash from '../screens/splash/Splash';
import Intro from '../screens/intro/Intro';
import DriverLogin from '../screens/login/DriverLogin';
import BusinessLogin from '../screens/login/BusinessLogin';
import SelectProfession from '../screens/selectprofession/SelectProfession';
import ForgotPassword from '../screens/forgotpassword/ForgotPassword';
import ChangePassword from '../screens/changepassword/ChangePassword';
import ForgotPasswordBussiness from '../screens/forgotpassword/ForgotPasswordBussiness';
import ChangePasswordBusiness from '../screens/changepassword/ChangePasswordBusiness';
import Registration1 from '../screens/automotivebusiness/Registration1/Registration1';
import Registration2 from '../screens/automotivebusiness/Registration2/Registration2';
// import AutomotiveHome from '../screens/automotivebusiness/automotivehome/AutomotiveHome';
import DriverRegistration1 from '../screens/driverbusiness/driverregistration1/DriverRegistration1';
import DriverRegistration2 from '../screens/driverbusiness/driverregistration2/DriverRegistration2';
// import DriverHome from '../screens/driverbusiness/driverhome/DriverHome';
import EditBusinessProfile from '../screens/automotivebusiness/editbusinessprofile/EditBusinessProfile';
import ProfileTab from '../screens/automotivebusiness/profiletab/ProfileTab';
import BusinessReviews from '../screens/automotivebusiness/BusinessReviews/BusinessReviews';
import GalleryTab from '../screens/automotivebusiness/gallerytab/GalleryTab';
import GalleryTabDetails from '../screens/automotivebusiness/gallerytab/GalleryTabDetails';
import Deals from '../screens/automotivebusiness/Deals/index';
import CreateDeals from '../screens/automotivebusiness/Deals/CreateDeals';
import UploadDeals from '../screens/automotivebusiness/Deals/UploadDeals';
import ManageDeal from '../screens/automotivebusiness/Deals/ManageDeal';
import ManageDealEdit from '../screens/automotivebusiness/Deals/ManageDealEdit';
import CreateAudiance from '../screens/automotivebusiness/Deals/CreateAudiance';
import StatisticsTab from '../screens/automotivebusiness/statisticstab/StatisticsTab';
import HiringTab from '../screens/automotivebusiness/hiringtab/HiringTab';
import CreateHiring from '../screens/automotivebusiness/hiringtab/CreateHiring';
import EditHiring from '../screens/automotivebusiness/hiringtab/EditHiring';
import MagazineTab from '../screens/automotivebusiness/magazinetab/MagazineTab';
import podcastBusinessDetail from '../screens/automotivebusiness/magazinetab/podcastBusinessDetail';
import AutogrambusinessCreate from '../screens/automotivebusiness/magazinetab/AutogrambusinessCreate';
import AutogrambusinessDetail from '../screens/automotivebusiness/magazinetab/AutogrambusinessDetail';
import AutogrambusinessEdit from '../screens/automotivebusiness/magazinetab/AutogrambusinessEdit';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DriverDealsTab from '../screens/driverbusiness/driverdealstab/DriverDealsTab';
import DriverDealsDetails from '../screens/driverbusiness/driverdealstab/DriverDealsDetails';
import DriverFavoritesTab from '../screens/driverbusiness/driverfavoritestab/DriverFavoritesTab';
import DriverHomeTab from '../screens/driverbusiness/driverhometab/DriverHomeTab';
import DriverMagazineTab from '../screens/driverbusiness/drivermagazinetab/DriverMagazineTab'
import DriverAutogramDetail from '../screens/driverbusiness/drivermagazinetab/DriverAutogramDetail'
import podcastDetail from '../screens/driverbusiness/drivermagazinetab/podcastDetail'
import DriverProfileTab from '../screens/driverbusiness/driverprofiletab/DriverProfileTab';
import DriverEditProfile from '../screens/driverbusiness/driverprofiletab/DriverEditProfile';
import UploadDealForm from '../screens/automotivebusiness/uploaddealform/UploadDealForm';
import DriverServicesList from '../screens/driverbusiness/driverserviceslist/DriverServicesList';
import DriverServiceDetails from '../screens/driverbusiness/driverservicedetails/DriverServiceDetails';
import DriverServiceGallery from '../screens/driverbusiness/driverservicegallery/DriverServiceGallery';
import DriverReviews from '../screens/driverbusiness/DriverReviews/index';
import CreateReviews from '../screens/driverbusiness/DriverReviews/CreateReviews';
import DriverReport from '../screens/driverbusiness/DriverReport/DriverReport';
import DriverServiceGalleryDetails from '../screens/driverbusiness/driverservicegallery/DriverServiceGalleryDetails';
import VehicleDriverSetting from '../screens/driverbusiness/VehicleDriverSetting/index';
import DriverInbox from '../screens/driverbusiness/DriverInbox';
import DriverInboxSchedule from '../screens/driverbusiness/DriverInbox/DriverInboxSchedule';
import DriverInboxClaim from '../screens/driverbusiness/DriverInbox/DriverInboxClaim';
import DriverSetting from '../screens/driverbusiness/DriverSetting/DriverSetting';
import Reward from '../screens/driverbusiness/Reward/Reward';
import ClaimRewards from '../screens/driverbusiness/Reward/ClaimRewards';
import Notification from '../screens/Notification';
import Logout from '../Components/Logout';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
    DriverLogin: {
        screen: DriverLogin,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverLogin'
        },
    },
    BusinessLogin: {
        screen: BusinessLogin,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverLogin'
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
    ForgotPasswordBussiness: {
        screen: ForgotPasswordBussiness,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ForgotPassword'
        },
    },
    ChangePasswordBusiness: {        // it can be commented in future..
        screen: ChangePasswordBusiness,
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
    Logout: {
        screen: Logout,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Deals'
        },
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Notification'
        },
    },
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
        initialRouteName: 'Intro',
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
    BusinessReviews: {
        screen: BusinessReviews,
        navigationOptions: {
            header: () => null,
            headerTitle: 'BusinessReviews'
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

        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};




const HiringBusinessStack = createStackNavigator({
    HiringTab: {
        screen: HiringTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'HiringTab'
        },
    },

    CreateHiring: {
        screen: CreateHiring,
        navigationOptions: {
            header: () => null,
            headerTitle: 'CreateHiring'
        },
    },
    EditHiring: {
        screen: EditHiring,
        navigationOptions: {
            header: () => null,
            headerTitle: 'EditHiring'
        },
    },

}, {
    initialRouteName: 'HiringTab',
    transitionConfig: () => fromRight(200),
}
);
HiringBusinessStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    // if (routeName == 'EditBusinessProfile') {
    //     tabBarVisible = false
    // }


    return {
        tabBarVisible,

        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};


const MagazineTabStck = createStackNavigator({
    MagazineTab: {
        screen: MagazineTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'MagazineTab'
        },
    },

    podcastBusinessDetail: {
        screen: podcastBusinessDetail,
        navigationOptions: {
            header: () => null,
            headerTitle: 'podcastBusinessDetail'
        },
    },

    AutogrambusinessCreate: {
        screen: AutogrambusinessCreate,
        navigationOptions: {
            header: () => null,
            headerTitle: 'AutogrambusinessCreate'
        },
    },

    AutogrambusinessEdit: {
        screen: AutogrambusinessEdit,
        navigationOptions: {
            header: () => null,
            headerTitle: 'AutogrambusinessEdit'
        },
    },

    AutogrambusinessDetail: {
        screen: AutogrambusinessDetail,
        navigationOptions: {
            header: () => null,
            headerTitle: 'AutogrambusinessDetail'
        },
    },

}, {
    initialRouteName: 'MagazineTab',
    transitionConfig: () => fromRight(200),
}
);
MagazineTabStck.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    // if (routeName == 'EditBusinessProfile') {
    //     tabBarVisible = false
    // }


    return {
        tabBarVisible,

        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};

const gallaryServiceTabStack = createStackNavigator({
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
    ManageDealEdit: {
        screen: ManageDealEdit,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ManageEditDeal'
        },
    },
    CreateAudiance: {
        screen: CreateAudiance,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ManageDeal'
        },
    },
}, {
    initialRouteName: 'Deals',
    transitionConfig: () => fromRight(200),
}
);
businessProfileTabStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if (routeName == 'CreateDeals') {
        tabBarVisible = false
    }
    else if (routeName == 'UploadDeals') {
        tabBarVisible = false
    }
    else if (routeName == 'ManageDeal') {
        tabBarVisible = false
    }
    else if (routeName == 'ManageDealEdit') {
        tabBarVisible = false
    }
    else if (routeName == 'CreateAudiance') {
        tabBarVisible = false
    }

    return {
        tabBarVisible,

        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
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
    DriverServiceGallery: {
        screen: DriverServiceGallery,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverServiceGallery'
        },
    },
    DriverServiceGalleryDetails: {
        screen: DriverServiceGalleryDetails,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverServiceGalleryDetails'
        },
    },
    DriverReviews: {
        screen: DriverReviews,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverReviews'
        },
    },
    CreateReviews: {
        screen: CreateReviews,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverReviews'
        },
    },
    DriverReport: {
        screen: DriverReport,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverReport'
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
        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};

const driverDealsStack = createStackNavigator({
    DriverDealsTab: {
        screen: DriverDealsTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'Home'
        },
    },

    DriverDealsDetails: {
        screen: DriverDealsDetails,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverDealsDetails'
        },
    },
    Reward: {
        screen: Reward,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverSetting'
        },
    },
    ClaimRewards: {
        screen: ClaimRewards,
        navigationOptions: {
            header: () => null,
            headerTitle: 'ClaimRewards'
        },
    },
}, {
    initialRouteName: 'DriverDealsTab',
    transitionConfig: () => fromRight(200),
}
);
driverDealsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'DriverDealsDetails') {
        tabBarVisible = false;
    }
    else if (routeName == 'ClaimRewardDriver') {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};


const DriverMagazineStack = createStackNavigator({
    DriverMagazineTab: {
        screen: DriverMagazineTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverMagazineTab'
        },
    },

    podcastDetail: {
        screen: podcastDetail,
        navigationOptions: {
            header: () => null,
            headerTitle: 'podcastDetail'
        },
    },
    DriverAutogramDetail: {
        screen: DriverAutogramDetail,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverAutogramDetail'
        },
    },
}, {
    initialRouteName: 'DriverMagazineTab',
    transitionConfig: () => fromRight(200),
}
);
DriverMagazineStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    // if (routeName == 'DriverAutogramDetail') {
    //     tabBarVisible = false;
    // }
    // else if (routeName == 'ClaimRewardDriver') {
    //     tabBarVisible = false;
    // }
    return {
        tabBarVisible,
        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};

const DriverProfileStack = createStackNavigator({
    DriverProfileTab: {
        screen: DriverProfileTab,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverProfileTab'
        },
    },

    DriverEditProfile: {
        screen: DriverEditProfile,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverProfileTab'
        },
    },

    VehicleDriverSetting: {
        screen: VehicleDriverSetting,
        navigationOptions: {
            header: () => null,
            headerTitle: 'VehicleDriverSetting'
        },
    },
    DriverInbox: {
        screen: DriverInbox,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverInbox'
        },
    },
    DriverInboxSchedule: {
        screen: DriverInboxSchedule,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverInboxSchedule'
        },
    },
    DriverInboxClaim: {
        screen: DriverInboxClaim,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverInboxClaim'
        },
    },
    DriverSetting: {
        screen: DriverSetting,
        navigationOptions: {
            header: () => null,
            headerTitle: 'DriverSetting'
        },
    },
}, {
    initialRouteName: 'DriverProfileTab',
    transitionConfig: () => fromRight(200),
}
);
DriverProfileStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'VehicleDriverSetting') {
        tabBarVisible = false;
    }
    else if (routeName == 'DriverInbox') {
        tabBarVisible = false;
    }
    else if (routeName == 'DriverInboxSchedule') {
        tabBarVisible = false;
    }
    else if (routeName == 'DriverInboxClaim') {
        tabBarVisible = false;
    }
    else if (routeName == 'DriverSetting') {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        // tabBarIcon: ({ tintColor }) => (
        //     <Icon name="md-settings" style={{ color: tintColor, fontSize: 30 }} />
        // )
    };
};

const businessTab = createBottomTabNavigator(
    {
        Profile: businessProfileTabStack,
        Deals: { screen: gallaryServiceTabStack },
        Statistics: { screen: StatisticsTab },
        Hiring: { screen: HiringBusinessStack },
        Magazine: { screen: MagazineTabStck }
    },
    {
        initialRoutename: 'Profile',
        //initialRouteName: AsyncStorage.getItem('notification') ? 'Profile' : 'Profile',
        defaultNavigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                //let iconName;
                if (routeName === 'Profile') {
                    return <Image source={require("../../assets/images/Bussiness-My-Profile.png")} style={{ width: 21, height: 21 }} />
                } else if (routeName === 'Deals') {
                    return <Image source={require("../../assets/images/Gallery.png")} style={{ width: 21, height: 21 }} />
                }
                else if (routeName === 'Statistics') {
                    return <Image source={require("../../assets/images/Statistics.png")} style={{ width: 21, height: 21 }} />
                }
                else if (routeName === 'Hiring') {
                    return <Image source={require("../../assets/images/bussiness-Hiring.png")} style={{ width: 21, height: 21 }} />
                }
                else if (routeName === 'Magazine') {
                    return <Image source={require("../../assets/images/bussiness-Magazine.png")} style={{ width: 21, height: 21 }} />
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


const driverTab = createBottomTabNavigator(
    {
        Home: driverServiceStack,
        Deals: {
            screen: driverDealsStack
        },
        Profile: {
            screen: DriverProfileStack
        },
        Favorites: {
            screen: DriverFavoritesTab
        },
        Magazine: {
            screen: DriverMagazineStack
        }
    },
    {
        initialRoutename: 'Profile',
        // initialRouteName: AsyncStorage.getItem('notification') ? 'Favorites' : 'Profile',
        defaultNavigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                //let iconName;
                if (routeName === 'Home') {
                    return <Image source={require("../../assets/images/home.png")} style={{ width: 28, height: 28 }} />
                } else if (routeName === 'Deals') {
                    return <Image source={require("../../assets/images/deals.png")} style={{ width: 28, height: 28 }} />
                }
                else if (routeName === 'Profile') {
                    return <Image source={require("../../assets/images/my-profile.png")} style={{ width: 40, height: 40, marginBottom: 20 }} />
                }
                else if (routeName === 'Favorites') {
                    return <Image source={require("../../assets/images/favorate.png")} style={{ width: 28, height: 28 }} />
                }
                else if (routeName === 'Magazine') {
                    return <Image source={require("../../assets/images/bussiness-Magazine.png")} style={{ width: 22, height: 22 }} />
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
    constructor(props) {
        super(props);

        this.state = {

        }
        //this.setItem();
    }

    // async setItem () {
    //     var notification = JSON.parse(await AsyncStorage.getItem("notification"));
    //     if (notification) {
    //         this.props.navigation.navigate('MagazineTab')
    //         await AsyncStorage.removeItem('notification');
    //     }
    //     else {
    //         this.props.navigation.navigate('Splash')
    //     }
    // }

    render() {
        return <AppContainer />;
    }
}
console.disableYellowBox = true;