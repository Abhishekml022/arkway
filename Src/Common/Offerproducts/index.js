import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonSectionHeader from '../CommonSectionHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import Productdisplay from '../Productdisplay'
import {useDispatch, useSelector } from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import { updateCartCount } from '../../storage/actions'

const OfferProducts = () => {
  const [Products, setProducts] = useState('')
const dispatch=useDispatch()

  useEffect(() => {
    fetchproducts()
  
  
  }, [])
  
  const fetchproducts=async()=>{
await firestore().collection('Products').get(). then((snapshot)=>{
  if(snapshot.empty){
    // console.warn('empty');
    setProducts(null)
    


  }
  else{
const Return=[]
    snapshot.forEach(doc=>{
      if(doc.exists){
        const response={id:doc.id,...doc?.data()};
      Return.push(response)
      }
      setProducts(Return) 
     

      
    })
  }
}).catch(err=>{
  console.log(err);
  setindicator(false)

} )
      }
    
    
  return (
    <View >
     
    <View style={{padding:15,backgroundColor:'#def',padding:10,borderRadius:5,elevation:5}}>

      <CommonSectionHeader head={"Offers Offers Offers !!!"} content={'Tons of Offers'} rtext={"See all"} path={'Shop'} />
    <View>
      <FlatList data={Products} showsVerticalScrollIndicator={false}    keyExtractor={(key,index)=>String(index)}
            renderItem={({item,index})=><Renderitems item={item} index={index}/>}
      
      
      />
    </View>
    </View>
    </View>
  )
}
export const Renderitems=({item,index})=>{
  const navigation=useNavigation()

  const CartCount=useSelector(state=>state.CartCount)
  const userid=useSelector(state=>state.userid)
  const [Qty, setQty] = useState(0)
const dispatch=useDispatch()


  const addtocart=async()=>{
    await firestore()
      .collection('Cart')
      .where('Name', '==', item.Name)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('Cart')
            .add({Qty: Qty, ...item,userid:userid})
            .then(resp => {
              Snackbar.show({
                text: 'Added to cart',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: '#fff',
              });
            });
          dispatch(updateCartCount(CartCount + 1))

        } else {
          firestore().collection('Cart').doc(snapshot?.docs[0].id).update({
            Qty: Qty,
          });
        }
      });
  };

  return(
  <TouchableOpacity
  style={{alignItems: 'center', elevation: 5}}
  onPress={() => {
    navigation.navigate('Productpage', {product: item});
  }}>
  <View
    style={{
      borderRadius: 15,
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 8,
      flexDirection: 'row',
      overflow: 'visible',
      elevation: 5,
      width: 340,
      shadowColor: 'transparent',
      borderWidth: 0.5,
      borderColor: 'green',
    }}>
    <Image
      source={ {uri: item.Url}}
      style={{
        height: 75,
        width: 75,
        resizeMode: 'contain',
        marginVertical: 10,
        alignSelf: 'center',
      }}
    />
    <View
      style={{borderLeftWidth: 1, paddingHorizontal: 10, marginLeft: 15}}>
      <Text
        style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 15}}>
        {item.Name}
      </Text>
      <Text style={{textAlign: 'justify', width: 150}} numberOfLines={2}>
        {item.Description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}></View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
          ₹ {item.Price}
        </Text>
        <View
          style={{
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: 'lightgreen',
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000'}}>{item.Percentage} %</Text>
        </View>
        <View></View>
      </View>

      
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'lightgreen',
            borderRadius: 15,
            paddingHorizontal: 15,
            alignItems: 'center',
            backgroundColor: '#c7fcd0',
            marginVertical: 10,
          }}>
          <TouchableOpacity onPress={() => {setQty(Qty<=0?0:Qty-1),addtocart()} }>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                fontSize: 30,
                marginRight: 25,
                color: 'red',
              }}>
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginRight: 25,
              color: '#000',
            }}>
            {Qty}
          </Text>

          <TouchableOpacity onPress={() =>{ setQty(Qty+1) ;addtocart()}}>
            <Text
              style={{fontWeight: 'bold', fontSize: 30, color: 'green'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      
    </View>

    
  </View>
</TouchableOpacity>

          )

}

export default OfferProducts