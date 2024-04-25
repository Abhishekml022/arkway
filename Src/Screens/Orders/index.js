import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomSearchBar from '../../Common/CustomSearchbar'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { style } from './style'
import HeaderLeft from '../../Common/commonheaderleft'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'

const Orders = () => {
  const [OrderedItems, setOrderedItems] = useState('');
  const isfocussed=useIsFocused()
  const userid = useSelector(state => state.userid);

  useEffect(() => {
    
   if(isfocussed){
    
       callorders()
    }
  
  }, [isfocussed])

  const callorders=async()=>{
  firestore()
  .collection('Orders')
  
  .where('Userid', '==', userid)
  .get()
  .then(snapshot => {
    if (snapshot.empty) {
      // console.warn('empty');
      setOrderedItems([])
    } else {
      const Return=[]
      snapshot.forEach(doc => {

        const response = {docid: doc.id, ...doc?.data()};
        Return.push(response);
      });
      setOrderedItems(Return);     
    }
  })
  .catch(err => {
    console.log(err);
  });
};

const searchorder=async(text)=>{
  firestore()
  .collection('Orders')
  .where('Userid', '==', userid).orderBy('OrderID')
  .startAt(String(text)).endAt(String(text) + '\uf8ff')
  .get()
  .then(snapshot => {
    if (snapshot.empty) {
      setOrderedItems([])
      Snackbar.show({
        text:'NO such order found'
      })
    } else {
      const Return=[]
      snapshot.forEach(doc => {
        const response = {docid: doc.id, ...doc?.data()};
        Return.push(response);
      });
      setOrderedItems(Return);
    }}).catch(err=>console.log(err))}


const navigation=useNavigation()
useEffect(() => {
  navigation.setOptions({
    HeaderLeft:  () => <HeaderLeft /> ,
    title: 'Orders',
  })
}, [])

  return (
    <ScrollView>
    <View style={{padding:5,alignItems:'center'}}>

      <CustomSearchBar filter={true} onChangeText={searchorder}/>
      <FlatList data={OrderedItems} renderItem={({item,index})=>{
        const rcditems=item.CartItems
        return(
<TouchableOpacity onPress={()=>{navigation.navigate("Orderdetails",{order:item})}}>
<View style={{backgroundColor:'#ded',borderRadius:10,marginVertical:10,width:320}}>
<View style={{flexDirection:'row',justifyContent:'space-between',padding:10,borderBottomWidth:1,borderBottomColor:'#000',borderRadius:12,paddingVertical:15}}>
<View style={{padding:0,justifyContent:'space-between'}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
<Text style={{color:'#004',fontSize:15}}>Order ID : </Text>
<Text style={{fontSize:18,color:'green',fontWeight:'900'}}>{item.OrderID}</Text>

</View>

<View style={{flexDirection:'row',alignItems:'center'}}>
<Text style={{color:'#004',fontSize:14}}>Date: </Text>
<Text style={{fontSize:15,color:'green',fontWeight:'900',maxWidth:100 }}numberOfLines={3}>{item.Created}</Text>

</View>

<View style={{alignItems:'flex-start',}}>

<View style={{flexDirection:'row',alignItems:'flex-start',maxWidth:140}}>
<Text style={{fontSize:14,color:'green',fontWeight:'900'}}>{item.Address}</Text>

<Text style={{fontSize:14,color:'green',fontWeight:'900'}}>{item.Address}</Text>
</View>
<Text style={{fontSize:14,color:'green',fontWeight:'900'}}>{item.State}, </Text>
<View style={{flexDirection:'row',alignItems:'flex-start'}}>
<Text style={{fontSize:14,color:'green',fontWeight:'900'}}>{item.Country}</Text>
<Text style={{fontSize:14,color:'green',fontWeight:'900'}}> -{item.Pin}</Text>



</View>

</View>
<View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
<Text style={{color:'#004',fontSize:14}}>Order Total : </Text>
<Text style={{fontSize:15,color:'green',fontWeight:'900',marginRight:5}}>{item.TotalAmount},</Text>
<Text style={{color:'#004',fontSize:14}}>Items #: </Text>
<Text style={{fontSize:15,color:'green',fontWeight:'900'}}>{rcditems.length}</Text>


</View>
</View>

<View style={{alignContent:'space-around',alignItems:'flex-end'}}>
  <Image source={require('../../Images/location.webp')} style={{height:100,width:120,resizeMode:'cover'}}/>

</View>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15,marginHorizontal:5}}>
  <View style={{flexDirection:'row'}}>
  <Text>Order status: </Text> 
<Text style={{fontSize:14,color:'green',fontWeight:'700'}}>{item.OrderStatus}</Text>
</View>
  <Text style={{color:'green'}}>Rate & Review Products</Text>

</View>
</View>
</TouchableOpacity>
        )

      }
    }
/>




    </View>
    </ScrollView>
  )
}

export default Orders