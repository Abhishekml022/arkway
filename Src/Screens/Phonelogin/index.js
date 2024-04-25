import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import Customtextinput from '../../Common/Customtextinput'
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import { verifyOtp, verifyPhone } from './controller'
import { useDimesionContext } from '../../context'

const Phonelogin = () => {
  const dimension=useDimesionContext()
  const responsiveStyle=style(dimension.windowHeight,dimension.windowWidth,)
  const [Phone, setPhone] = useState('');
  const [ShowOtp, setShowOtp] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  const [Otp, setOtp] = useState(0);
  const navigation=useNavigation()
   
const press =async()=>{
  try {
    
    if(verifyPhone(Phone.trim())){
      if( Phone.length==10){

    const confirmation = await auth().signInWithPhoneNumber( '+91'+ Phone );
  if (confirmation){
    console.log(confirmation);
    setConfirm(confirmation)
    setShowOtp(true)
    Snackbar.show({
      text: 'Otp Send Successfully',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: 'red',
      textColor: '#fff',
    });

  }
    
  } 
  else{
    Snackbar.show({
      text: 'Mobile number is in invalid length',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: 'red',
      textColor: '#fff',
    });
  }
} else{
  Snackbar.show({
    text: 'Mobile number is in invalid format',
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'red',
    textColor: '#fff',
  });
}



}catch (error) {
    console.log(error);
  }
}


const handleOtp= async()=>{
  try {
    if(Otp.trim()!==''){
      if(verifyOtp(Otp.trim())){

      
      if( Otp.length==6){
      const res= await Confirm.confirm(Otp.trim())
      console.log('Response is',res);
      if(res){
      Snackbar.show({
       text: 'phone is verified',
       duration: Snackbar.LENGTH_LONG,
       backgroundColor: 'green',
       textColor: '#fff',
     });
     navigation.navigate('Login')
    }
  }
  else{
    Snackbar.show({
      text: 'Otp is 6 digits',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: 'red',
      textColor: '#fff',
    });
  }
     }
     else{
      Snackbar.show({
        text: 'Invalid format',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }
    }


     else{
       Snackbar.show({
         text: 'Pls fill all fields',
         duration: Snackbar.LENGTH_LONG,
         backgroundColor: 'red',
         textColor: '#fff',
       });
     }
  } catch (error) {
    console.log("The ERROR IS",error);
    
  }
  
}

  return (
    <View style={responsiveStyle.Container}>
        <Image source={require('../../Images/Background.jpg')}style={responsiveStyle.BgImage}resizeMode='cover'/>
        <ScrollView style={responsiveStyle.Scrollstyle}>
            <Image source={require('../../Images/Logo.png')} style={{height:90,width:200}}resizeMode='contain'/>
            <Text style={responsiveStyle.Logintext}>Login With Mobile</Text>
            <Customtextinput placeholder=" Phone Number" Type="Phone" handletext={text=>setPhone(text) }/>
           {ShowOtp?<Customtextinput placeholder='Enter Otp' Type='Phone' handletext={text=>setOtp(text)} />:null
           }
            <CustomTouchableOpacity Type='primary' title={ShowOtp?"Verify OTP":"Signup"} onPress={ShowOtp? handleOtp:press}/>
           <Text style={responsiveStyle.createnew} onPress={navigation.goBack} >Go to Login</Text>
           
          </ScrollView> 
        
    </View>
  )
}

export default Phonelogin