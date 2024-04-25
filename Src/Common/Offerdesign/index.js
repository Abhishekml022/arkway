import {View, Text, Dimensions} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Offerdesign = ({Percentage,couponCode,Head,body}) => {
  return (
    <TouchableOpacity style={{alignSelf:'center',marginVertical:10}} onPress={()=>console.log(Head)} > 
      <View //vereview
        style={{
          flexDirection: 'row',
          alignItems:'center',width:Dimensions.get('screen').width,
          justifyContent:'center'
        
        }}>
           
        <View style={{marginRight:-22/2,zIndex:99}}>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          </View>
     

        <View style={{width:"68%",backgroundColor:'#dec',height:125,padding:6,marginLeft:5,alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center',marginRight:-10}}>
    <Text style={{fontSize:50,fontFamily:'Poppins-Bold',color:'#000'}}>{Percentage}</Text>
    <View style={{alignSelf:'flex-start',marginTop:15}}>
    <Text style={{fontSize:19,color:'#000'}}>%</Text>
    <Text style={{fontSize:14,color:'#000'}}>OFF</Text>
    </View>
    <View style={{alignItems:'stretch',justifyContent:'center',marginTop:-10,maxWidth:150,overflow:'hidden'}}>
        <Text style={{fontSize:21, fontWeight:'800',color:'#000',marginLeft:10,textAlign:'center' }} numberOfLines={2}>{Head}</Text>
        <Text style={{fontSize:12, fontWeight:'500',color:'#000',marginLeft:10}}>{body}</Text>
        
        </View>
    
    </View> 
          </View>
          
          <View style={{justifyContent:'space-between',height:125,backgroundColor:'#dec'}}>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
              marginTop:-25/2
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
              marginBottom:-25/2

            }}
          />
          </View>
          <View style={{width:"22%",backgroundColor:'#dec',height:125,alignItems:'flex-start',justifyContent:'center'}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:15,color:'#000',marginBottom:5}}>Use Code</Text>
                <TouchableOpacity style={{backgroundColor:'green',borderRadius:10,padding:5}}>
                <Text style={{ color:'#fff'}}>{couponCode}</Text>
                </TouchableOpacity>

            </View>
          </View>
       




        <View style={{marginLeft:-25/2}}>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#fff',
              borderRadius: 12.5,
            }}
          />
          </View>
      </View>
    </TouchableOpacity>
  );
};

export default Offerdesign;
