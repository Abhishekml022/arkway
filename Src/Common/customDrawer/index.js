import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../storage/actions';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
 
    const email=useSelector(state=>state.email)
    const profileImage=useSelector(state=>state.profileImage)
    const firstname=useSelector(state=>state.firstname)
    const lastname=useSelector(state=>state.lastname)
  
  const buttonaction=()=>{
    dispatch(
      signout({})
    )
    
  }
  const content = [
    {
      ItemId: 0,
      ItemName: 'Home',
      Navigate_to: 'Footer',
      icon: require('../../Images/home-white.png'),
    },
    {
      ItemId: 1,
      ItemName: 'Shop By Category',
      Navigate_to: 'Categories',
      icon: require('../../Images/category.png'),
    },
    {
      ItemId: 2,
      ItemName: 'Orders',
      Navigate_to: 'Orders',
      icon: require('../../Images/Orders.png'),
    },
    {
      ItemId: 3,
      ItemName: 'Your Wishlist',
      Navigate_to: 'Wishlist',
      icon: require('../../Images/Wishlist.png'),
    },
    {
      ItemId: 4,
      ItemName: 'Your Account',
      Navigate_to: 'Account',
      icon: require('../../Images/Account.png'),
    },
  ];
  return (
    <ScrollView style={{marginVertical: 20, margin: 10, overflow: 'hidden'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          margin: 1,
          borderBottomColor: '#000',
          borderBottomWidth: 1,paddingBottom:15
        }} onPress={()=>navigation.navigate('Account')}>
        <View
          style={{
            backgroundColor: '#faf9f6',
            height: 90,
            width: 90,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
            overflow:'hidden'
          }}>
          <Image source={{uri:profileImage}}  style={{height:100,width:100}}/>
        </View>

        <View
          style={{
            // alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            marginLeft: 20,
            width: '60%',
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 800}}>
            {firstname} {lastname}
          </Text>
          <Text style={{color: '#000'}}>{email}</Text>

        </View>
      </TouchableOpacity>

      {content.map((Item, index) => {
        return (
          <TouchableOpacity
            key={Item.ItemId}
            style={{marginVertical: 14}}
            onPress={() => navigation.navigate(Item.Navigate_to)}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={Item.icon} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      paddingBottom: 10,
                      fontWeight: '800',
                      marginHorizontal: 10,
                    }}>
                    {Item.ItemName}
                  </Text>
                </View>

                <Image
                  source={require('../../Images/arrow-right.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={{
          height: 50,
          width: 250,
          borderWidth: 1,
          backgroundColor: '#eb5c52',
          borderRadius: 30,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }} onPress={buttonaction}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 800}}>
          Logout
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#c6f7db',
          height: 180,
          width: '100%',
          padding: 10,
          borderRadius: 30,
          marginVertical: 15,
        }}>
        <Text style={{fontSize: 19, fontWeight: 'bold', color: '#000'}}>
          Contact Support
        </Text>

        <Text
          style={{
            marginVertical: 10,
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'justify',
            lineHeight: 20,
          }}> If you have any problem with the app, feel free to contact our 24 hour support system
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: 220,
            borderWidth: 1,
            backgroundColor: '#76e8a8',
            borderRadius: 30,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: 800}}>
            Contact Support
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomDrawer;
