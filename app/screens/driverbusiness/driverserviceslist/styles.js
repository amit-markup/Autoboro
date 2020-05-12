import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper : {
       minHeight:'100%',
       backgroundColor:'#f1f1f1',
    },
    container:{
        marginLeft: '5%', 
        marginRight: '5%', 
        width: '90%', 
        justifyContent:'center',
        paddingBottom: 225,
    },
    row:{
        flex: 1,
        justifyContent: "space-between",
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
      },
    
});