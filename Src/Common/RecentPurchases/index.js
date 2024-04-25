import { View, Text, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Banner from '../Banner'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'



const RecentPurchases = () => {
const [Products, setProducts] = useState({})

    const callproducts=async()=>{
        const Return=[]
        await firestore().collection('Products').get().then((snapshot)=>{
          if(snapshot.empty){
    
          }
          else{
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
      } )
      }
useEffect(() => {
  callproducts()

  
}, [])
const navigation=useNavigation()
  return (
   <View style={{marginLeft:5,marginVertical:15,backgroundColor:'#dec',height:120,padding:10,borderRadius:15}}>
    <Text style={{fontSize:20,fontWeight:'900'}}>Recent Purchases</Text>
    <FlatList data={Products} horizontal showsHorizontalScrollIndicator={false}   keyExtractor={(key,index)=>String(index)}
    renderItem={({item, index}) => {
        return (
            <TouchableOpacity style={{backgroundColor:'#fff',margin:5,borderRadius:10,alignItems:'center',justifyContent:'center',height:60}} onPress={()=>{navigation.navigate('Productpage',{product:item})}}>
        <Image source={{uri:item.Url}} style={{marginRight:8,height:50,width:50,borderRadius:15,resizeMode:'contain',marginLeft:10}} />
          
            </TouchableOpacity>
            
   ); }}/>
    </View>

      )
}

export default RecentPurchases