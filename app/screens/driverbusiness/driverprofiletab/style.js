import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       justifyContent:'center',
       flexDirection:'column',
       backgroundColor:'#f1f1f1',
    },
    // headline: {
    //     alignSelf:'center',
    //     color:'#FFFFFF',
    //     fontSize:18,
    // },
    viewLabel2:{
        height:45,
        flex:1, 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
        marginRight:10,
        backgroundColor:'#ffffff',
    },
    viewLabel3:{
        height:45,
        flex:1, 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
        marginLeft:10,
        backgroundColor:'#ffffff',
    },
    input: {
        fontSize:12,
        textAlign:'left',
        paddingLeft:10,
    },
    inputs: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:45,
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
        backgroundColor:'#ffffff',
      }, 
      activityIndicator: {
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
     viewLabel1:{
        height:45, 
        width:'90%', 
        marginTop:15,
        marginRight:'5%', 
        marginLeft:'5%', 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
        backgroundColor:'#ffffff',
      },
      viewLabel11:{
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

});