import { View, Text, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import style from './style'
import CustomSearchBar from '../../Common/CustomSearchbar'
import { useSelector } from 'react-redux'
import Productdisplay from '../../Common/Productdisplay'
import firestore from '@react-native-firebase/firestore'

const Shop = () => {
    const navigation=useNavigation()
    const route=useRoute();
    const [Selectedstate, setSelectedstate] = useState('')
    const [products,setProducts]=useState('')
    const [indicator, setindicator] = useState(false)
    const {type}=route.params
    // console.warn(type);

    useEffect( () => {
      callproducts()
      
    }, [])
    
    useEffect(() => {
        navigation.setOptions({
          HeaderLeft:  () => <HeaderLeft /> ,
          title: Selectedstate ==='all'?'Shop': Selectedstate,
          
          
        })
      }, [Selectedstate])

      const callproducts=async()=>{
        setindicator(true)
        const Return=[]
        
      await firestore().collection('Products') .get(). then((snapshot)=>{
        if(snapshot.empty){
          setProducts(null)
  
        }
        else{

          snapshot.forEach(doc=>{
            if(doc.exists){
          Return.push(doc.data())
            }
            setProducts(Return) 
            setindicator(false)
            // console.warn('return is',Return);
          })

          
        }
      }).catch(err=>{
        console.log(err);
    } )
      }
      const categories=useSelector(state=>state.categories)

      const handlecategories=async item=>{
        setSelectedstate(item.Name)
        // console.warn(item.Name);
const Return=[]   
setindicator(true)

await firestore().collection('Products') .where('Category Name','==',Selectedstate).get(). then((snapshot)=>{
  if(snapshot.empty){
    // console.warn('empty');
    setProducts(null)
    setindicator(false)


  }
  else{

    snapshot.forEach(doc=>{
      if(doc.exists){
        const response={id:doc.id,...doc?.data()};

        Return.push(response)
      }
      setProducts(Return) 
      setindicator(false)

      // console.warn('return is',Return);
    })

    
  }
}).catch(err=>{
  console.log(err);
  setindicator(false)

} )
      }
    
      
  return (
    <ScrollView>
    <View style={{alignItems:'center',margin:5}}>
      <CustomSearchBar filter={true}/>
      
      <FlatList data={categories} numColumns={2} contentContainerStyle={{backgroundColor:'#ded',padding:5,paddingBottom:15,paddingTop:0}} renderItem={({item,index})=>{
      const categorycolor= index % 4 === 0 ? '#facd50':index%4===1?'#dcf':index%4===2?'#dca':index%4===3?'#abe':'#abc'

            return(
                <View style={{justifyContent:'space-evenly',alignItems:'center',width:150,marginHorizontal:10}}>
               
                <TouchableOpacity style={{marginTop:10,backgroundColor:categorycolor,height:50,width:150,alignItems:'center',justifyContent:'center',borderRadius:10}} onPress={()=>handlecategories(item)}>
               
<Image source={{uri:item.Image}} style={{height:20,width:20,resizeMode:'contain'}}/>
                <Text style={{fontWeight:'800',color:'#000',fontSize:17}}>{item.Name}</Text>
                </TouchableOpacity>


            </View>

            )
      }}/>
      {indicator?
<ActivityIndicator size={'large'} animating={indicator}/>
:null}
<FlatList data={products} renderItem={({item,index})=>{

  return(
  <View >
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
            <TouchableOpacity >
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
              0
            </Text>

            <TouchableOpacity
              onPress={() => {
                // setQty(Qty + 1);
                // addToCart();
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: 'green'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>

   {/* <Productdisplay name={item.Name} description={item.Description} price={item.Price} url= {item.Image}/> */}

  </View>
  //  percentage={item.percentage}  delete= {item.isdelete} />
  )
}} />
{products===null??<Text style={{color:'red',fontSize:30}}>Empty</Text>}






    </View>
    </ScrollView>
  )
}

export default Shop