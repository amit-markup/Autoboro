import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       
    },
    input: {
        fontSize:12,
        textAlign:'left',
        paddingLeft:10,
        fontFamily: 'Roboto_Regular',
      },
      // labelInput: {
      //   color: '#000000',
      //   fontSize:12,
      //   textAlignVertical:'center'
      // },
      // inputStyle: {
      //   borderColor: '#FFFFFF',
      // },
      imageThumbnail: {
        flex:1,
          height: 180,
          zIndex: 5,
          borderColor:'black',
          borderWidth:1
          
        },
      viewLabel1:{
        height:45, 
        width:'90%', 
        marginTop:10,
        marginRight:'5%', 
        marginLeft:'5%', 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
      },
      viewLabel2:{
        height:45,
        flex:1, 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
        marginRight:10,
      },

      viewLabel3:{
        height:45,
        flex:1, 
        borderColor:'#000000', 
        borderRadius:1, 
        borderWidth: 1,
        marginLeft:10
      },
      viewLabel4:{
        height:45, 
        width:'90%', 
        marginTop:10,
        marginRight:'5%', 
        marginLeft:'5%', 
        borderColor:'#000000',
        flexDirection:'row', 
        borderRadius:1, 
        borderWidth: 1,
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
      activityIndicator: {
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
      }, 
    
});