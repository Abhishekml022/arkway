import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDimesionContext} from '../../context';
import {style} from './style';
import colors from '../colors';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { categories } from '../../storage/actions';
import { useNavigation } from '@react-navigation/native'



const Shopcategory = () => {
  const dimension = useDimesionContext();
  const responsivestyle = style(dimension.windowHeight, dimension.windowWidth);
  const dispatch=useDispatch()
  const [Category, setCategory] = useState('')
  const navigation=useNavigation()
  useEffect(() => {
    callpurchases()   
    
  }, [])
  const callpurchases=async()=>{
    const Return =[]
      await firestore().collection('Categories').orderBy('Name','desc').get().then((snapshot)=>{
        if(snapshot.empty){
console.log("EMpty");
        }
        else{
          snapshot.forEach(doc=>{
            if(doc.exists){
              const response={id:doc.id,...doc?.data()};
              Return.push(response)
            }
            setCategory(Return)
            dispatch(
              categories({
                categories:Return
              })
            )
          }
          )

        }
      })
  }
    return (
    <View style={responsivestyle.container} >
      <Text style={responsivestyle.head}>Shop by Category</Text>
      <FlatList
        data={Category}
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={responsivestyle.flatlist}
        keyExtractor={(key,index)=>String(index)}
        renderItem={({item, index}) => {
          const categorycolor= index % 4 === 0 ? '#facd50':index%4===1?'#dcf':index%4===2?'#dca':index%4===3?'#abe':'#abc'
          return (
            <TouchableOpacity style={responsivestyle.innerview} onPress={()=>navigation.navigate('Categories',{catindex:index})}>
              <View style={{backgroundColor:categorycolor,justifyContent:'center',alignItems:'center',borderRadius:15,padding:10}}>
                <Image  style={responsivestyle.image} source={{uri:item.Image}}/>
                </View>
              <Text style={responsivestyle.itemname}>{item.Name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Shopcategory;
