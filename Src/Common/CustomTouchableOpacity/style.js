import { StyleSheet } from "react-native"
import { Dimensions } from "react-native"
// const {height,width}=Dimensions.get('screen')

const style = (height,width)=>
StyleSheet.create({
    TouchableOpacity:{
        height:width*.17,
        flexDirection:'row',
        width:width*.9,
        borderRadius:15 ,
        padding : width*.01,
        marginBottom:5,
        backgroundColor:'#dcb1df',
        elevation:5,
        alignItems:'center',
        justifyContent:'center',marginVertical:width *.028,
        alignSelf:'center'
    
    },
    icon:{
        height:height*0.05,
        width:width*.08,
        resizeMode:'contain',marginRight:15
    }
})
export default style