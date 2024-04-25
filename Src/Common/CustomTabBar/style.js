import { StyleSheet } from "react-native"

const style =(height,width,isPortrait) =>StyleSheet.create({
container:{
    flexDirection: 'row',
        backgroundColor: 'lightgreen',
       height:  isPortrait? 85:60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
},
touchable:{
    justifyContent: 'center', alignItems: 'center'
},
icon:{
    height: isPortrait? 30:20,
                width: isPortrait? 30:20,
                resizeMode: 'contain',
                marginVertical: 5,
},
dot:{color:'#fff',fontSize:34,fontWeight:'bold',marginTop:isPortrait? -20:-30},
route:{color: '#000', fontWeight: '700', fontSize: 15},

cartcount:{
    position:'absolute',
    top:-10,
    right:-10,
    backgroundColor:'red',
    borderRadius:14,
    overflow:'hidden',paddingHorizontal:4,paddingVertical:2,textAlign:'center'

}
})
 export default style