import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Share,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import Accordion from 'react-native-collapsible/Accordion';
import ExtraInfo from '../../Common/extradetail';
import UserReview from '../../Common/userreviev';
import Delivery from '../../Common/delivery';
import Productscroll from '../../Common/productscroll';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../../storage/actions';
import Snackbar from 'react-native-snackbar';
const {height, width} = Dimensions.get('screen');
const Productpage = () => {
  const navigation = useNavigation();
  const [wishlist, setwishlist] = useState(false);
  const [visible, setvisible] = useState(false);

  const chkwishlist=()=>{
  wishid.includes(Productdetailsobj.id) ? setwishlist(true) : setwishlist(false);
  }


  const route = useRoute();
  const {product} = route.params;
  const [Productdetailsobj, setProductdetails] = useState({});
  const [Count, setCount] = useState(0);
  const dispatch=useDispatch()
const CartCount=useSelector(state=>state.CartCount)
const userid=useSelector(state=>state.userid)
const wishid=useSelector(state=>state.wishid)

  useEffect(() => {
  
    chkwishlist(Productdetailsobj)
   
  }, [Productdetailsobj])

const shareitem=async()=>{

      const result = await Share.share({
        message:"Look at this"+' '+Productdetailsobj.Name
        
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
     
  };

  const addtocart = async () => {
    const itemdata = {
      ...Productdetailsobj,
      Qty: Count,
      Created: String(Date()),
      userid:userid,
      
    };
  
    firestore()
      .collection('Cart')
      .where('Name', '==', Productdetailsobj.Name)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
        
          firestore()
            .collection('Cart')
            .add(itemdata)
            .then(resp => {
Snackbar.show({text:'Product added in cart'})
            });
          dispatch(updateCartCount(CartCount+1))

        } else {
         
          firestore().collection('Cart').doc(snapshot?.docs[0].id).update({
            Qty: Count,
          });
        }
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: product.name,
    });
  }, []);

  useEffect(() => {
    setProductdetails(product);
  }, [product]);

  useEffect(() => {
    scrollref.current.scrollTo({x: 0, y: 0, animated: false});
  }, [product]);

  const navigationneeded = (val, item) => {
    if (val) {
      setProductdetails(item);
      scrollref.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };
  const handlewishlist = () => {
    const itemdata = {
      ...Productdetailsobj,
      Created: String(Date()),
      userid:userid,
      
    };
    if(wishlist){
      firestore().collection("Wishlist").where('userid','==',userid).where('id','==',Productdetailsobj.id).get().then(querysnapshot=>{
        querysnapshot.forEach(doc=>{
          doc.ref.delete().then(()=>{
            Snackbar.show({
              text:'Item Removed from wishlist'
            })
          })
          setwishlist(false)
        })
      })
  }
else{
firestore()
            .collection('Wishlist')
            .add(itemdata)
            .then(resp => {
Snackbar.show({text:"Product added in cart"})
           
            });
    setwishlist(true);
}
  }
  const [selected, setSelected] = useState('');
  const [delivery, setdelivery] = useState('');

  // console.warn(selected);
  const data = [
    {key: '1', value: '500 gm'},
    {key: '2', value: '1 Kg'},
    {key: '3', value: '2 Kg'},
  ];
  const deldata = [
    {key: '1', value: 'Standard'},
    {key: '2', value: 'Express'},
    {key: '3', value: 'Lightning'},
  ];
  const scrollref = useRef(null);

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollref}>
        <View style={{marginTop: 5, paddingBottom: 150}}>
          <View
            style={{
              height: height * 0.4,
              width: width,
              backgroundColor: '#eee',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                top: 0,
                padding: 2,
                borderColor: '#000',
                right: 10,
                elevation: 5,
                shadowColor: 'transparent',
              }}
              onPress={handlewishlist}>
              {wishlist == false ? (
                <Image
                  source={require('../../Images/wishlist-outline.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../../Images/wishlist-red.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setvisible(true)}>
              <Image
                source={{uri: Productdetailsobj.Url}}
                style={{
                  height: height * 0.3,
                  width: width * 0.9,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                top: 50,
                padding: 5,
                borderColor: '#000',
                right: 10,
                elevation: 5,
                shadowColor: 'transparent',
              }}
              onPress={shareitem}>
              <Image
                source={require('../../Images/share.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#fff',
              padding: 10,
              top: -10,
            }}>
            <Text
              style={{fontFamily: 'Poppins-Bold', fontSize: 35, color: '#000'}}>
              {Productdetailsobj?.Name}
            </Text>

            <Text style={{fontSize: 25, color: '#000', fontWeight: 'bold'}}>
              ₹ {Productdetailsobj?.Price}
            </Text>

            <Text>{Productdetailsobj?.Description}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                overflow: 'hidden',
                marginVertical: 10,
                marginHorizontal: 5,
              }}>
              <SelectList
                boxStyles={{width: 150, backgroundColor: 'lightgreen'}}
                dropdownItemStyles={{width: 150}}
                inputStyles={{
                  width: 100,
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: 16,
                }}
                dropdownStyles={{backgroundColor: '#eee'}}
                setSelected={val => setSelected(val)}
                data={data}
                search={false}
                placeholder="Quantity"
                save="value"
              />
              <SelectList
                boxStyles={{width: 150, backgroundColor: 'lightgreen'}}
                dropdownItemStyles={{width: 150}}
                inputStyles={{
                  width: 100,
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: 16,
                }}
                dropdownStyles={{backgroundColor: '#eee'}}
                setSelected={val => setdelivery(val)}
                search={false}
                data={deldata}
                save="value"
                placeholder="Delivery Time"
              />
            </View>
            <ExtraInfo />
            <UserReview product={Productdetailsobj} />
            <Delivery />
            <Productscroll isnavigationneeded={navigationneeded} />
          </View>

          <Modal
            visible={visible}
            onRequestClose={() => setvisible(false)}
            transparent>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}
                onPress={() => setvisible(false)}>
                <Image
                  source={require('../../Images/close.png')}
                  style={{
                    height: 40,
                    width: 40,
                    top: 10,
                    resizeMode: 'cover',
                  }}></Image>
              </TouchableOpacity>
              <Image
                source={{uri: product.Url}}
                style={{
                  height: 500,
                  width: 350,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: 10,
                }}></Image>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'lightgreen',
          width: width * 0.95,
          height: width * 0.2,
          marginBottom: 10,
          alignSelf: 'center',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row',backgroundColor:'#fff', padding:5,borderRadius:10}}>
          <TouchableOpacity
            onPress={() => {
              setCount(Count - 1);
            }}>
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
            {Count}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setCount(Count + 1);
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: 'green'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontFamily: 'Poppins-Bold',
            fontSize: 19,
            color: '#fff',
          }}
          onPress={addtocart}>
          Add to Cart
        </Text>
      </View>
    </View>
  );
};

export default Productpage;
