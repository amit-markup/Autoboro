import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       height:'100%',
       width:'100%',
       backgroundColor:'#fdfdfd',
    },
    imgLogo:{
        width:200,
        height:125,
        marginTop:30,
        alignSelf:'center',
        resizeMode:'contain',
    },
    introView:{
        width: '100%',
        height: '100%',
        flexDirection:'column',
        //justifyContent: 'center',
    },
    // imgBird:{
    //     width:200,
    //     height:200,
    //     marginTop:20,
    //     alignSelf:'center',
    // }
    // emailLabel:{
    //     margin:'20%',
    //     width:'100%',
    //     height:40,
    //     borderRadius:2,
    //     borderColor:'#000000'
    // },
    // passwordLabel:{
    //     margin:20,
    //     borderRadius:2,
    // }
    input: {
        fontSize:12,
        textAlign:'left',
        paddingLeft:10,
        fontFamily: 'Roboto_Regular'
      },
      // labelInput: {
      //   color: '#000000',
      //   fontSize:12
      // },
      // inputStyle: {
      //   borderColor: '#FFFFFF',
      // },
      viewLabel1:{
        height:50, 
        width:'80%', 
        marginTop:20,
        marginRight:'10%', 
        marginLeft:'10%', 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
      },
      viewLabel2:{
        height:50, 
        width:'80%', 
        marginTop:10,
        marginRight:'10%', 
        marginLeft:'10%', 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
      },
      forgetPass:{
        marginTop:10,
        color:'#000000',
        marginLeft:10,
        fontSize:10,
        alignSelf:'flex-end',
        marginRight:'10%',
        fontFamily: 'Roboto_Regular'
      },
      viewLogin:{
        height:50, 
        width:'80%', 
        marginTop:20,
        marginRight:'10%', 
        marginLeft:'10%', 
        flexDirection:'row',
      },
      btnLogin:{
        flex:1.5,
        backgroundColor:'#0d2950',
        marginRight:7,
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
    
});