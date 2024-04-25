import {View, Text, TextInput, Image} from 'react-native';
import React, { useEffect } from 'react';
import {style} from './style';
import CommonHeader from '../../Common/commonHeader';
import CustomSearchBar from '../../Common/CustomSearchbar';
import Banner from '../../Common/Banner';
import RecentPurchases from '../../Common/RecentPurchases';
import {ScrollView} from 'react-native-gesture-handler';
import Shopcategory from '../../Common/Shopcategory';
import Productscroll from '../../Common/productscroll';
import OfferProducts from '../../Common/Offerproducts';
import { useDispatch, useSelector } from 'react-redux';
import { updatewishcart } from '../../storage/actions';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  useEffect(() => {
    callwishlist()   
  }, [])
  
const dispatch=useDispatch()
const userid = useSelector(state => state.userid);
const wishid = useSelector(state => state.wishid);


  const callwishlist = async () => {
    var Return=[]
        firestore()
          .collection('Wishlist')
          .where('userid', '==', userid)
          .get()
          .then(snapshot => {
            
            if (snapshot.empty) {
            
              dispatch(updatewishcart([]))
            
            } else {
              const Return=[]
            
              snapshot.forEach(doc => {
               
              Return.push(doc.data().id)
              });
              // console.warn(Return);
        dispatch(updatewishcart(Return))
            
            }
           
    
          })
          .catch(err => {
            console.log(err);
          });
      };
    




  return (
    <View style={style.main}>
      <CommonHeader />

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={style.container}>
        <Text style={{color: 'red'}} />

        <CustomSearchBar />
        <Banner />
        <RecentPurchases />
        <Shopcategory />
        <Productscroll />
        <OfferProducts/>
        <Text style={{fontWeight:'bold',fontSize:25,color:'#9da39e',marginVertical:10,marginLeft:15}}>Didnt Find What u need??</Text>
        <View style={{backgroundColor:'lightgreen',width:'45%',justifyContent:'center',alignItems:'center',padding:15,marginBottom:25,marginVertical:0,marginHorizontal:10,borderRadius:15,marginLeft:15}}>
          <Text style={{fontSize:17,fontWeight:'bold',color:'#000'}}>Browse Category</Text>
        </View>
              </ScrollView>
    </View>
  );
};

export default Home;
