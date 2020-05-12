import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        minHeight: '100%',
        backgroundColor: '#f1f1f1',
    },
    container: {
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    activityIndicator: {
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
    row: {
        flex: 1,
        justifyContent: "space-between"
    },
    /******** card **************/
    card: {
        marginVertical: 8,
        //backgroundColor:"white",
        flexBasis: '45%',
        marginHorizontal: 10,
    },
    cardContent: {
        paddingVertical: 4,
        justifyContent: 'space-between',
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
        borderTopRightRadius: 5, borderTopLeftRadius: 5
    },
    imageContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    /******** card components **************/
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "black"
    },
    count: {
        fontSize: 14,
        color: "black"
    },

});