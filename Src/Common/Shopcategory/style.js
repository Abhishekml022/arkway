import { StyleSheet } from "react-native";

 export const style=(height,width)=>StyleSheet.create({
    container:{
        marginLeft:15, width:350,overflow:'scroll'
    },
    head:{
        fontFamily:'Poppins-Bold',fontSize:20,textAlign:'center',color:'#000',maxWidth:210,alignSelf:'center',borderRadius:15,borderWidth:.25,borderColor:'lightgreen',paddingHorizontal:11,justifyContent:'center',alignItems:'center'
    },
    flatlist:{
        alignItems:'center',justifyContent:"space-evenly",marginVertical:15},
    innerview:{
        marginRight:10,marginBottom:10,alignItems:'center',justifyContent:'center'
    },
    itemname:{
        fontSize:20,
        color:'#003'
    },
    image:{
        height:height*.05,width:width*.1,resizeMode:'contain'
    }
    
})