import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Offerdesign from '../../Common/Offerdesign';
import Ordertotal from './components/ordertotal';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Productdisplay from '../../Common/Productdisplay';
import { updateCartCount } from '../../storage/actions';
import Snackbar from 'react-native-snackbar';
import Wishlist from '../Wishlist';
const Cart = () => {
  const [cartitems, setcartitems] = useState('');
  const Return = [];

  const userid = useSelector(state => state.userid);
  const email = useSelector(state => state.email);
  const mobilenumber = useSelector(state => state.mobilenumber);



  const [total, settotal] = useState(0)
  const [charges, setcharges] = useState(0)

const dispatch=useDispatch()
  const navigation = useNavigation();
 const isfocussed=useIsFocused()
 useEffect(() => {
   
  if(isfocussed){
   
      callcart()
   }
 
 }, [isfocussed])
 
 
  useEffect(() => {
    if(cartitems.length>0){
    setcharges(50)
    }
    else{
      setcharges(0)
    }
  
    
  }, [cartitems])
  
const updateArray=productInfo=>{
 const result= cartitems.filter(x=>{return x.id!=productInfo.id}); 
 settotal(total - parseFloat(productInfo.Price));

 setcartitems(result)
}
const handleTotal=(type,productInfo)=>{
  if(type==='add'){
    settotal(total+parseFloat(productInfo.Price))
  }
else{
  settotal(total-parseFloat(productInfo.Price))

}

}
  const callcart = async () => {
    let totalAmount=0

    firestore()
      .collection('Cart')
      .where('userid', '==', userid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setcartitems([])
          settotal(0)
        } else {
        
          snapshot.forEach(doc => {
            const amount=parseFloat(doc?.data().Price)* parseInt(doc?.data().Qty)
            const response = {docid: doc.id, ...doc?.data()};
            Return.push(response);
            totalAmount=totalAmount+amount
          });
          setcartitems(Return);
          settotal(totalAmount)
          
          // dispatch(updateCartCount({CartCount:snapshot.size}))
        }
       

      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView
      style={{
        alignSelf: 'center',
        backgroundColor: '#fff',
        flex: 1,
        maxWidth: 350,
      }}>
      <FlatList
        data={cartitems}
        extraData={cartitems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(key, index) => String(index)}
        renderItem={({item, index}) => (
          <Renderitems item={item} index={index} updateArray={updateArray} handleTotal={handleTotal} />
        )}
        ListEmptyComponent={()=>{
          return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:35,textAlign:'center',color:'#000',fontWeight:'bold'}}>Empty Cart</Text>
              <TouchableOpacity
             style={{backgroundColor:'lightgreen',padding:10,borderRadius:15}} >
              <Text style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                Shop Now
              </Text>
            </TouchableOpacity>
            </View>
          )
        }}
        ListFooterComponent={
          <>
          <Offerdesign
        Head="On your First Order"
        Percentage="50"
        couponCode="New50"
        body="On spends above Rs.2000"
      />
      <Ordertotal total={total} charges={charges} />
      <View style={{alignItems: 'center'}}>
        <CustomTouchableOpacity
          title="Proceed to checkout"
          color="lightgreen"
          onPress={()=>{if(cartitems.length >0){ if(email===''||mobilenumber===''){
            Snackbar.show({
              text:"complete Profile to continue"
            })
          
          navigation.navigate('Account')}
         else{ navigation.navigate('AddressPage', {cartitems:cartitems,total:total+charges}) }}
          else {Alert.alert("Cart EMpty")}}}
        />
          
      </View>
          </>
        }
        
      />
      
    </ScrollView>
  );
};
export const Renderitems = ({item, index,updateArray,handleTotal}) => {
  const navigation = useNavigation();
  const CartCount=useSelector(state=>state.CartCount)
  const userid=useSelector(state=>state.userid)
  const [Qty, setQty] = useState(item.Qty);
  const dispatch=useDispatch()
  useEffect(() => {
    setQty(item.Qty)
  
   
  }, [item])
  

  
    const addToCart = async () => {
      await firestore()
        .collection('Cart')
        .where('userid', '==', userid)
        .where('id', '==', item.id)
        .get()
        .then(snapshot => {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              Qty: parseInt(snapshot?.docs[0].data().Qty, 10) + 1,
            });
            handleTotal('add',item)

        });
    };

  const removeitem = async () => {

    if (Qty <= 1) {
      //remove from cart
      await firestore().collection("Cart").doc(item.docid).delete().then(()=>{
        updateArray(item)
        

      })
      dispatch(updateCartCount(CartCount-1))


    } else {
      //update qty
      setQty(Qty-1)
      firestore().collection('Cart').doc(item.docid).update({
        Qty:parseInt(item.Qty,10)-1
      })
     handleTotal('minus',item)
      

    }
  };

  return (
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
            <TouchableOpacity onPress={removeitem}>
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

            <TouchableOpacity
              onPress={() => {
                setQty(Qty + 1);
                addToCart();
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: 'green'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Cart;
