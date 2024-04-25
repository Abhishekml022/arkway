import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import { useDimesionContext } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { updateCartCount } from '../../storage/actions';
const CustomBottomTab = ({state, descriptors, navigation}) => {
  const dimension=useDimesionContext()
  const responsiveStyle = style(dimension.windowHeight,dimension.windowWidth,dimension.isPortrait)

  const CartCount=useSelector(state=>state.CartCount)
  const userid=useSelector(state=>state.userid)

  const dispatch=useDispatch()

 useEffect(() => {
  callcart();
 }, [])
 
  const callcart = async () => {
    firestore()
      .collection('Cart')
      .where('userid', '==', userid)
      .get()
      .then(snapshot => {
        dispatch(updateCartCount(snapshot.size))

      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={responsiveStyle.container }>
      {state.routes.map((route, index) => {
      const isfocussed=state.index===index
        const icon =
          route.name === 'Home'
            ? require('../../Images/home-white.png')
            : route.name === 'Categories'
            ? require('../../Images/category.png')
            : route.name === 'Search'
            ? require('../../Images/Search.png')
            : route.name === 'Offers'
            ? require('../../Images/Offers.png')
            : require('../../Images/Cart.png');

        return (
          <TouchableOpacity onPress={()=>navigation.navigate(route.name)}
            key={index}
            style={responsiveStyle.touchable}>
              {route.name=='Cart'?
            <View style={responsiveStyle.cartcount}>
              <Text style={{color:'#fff',fontWeight:'800'}}> {CartCount}</Text>
              
              </View>   :null}           
            <Image
              style={responsiveStyle.icon}
              source={icon}
            />
            <Text style={responsiveStyle.route}>
              {route.name}
            </Text>
             {isfocussed? <Text style={responsiveStyle.dot}>. </Text>:false}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;
