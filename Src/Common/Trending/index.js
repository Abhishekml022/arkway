import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'


const Trending = () => {

    useEffect(() => {
        // callcategories()
      
        
      }, [])
const categories=useSelector(state=>state.categories)
      // const [Categories, setCategories] = useState('')
    
      // const callcategories=async()=>{
      //   const Return=[]
      //   await firestore().collection('Categories').get().then((snapshot)=>{
      //     if(snapshot.empty){
      //       console.log('No data received');
      //     }
      //     else{
      //       snapshot.forEach(doc=>{
      //         if(doc.exists){
      //           Return.push(doc.data())
      //         }
      //         setCategories(Return)
    
      //       })
            
      //     }
      //   })
      // }
      
  return (
    <View>
    <Text style={{fontSize:23,fontWeight:'700',marginTop:15,color:'#007',marginBottom:5}}>Trending Categories</Text>
<FlatList data={categories} horizontal showsHorizontalScrollIndicator={false} renderItem={({item,index})=>{
return(
<TouchableOpacity style={{padding:8, backgroundColor: index % 4 ==0? '#dea':index%4==1? '#ebf':index%4==2? '#dff':index%4==3? '#fac':'#fff',borderRadius:15,margin:5,marginBottom:20,elevation:4,alignItems:'center',justifyContent:'center',width:100}}>
<Image source={{uri:item.Image}} style={{height:60,width:60,resizeMode:'contain'}}/>
<Text style={{marginTop:7,fontSize:15,fontWeight:'500',fontFamily:'Poppins-Bold'}}>{item.Name}</Text>
</TouchableOpacity>

)
}}/>
  <View>
   
  </View>
  </View>
  )
}

export default Trending

