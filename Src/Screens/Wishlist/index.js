import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomSearchBar from '../../Common/CustomSearchbar'
import Productdisplay from '../../Common/Productdisplay/index'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'
import { updateCartCount } from '../../storage/actions'
const Wishlist = () => {
const [Wishlistitems, setWishlistitems] = useState('')
 const CartCount=useSelector(state=>state.CartCount)
 const userid=useSelector(state=>state.userid)

 const isfocussed=useIsFocused()
 const dispatch=useDispatch()

useEffect(() => {
  if(isfocussed){
  callwishlist()
  }
}, [isfocussed])

const callwishlist = async () => {
var Return=[]
    firestore()
      .collection('Wishlist')
      .where('userid', '==', userid)
      .get()
      .then(snapshot => {
        
        if (snapshot.empty) {
        
          setWishlistitems([])
        
        } else {
        
          snapshot.forEach(doc => {
            const response = {...doc?.data()};
            Return.push(response);
           
          });
          setWishlistitems(Return);
      
          
        
        }
       

      })
      .catch(err => {
        console.log(err);
      });
  };
const deleteitemwish=async(item)=>{ 

  await firestore().collection("Wishlist").where('userid','==',userid).where('id','==',item.id).get().then(querysnapshot=>{
     
    querysnapshot.forEach(doc=>{
      doc.ref.delete().then(()=>{
        Snackbar.show({
          text:'Item Removed from wishlist'
        })
      })
    })
    callwishlist()
  })
}
  
  const addtocart = async item => {
    await firestore()
      .collection('Cart')
      .where('Name', '==', item.Name)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('Cart')
            .add({Qty: 1, ...item})
            .then(resp => {
              Snackbar.show({
                text: 'Added to cart',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: '#fff',
              });
            });
          dispatch(updateCartCount(CartCount+1))

        } else {
          Snackbar.show({
            text: 'Already in cart',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
            textColor: '#fff',
          });
        }
      });
  };
  

    
// console.warn(Wishlistitems);
const navigation=useNavigation()
  return (
    <ScrollView>
      <CustomSearchBar/>
      <FlatList data={Wishlistitems}  ListEmptyComponent={()=>{
          return(
            <View style={{alignItems:'center',justifyContent:'center',margin:10}}>
              <Text style={{fontSize:35,textAlign:'center',color:'#000',fontWeight:'bold'}}>Nothing here</Text>
              <TouchableOpacity
             style={{backgroundColor:'lightgreen',padding:10,borderRadius:15}} >
              <Text style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                Shop Now
              </Text>
            </TouchableOpacity>
            </View>
          )
        }}renderItem={({item,index})=>{
        
        return(

  <TouchableOpacity
  style={{alignItems: 'center', elevation: 5,margin:2}}
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
      source={{uri: item.Url}}
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
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'lightgreen',
            borderRadius: 15,
            padding: 5,
            backgroundColor: '#ffd',
            marginVertical: 15,
            maxWidth: 110,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={()=>addtocart(item)}> 
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: 'green',
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
    
    </View>

   
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: 1,
          width: 30,
          height: 30,
          marginTop: -20,
          marginLeft: 30,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }} onPress={()=>deleteitemwish(item)}>
        <Image
          source={require('../../Images/delete.png')}
          style={{height: 20, width: 20, resizeMode: 'cover'}}
        />
      </TouchableOpacity>
  </View>
</TouchableOpacity>












// }
   
            // <Productdisplay name={item.Name} description={item.description} percentage={item.percentage} price={item.Price} imagepath= {item.image} delete= {item.isdelete} />
           

        )
  }} />
  </ScrollView>
  )
}

export default Wishlist