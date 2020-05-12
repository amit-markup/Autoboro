import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    // wrapper : {
       
    // },

    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        position: "relative",
       },
       title: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
        marginTop:10,
      },
      // loader: {
      //   flex: 1, 
      //   justifyContent: "center",
      //   alignItems: "center",
      //   backgroundColor: "#fff"
      // },
      list: {
        width: '90%', 
        marginLeft: '5%', 
        marginRight: '5%',
        paddingVertical: 5,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1,
        borderColor: '#000000',
        borderRadius: 1, 
        borderWidth: 1, 
      },
      lightText: {
        color: "#000000",
        width: '75%',
        paddingLeft: 15,
        fontSize: 12
       },
       line: {
        height: 0.5,
        width: "100%",
        backgroundColor:"rgba(255,255,255,0.5)"
      },
      // icon: {
      //   position: "absolute",  
      //   bottom: 20,
      //   width: "100%", 
      //   left: 290, 
      //   zIndex: 1
      // },
      // numberBox: {
      //   position: "absolute",
      //   bottom: 75,
      //   width: 30,
      //   height: 30,
      //   borderRadius: 15,  
      //   left: 330,
      //   zIndex: 3,
      //   backgroundColor: "#e3e3e3",
      //   justifyContent: "center",
      //   alignItems: "center"
      // },
      // number: {
      //   fontSize: 14,
      //   color: "#000"
      // },
      selected: {
        backgroundColor: "#fbd9da"
      },
      input: {
        fontSize:12,
        textAlign:'left',
        paddingLeft:10
      },
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
      headline: {
        alignSelf:'center',
        color:'#000000',
        fontSize:18,
      },
      activityIndicator: {
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },      
});