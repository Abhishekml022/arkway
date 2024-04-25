import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const CommonSectionHeader = props => {
  const path=props.path
  const product=props.product

  const navigation=useNavigation()
  return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <View >
<Text style={{fontFamily:'Poppins-Bold',fontSize:22,color:'#000'}}>{props.head}</Text>
{props.content?<Text style={{fontFamily:'Poppins-Regular',fontSize:17,color:'#000',marginTop:-5}}>{props.content}</Text>:null}

</View>
<Text style={{fontFamily:'Poppins-Regular',fontSize:17,color:'#000'}} onPress={() => props.path && navigation.navigate(props.path,{type:'all',product:{...product}})} >{props.rtext}</Text>
</View>

  )
}

export default CommonSectionHeader