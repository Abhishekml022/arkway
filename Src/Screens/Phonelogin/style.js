import { StyleSheet,Dimensions } from "react-native";
import { View, Text } from 'react-native'
import React from 'react'
const style = (height,width)=>
StyleSheet.create({
    Container:{
        flex:1,elevation:10
    },
    BgImage:{
        height:height*.2, width:width
    },
    Image:{
        height:height*.2,width:width
    },
    Scrollstyle:{
        flex:1,backgroundColor:'#f7ebff',marginTop:-height*.03,borderTopRightRadius:30,borderTopLeftRadius:30,overflow:'hidden',padding:width*.05
    },
    Logintext:{color:'#c878fa',fontSize:20,fontFamily:'Poppins-Bold'},
    createnew:{color:'#929292',fontSize:18,fontFamily:'Poppins-Regular',textAlign:'center',margin:15},
   
})

export default style