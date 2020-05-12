import React, {Component} from 'react';
import {Text, View,StatusBar } from 'react-native';
// import css from './css/style';
// import config from 'react-native-config';
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-community/async-storage';


export default class Notification extends Component {
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

	async componentDidMount() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
              AsyncStorage.setItem("DeviceToken", JSON.stringify(token));
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
              AsyncStorage.setItem("notification", JSON.stringify(notification));
              // process the notification
           
              // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
              //notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
           
            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "210783179654",
           
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
           
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
           
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
          });
    
    }


	render() {
		return(
			<View>
			</View>
		)
	}
}