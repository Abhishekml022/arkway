import {View, Text, FlatList, Image, ImageBackground, PermissionsAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const Banner = () => {
  const [Banner, setBanner] = useState()
useEffect(() => {
  callbanner()
}, [])

const callbanner=async ()=>{
  const Return = []
  await firestore().collection('Banners').get().then((snapshot)=>{
    if(snapshot.empty){
      console.log("empty");
    }
    else{
      snapshot.forEach(doc=>{
        if(doc.exists){
            Return.push(doc.data())
        }
        setBanner(Return)
      })
    }
  })
}
  return (
    <View>
    <FlatList showsHorizontalScrollIndicator={false}
      keyExtractor={(key,index)=>String(index)}
      data={Banner} horizontal
      renderItem={({item, index}) => {
        return (
        <ImageBackground source={{uri:item.Image}} resizeMode='cover' style={{marginLeft:15, height:170,width:341,borderRadius:20,marginTop:10,marginRight:15,overflow:'hidden'}}>
            <View style={{padding:15}}>
                <Text style={{fontSize:18,fontWeight:'800',color:item.Textcolor}}>{item.Head}</Text>
                <Text style={{color:item.Textcolor,maxWidth:150}} numberOfLines={3}>{item.Content}</Text>
                <TouchableOpacity style={{backgroundColor:'lightgreen',alignItems:'center',justifyContent:'center',width:100,height:40,borderRadius:15,marginVertical:15}}>
                    <Text style={{fontWeight:'700',color:'#fff',fontSize:15}}>Shop Now</Text>
                </TouchableOpacity>
            </View>
            
            </ImageBackground>
            
   ); }}
    />
    </View>
  );
};

export default Banner;
