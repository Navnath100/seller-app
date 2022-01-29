import { StyleSheet,Dimensions } from 'react-native'
const width = Dimensions.get('window').width
const GlobalStyles = StyleSheet.create({
    TextInputView: {
        width: (width/100)*80,
        height: 50,
        flexDirection: 'row',
        marginTop: 10,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 5,
        alignSelf: "center"
    },
    TextInput: {
        flex: 1,
        fontSize: 14,
        height: 40,
        color: "#FFF"
    },
    Button: {
        height: 50,
        margin: 5,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: "#000000",
    },
    box: {
        width: (width/100)*90,
        backgroundColor: "#4185EF",
        marginTop: (width/100)*20,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 20,
        alignSelf:'center'
    },
    buttonNotClicked: {
        width: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#4185EF",
        borderWidth: 1,
        backgroundColor: "#FAFAFA"
    },
    buttonNotClickedText: { fontSize: 12, fontWeight: "500", color: "#4185EF", padding: 5 },
    buttonClicked: { 
        width: 100, 
        backgroundColor: "#4185EF", 
        borderRadius: 20, 
        alignItems: "center", 
        justifyContent: "center", 
        borderColor: "#4185EF", 
        borderWidth: 1 
    },
    buttonClickedText: { fontSize: 12, fontWeight: "500", color: "#FFF", padding: 5 },
    circleContainer: {
        height: 0, width: width - 30, borderTopWidth: 1, 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        borderColor: colors.primary, marginVertical: 30, marginHorizontal: 15
    },
    circle: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginTop: -16
    }
});

export default GlobalStyles