import { View, Text } from 'react-native'
import React from 'react'

import CustomSearchBar from '../CustomSearchbar'

const Delivery = () => {
  return (
    <View style={{margin:10,marginHorizontal:4,justifyContent:'space-between'}}>
      <Text style={{fontSize:20,fontWeight:'900',color:'#000',marginBottom:4}}>Check Delivery</Text>
      <Text style={{fontSize:14,fontWeight:'500',marginBottom:10}}>Enter Pincode to check delivery time</Text>

      <CustomSearchBar delivery={true} placeholdertext={"Pin Code"} />
      <Text style={{fontSize:14,fontWeight:'500',marginTop:10}}>Free Delivery on orders above 599</Text>
      <Text style={{fontSize:14,fontWeight:'500'}}>COD Available</Text>
      <Text style={{fontSize:14,fontWeight:'500'}}>7 day easy Returns</Text>

    </View>
  )
}

export default Delivery