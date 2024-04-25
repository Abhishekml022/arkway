import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonSectionHeader from '../CommonSectionHeader';
import firestore from '@react-native-firebase/firestore';
import {
  useNavigation,
  useRoute,
  useScrollToTop,
} from '@react-navigation/native';
import {scrollTo} from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';

const Productscroll = props => {
  const Return = [];
  const [Products, setProducts] = useState('');


  const {isnavigationneeded} = props;
  useEffect(() => {
    callproducts();
  }, []);

  const handleadd = async item => {
    await firestore()
      .collection('Cart')
      .where('Name', '==', item.Name)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('Cart')
            .add({qty: 1, ...item})
            .then(resp => {
              Snackbar.show({
                text: 'Added to cart',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: '#fff',
              });
            });
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

  const callproducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
        } else {
          snapshot.forEach(doc => {
            if (doc.exists) {
              const response = {id: doc.id, ...doc?.data()};

              Return.push(response);
            }
            setProducts(Return);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.warn(route.params);

  return (
    <View style={{padding: 9, backgroundColor: '#faf9f6'}}>
      <CommonSectionHeader
        head={'Newly added'}
        content={'Buy more for less'}
        rtext={'See more'}
        path={'UserReview'}
      />
      <View>
        <FlatList
          data={Products}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(key, index) => String(index)}
          horizontal
          renderItem={({item, index}) => (
            <Renderitems
              item={item}
              index={index}
              isnavigationneeded={isnavigationneeded}
            />
          )}
          // renderItem={({item, index}) => {
          //  console.warn('Item is',item);

          // }}
        />
      </View>
    </View>
  );
};

export const Renderitems = ({item, index, isnavigationneeded}) => {
  const navigation = useNavigation();

  const wishid = useSelector(state => state.wishid);
  const userid = useSelector(state => state.userid);
  const CartCount = useSelector(state => state.CartCount);


  const [wishlist, setwishlist] = useState(false);
  const [showbtn, setshowbtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
    chkwishlist(item)
      
    }, 5000);
  
   
  }, [])
  const chkwishlist=()=>{
  wishid.includes(item.id) ? setwishlist(true) : setwishlist(false);
  }
  const route = useRoute();
  // console.warn('wishid is', wishid);
  const handlewishlist = item => {
    if (wishlist) {
      // console.warn("truth");
      firestore()
        .collection('Wishlist')
        .where('userid', '==', userid)
        .where('id', '==', item.id)
        .get()
        .then(querysnapshot => {
          querysnapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              Snackbar.show({
                text: 'Item Removed from wishlist',
              });
            });
            setwishlist(false);
          });
        });
    } else {
      firestore()
        .collection('Wishlist')
        .add({...item, userid: userid})
        .then(resp => {
          Snackbar.show({text:"product added in wishlist"})
                 });
      setwishlist(true);
    }
  };
  const handleproduct = item => {
    if (route.name === 'Productpage') {
      isnavigationneeded(true, item);
     
    } else navigation.navigate('Productpage', {product: item});
  };
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        backgroundColor: '#faf9f6',
        borderRadius: 15,
        width: 150,
        height: 250,
        padding: 15,
        marginRight: 15,
        marginVertical: 15,
        borderWidth: 1.25,
        borderColor: 'lightgreen',
      }}
      onPress={() => handleproduct(item)}>
      <TouchableOpacity onPress={() => handlewishlist(item)}>
        {wishlist == false ? (
          <Image
            source={require('../../Images/wishlist-outline.png')}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              alignSelf: 'flex-end',
            }}
          />
        ) : (
          <Image
            source={require('../../Images/wishlist-red.png')}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              alignSelf: 'flex-end',
            }}
          />
        )}
      </TouchableOpacity>

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
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          color: '#000',
          fontSize: 15,
          alignSelf: 'center',
        }}>
        {item.Name}
      </Text>
      <Text style={{textAlign: 'center'}} numberOfLines={2}>
        {item.Description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'green',
            marginLeft: 15,
          }}>
          Rs.{item.Price}
        </Text>

        {showbtn ? (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: 'lightgreen',
              borderRadius: 5,
              marginLeft: 5,
            }}
            onPress={() => handleadd(item)}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>
              added to cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: 'lightgreen',
              borderRadius: 5,
              marginLeft: 5,
            }}
            onPress={() => handleadd(item)}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Productscroll;
