import { Image, TouchableOpacity, View } from "react-native"
import {  useNavigation } from "@react-navigation/native";
import { useDimesionContext } from "../../context";
import style  from "./style";

const CommonHeader=()=>{
    const navigation=useNavigation()
    const dimension=useDimesionContext()
    const responsiveStyle = style(dimension.windowHeight,dimension.windowWidth,dimension.isPortrait)
  
    return(
        <View style={responsiveStyle.container}>
        <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Image source={require('../../Images/app-drawer.png')} style={responsiveStyle.drawericon}/>
        </TouchableOpacity>
        <Image source={require('../../Images/Logo.png')} style={responsiveStyle.logo}/>
        </View>
    )
}
export default CommonHeader