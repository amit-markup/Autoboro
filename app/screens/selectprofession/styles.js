import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       height:'100%',
       width:'100%',
       backgroundColor:'#FFFFFF',
    },
    imgLogo:{
        width:335,
        height:230,
        alignSelf:'center',
        resizeMode:'contain',
    },
    introView:{
        width: '100%',
        height: '100%',
        flexDirection:'column',
        justifyContent: 'center',
    },
    imgBird:{
        width:200,
        height:200,
        marginTop:20,
        alignSelf:'center',
        resizeMode:'contain',
    },
    btnDriver:{
        margin:20,
        backgroundColor:'#0d2950',
    },
    btnBusiness:{
        margin:20,
        backgroundColor:'#f5900e'
    }
    
});