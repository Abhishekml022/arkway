import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomSearchBar from '../../Common/CustomSearchbar';
import style from './style';
import {useDimesionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation,useRoute } from '@react-navigation/native';

const Categories = () => {
  dimension = useDimesionContext();
  const responsivestyle = style(
    dimension.windowHeight,
    dimension.windowWidth,
    dimension.isPortrait,
  );
const route=useRoute()
const catindex=(route.params)

useEffect(() => {
  setActive(catindex)
}, [catindex])

  const categories=useSelector(state=>state.categories)
  const [Active, setActive] = useState(0);
  const [Products, setProducts] = useState('');
  console.log(Products);
  const [Id, setId] = useState('');
  const navigation=useNavigation()
 


  useEffect(() => {
    // callcategory();
    callproducts()
  }, []);
  // console.log(Category);
  // const callcategory = async () => {
  //   const Return = [];
  //   await firestore()
  //     .collection('Categories')
  //     .orderBy('Name', 'desc')
  //     .get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('EMpty');
  //       } else {
          
  //         snapshot.forEach(doc => {
  //           if (doc.exists) {
  //             Return.push(doc.data());
  //             console.log(doc.data());
  //           }
  //           setCategory(Return);
  //           setActive(0)
  //         });
  //       }
  //     });
  // };
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
  
const handlepress=(item)=>{
  setActive(item)
  setId(categories[item]?.Id)
}
  return (
    <View style={{flexDirection: 'row'}}>
      <ScrollView style={responsivestyle.container} nestedScrollEnabled>
        <CustomSearchBar />
        <View style={{flexDirection:'row'}}>
          <View>
          <FlatList
            data={categories}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: index===Active?'#fff':'lightgreen',
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    borderRadius: 10,
                    margin: 5,
                    marginTop: 10,
                    elevation:index===Active?3:0,
                    borderColor:'lightgreen',borderWidth:1.75
                  }} onPress={()=>handlepress(index)}>
                  <Image
                    source={{uri: item.Image}}
                    style={{height: 50, width: 50}}
                  />
                  <Text>{item.Name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        
        <ScrollView style={{flexDirection:'column'}}>
          <ImageBackground
            source={{uri:categories[Active]?.Backimage
          }}
            style={{height: 150, width: 232,marginTop:10,padding:10,borderRadius:10,overflow:'hidden'}} resizeMode='cover'>
            <Text style={{color:'#fff',fontSize:20}}>{categories[Active]?.Name}</Text>
            <Text style={{color:'#fff',fontSize:15,width:90}} numberOfLines={3}>{categories[Active]?.Description}</Text>
          
          </ImageBackground>
        
<FlatList numColumns={2} data={Products} renderItem={({item,index})=>{
return(
  <TouchableOpacity style={{justifyContent:'center',padding:5}} onPress={()=>navigation.navigate('Productpage',{product:item})}>
  
  <View style={{alignItems:'center',padding:10,borderRadius:20,margin:10,backgroundColor:'#dea'}}>
  <Image source={{uri:item.Url}}  style={{height:50,width:50}}/>
  <Text>{item.Name}</Text>
  <Text>Rs. {item.Price}</Text>
  </View>
  </TouchableOpacity>
)
}}/>

        </ScrollView>
        
        </View>
        
      </ScrollView>
    </View>
  );

};

export default Categories;
