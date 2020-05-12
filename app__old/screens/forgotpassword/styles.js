import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
        height:'100%',
        width:'100%',
        backgroundColor:'#FFFFFF',
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
         justifyContent: 'center',
     },
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
        marginRight:'10%', 
        marginLeft:'10%', 
        borderColor:'#000000', 
        borderRadius:1, 
        marginTop:20,
        borderWidth: 1,
      },
    
});