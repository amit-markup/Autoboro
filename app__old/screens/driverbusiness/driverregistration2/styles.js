import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       
    },
    input: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:45,
        fontFamily: 'Roboto_Regular'
      },
      // labelInput: {
      //   color: '#000000',
      //   fontSize:12,
      //   textAlignVertical:'center'
      // },
      // inputStyle: {
      //   borderColor: '#FFFFFF',
      // },
      viewLabel1:{
        height:45, 
        width:'90%', 
        marginTop:15,
        marginRight:'5%', 
        marginLeft:'5%', 
        backgroundColor:'white',
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
      },
      viewLabel4:{
        height:45, 
        width:'90%', 
        marginTop:15,
        marginRight:'5%', 
        marginLeft:'5%', 
        borderColor:'#000000',
        flexDirection:'row', 
        borderRadius:1, 
        borderWidth: 1,
        backgroundColor:'white',
      }, 
      activityIndicator: {
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
     container:{
      height:320, 
      top:'25%',
      width:'90%',
      marginLeft:'5%',
      marginRight:'5%',
      backgroundColor: '#fff',
      flexDirection:'column',
      borderRadius: 10,
    }, 
    
});