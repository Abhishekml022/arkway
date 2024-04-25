import { View, Text, TextInput, Image, Alert } from 'react-native'
import React from 'react'

const CustomSearchBar = ({filter,placeholdertext,delivery,onChangeText={}}) => {
  return (
    <View >
        <View style={{alignItems:'center',flexDirection:'row',alignSelf:'center'}} >
            <View style={{flexDirection:'row',backgroundColor:'#b8f6d7',borderRadius:10,borderColor:'green',borderWidth:1,alignItems:'center',justifyContent:'space-evenly',width:filter==true?310:330,paddingHorizontal:25,paddingVertical:5,overflow:'hidden'}}>
        <Image source={require('../../Images/Search.png')} style={{height:35,width:20,resizeMode:'contain',marginRight:10}}/>
<TextInput style={{height:40,width:270,justifyContent:'center',padding:10,color:'red',alignItems:'center',marginLeft:4}} placeholder= {placeholdertext? placeholdertext :'Search Here'}placeholderTextColor={'#000'} onChangeText={text=>onChangeText(text)}>
  </TextInput>
        
  {delivery? <Text style={{color:'green',marginLeft:3}} onPress={()=>Alert.alert("checking delivery")}> Check</Text>
:  <Image source={require('../../Images/mike.png')} style={{height:40,width:30,resizeMode:'contain'}}/>}

 
        </View>
        {filter==true?
        <Text style={{color:'green',marginLeft:3}}> Filter</Text>:null}
        </View>
    
    </View>
  )
}

export default CustomSearchBar