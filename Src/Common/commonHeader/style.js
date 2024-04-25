import {Dimensions, StatusBar, StyleSheet} from 'react-native';
const style = (height,width,isPortrait) =>  StyleSheet.create({

  
  container: {flexDirection: 'row',justifyContent:'space-between', alignItems: 'center',marginTop: isPortrait? 10:50,backgroundColor:'#faf9f6',height:80,elevation:0,borderRadius:0},
logo:{
    height:  width*.12 , width: isPortrait? width*.24: width*.1,resizeMode:'contain',marginRight:10
},
drawericon:{
    height:45,width:40,resizeMode:'contain',marginLeft:10
}
});
export default style
