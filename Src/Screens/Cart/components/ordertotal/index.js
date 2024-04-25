import { View, Text } from 'react-native'
import React from 'react'

const Ordertotal = props => {

  return (
    <View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10,borderBottomColor:'#000',borderBottomWidth:1,marginHorizontal:10}}>
     <View>
        <Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'#000'}}>Order Details</Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Bag Total</Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Bag Savings</Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Coupoun Discount </Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Delivery </Text>


     </View>

     <View style={{alignItems:'flex-end'}}>

<Text></Text>    
 <Text style={{fontSize:16,color:'#000',lineHeight:30}} >{parseFloat(props.total).toFixed(2)}</Text>

     <Text style={{fontSize:16,color:'green',lineHeight:30}}>0.00</Text>
     <Text style={{fontSize:16,color:'red',lineHeight:30}}>Apply Coupon</Text>
     <Text>{parseFloat(props.charges).toFixed(2)}</Text>



     </View>

    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:9}}>
<Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'#000'}}>Order Total</Text>
<Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'#000'}}>Rs.{parseFloat(props.total)+parseFloat(props.charges)}</Text>
</View>
    </View>


  )
}

export default Ordertotal