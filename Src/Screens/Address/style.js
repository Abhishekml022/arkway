import { StyleSheet } from "react-native";

const style = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      fontFamily: "Lato-Regular",
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#000',
      width: width * 0.9,
      backgroundColor: '#00a',
      height: 50,
      margin: 10,
      alignSelf: "center",
    },
    description: {
      fontSize: 16,
      fontFamily: "Lato-Regular",
    },
    mapView: {
      height: height * 0.4,
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    TouchView: {
      padding: 15,
      marginVertical: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    touchText: {
      fontSize: 18,
      fontFamily: "Lato-Bold",
    },
    iconView: {
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
      backgroundColor: 'lightgreen',
    },
  });

export default style;