import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
// prop data = name,description,percentage,price,image path with require, delete to show delete icon

const Productdisplay = props => {
  console.log("props are here",props);
  const data = props;
  // console.warn("Data is",data);
  const [count, setcount] = useState(0);
  // console.warn('log ie',data);
  const navigation = useNavigation();
  useEffect(() => {
    qtychange();
  }, [count]);

  // console.warn(data.Id);
  const qtychange = async () => {
    firestore()
      .collection('Cart')
      .doc(data.Id)
      .update({Qty: count})
      .then(() => {
        // console.warn('qty updated');
        Snackbar.show({
          text:'Qty Updated'        })
      });
  };

  return (
    <TouchableOpacity
      style={{alignItems: 'center', elevation: 5}}
      onPress={() => {
        navigation.navigate('Productpage', {product: data});
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
          source={data.Url ? {uri: data.Url} : data.imagepath}
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
            {data.Name}
          </Text>
          <Text style={{textAlign: 'justify', width: 150}} numberOfLines={2}>
            {data.Description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}></View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
              ₹ {data.Price}
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
              <Text style={{color: '#000'}}>{data.Percentage} %</Text>
            </View>
            <View></View>
          </View>

          {data.delete ? (
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'lightgreen',
                borderRadius: 15,
                padding: 5,
                backgroundColor: '#ffd',
                marginVertical: 15,
                maxWidth: 110,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: 'green',
                  }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
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
              <TouchableOpacity onPress={() => setcount(count - 1)}>
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
                {count}
              </Text>

              <TouchableOpacity onPress={() => setcount(count + 1)}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 30, color: 'green'}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {data.delete ? (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              width: 30,
              height: 30,
              marginTop: -20,
              marginLeft: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../Images/delete.png')}
              style={{height: 20, width: 20, resizeMode: 'cover'}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Productdisplay;
