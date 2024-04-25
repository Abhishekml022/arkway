import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import LoadingDots from 'react-native-loading-dots'
import LoaderKit from'react-native-loader-kit'
const Splash = () => {
  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
     <Image source={require('../../Images/Logo.png')} style={{height:300,width:300,resizeMode:'contain'}}/>
     <LoaderKit
  style={{ width: 70, height: 70 }}
  name={'BallPulse'} // Optional: see list of animations below
  color={'#faec'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
/>

    </View>
  )
}

export default Splash