import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { TouchableOpacity } from 'react-native-gesture-handler';

const Orderdetails = props => {
    const route=useRoute()
    const {order}=route.params

  return (
    <View style={{flex:1}}>
    <ScrollView style={{margin:12}} showsVerticalScrollIndicator={false}>
        <View style={{height:100,width:320,backgroundColor:'lightgreen',alignSelf:'center',marginVertical:10,borderRadius:15,flexDirection:'row',alignItems:'center',padding:10}}>
<View>
<Icon name="box" size={50} color='#000'/>
</View>
<View style={{marginHorizontal:10}}>
    <Text style={{fontSize:15,fontWeight:'600',color:'#000'}}>Order Id: {order.OrderID}</Text>
    <Text style={{fontSize:25,fontWeight:'bold',color:'#000'}}>{order.OrderStatus}</Text>
</View>
        </View>

      <Text style={{fontSize:20,color:'green',fontWeight:'600'}}>Items:</Text>
      {order.CartItems.map((Item, index) => {
        return (
            <View style={{backgroundColor:'#ded',marginVertical:5,borderRadius:10,padding:2,paddingVertical:5}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row'}}>
                  <View style={{height:50,width:50,borderRadius:10,backgroundColor:'lightgreen',alignItems:'center',justifyContent:'center',margin:7}}>
                    <Text style={{fontSize:25,color:'#000'}}>{Item.Qty}</Text>
                  </View>


                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <Image source={{uri:Item.Url}} style={{height:50,width:40,resizeMode:'contain',marginLeft:5}}/>
                  
                  <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>  {Item.Name}</Text>
                </View>
                </View>

                  <Text style={{color:'#000',fontWeight:'800',fontSize:25,marginRight:10}}> ₹ {Item.Price}</Text>
                  </View>
                </View>
        )})}
        

      <View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10,borderBottomColor:'#000',borderBottomWidth:1,paddingBottom:10}}>
     <View>
        <Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'green'}}>Payment Summary</Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Bag Total</Text>
        <Text style={{fontSize:15,color:'#000',lineHeight:30}}>Delivery </Text>


     </View>

     <View style={{alignItems:'flex-end'}}>

<Text></Text>    
 <Text style={{fontSize:16,color:'#000',lineHeight:30}} >{parseFloat(order.TotalAmount-50).toFixed(2)}</Text>

     <Text>50</Text>



     </View>

    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'#000'}}>Order Total</Text>
<Text style={{fontFamily:'Poppins-Bold',fontSize:20,color:'green'}}>Rs.{parseFloat(order.TotalAmount)}</Text>
</View>
    </View>

    <View>
      <Text style={{fontSize:20,color:'green',fontWeight:'bold',marginVertical:6}}>Address:</Text>
      <Text style={{maxWidth:150,lineHeight:20,color:'#000'}}>{order.Address}</Text>
    </View>
  
    <Text style={{fontSize:20,color:'green',fontWeight:'600'}}>Payment Method:</Text>
    <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
    <Fontisto name="visa" size={30} color='#000'/>
    <View style={{marginLeft:5}}>
    <Text>  **** **** **** 4422</Text>
    <Text>Online</Text>
    </View>
    </View>
    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'lightgreen',padding:10,alignSelf:'center',width:"95%",borderRadius:10,marginVertical:10}}>
      <Text style={{color:'#000',fontSize:25,fontWeight:'bold'}}>Reorder</Text>
    </TouchableOpacity>
    </ScrollView>
    </View>
    
  )
}

export default Orderdetails