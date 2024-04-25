import { View, Text, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import style from './style';
import Customtextinput from '../../Common/Customtextinput';
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { emailvalidation } from '../../Common/Validations';
import Snackbar from 'react-native-snackbar';

const Signup = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '331494966383-h5nqk6hfk4vdmg9e2c4r7i1euorj6ubg.apps.googleusercontent.com',
    });
    
  }, [])
  
  const [Phone, setPhone] = useState();
  const [Password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [email,setemail]=useState('')
  const [Firstname,setFirstname]=useState('')
  const [Lastname,setLastname]=useState('')

  const [Error, setError] = useState('')
  const navigation = useNavigation();

  const handleonpress = async () => {
   
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
       
  };

  const handlesignup = async () => {

    try {
      if (email.trim()!==""&&Password.trim()!==""&&CPassword.trim()!==""&&Phone.trim()&&Firstname.trim()!==""&&Lastname.trim()!==""){
        if(Password.trim()===CPassword.trim())
      { console.log(Phone.count);
        if(Phone.length===10){
        await firestore().collection("Users").where('username','==',email.trim()).where('email','==',email.trim()).get().then(async snapshot=>{
          if(snapshot.empty){
            if(emailvalidation(email.trim())){

              const userData = {
                username: email.trim(),
                email: email.trim(),
                mobilenumber: Phone.trim(),
                password: Password.trim(),
                created: String(new Date()),
                updated: String(new Date()),
                Firstname:Firstname.trim(),
                Lastname:Lastname.trim()
              };
              await firestore()
                .collection('Users')
                .add(userData)
                .then(resp => {
                  Snackbar.show({
                    text: 'Signup Success',
                    duration: Snackbar.LENGTH_LONG,
                  });;
                  navigation.navigate('Login')
                //  console.log(resp)
                })
                .catch(err => {
                  console.warn("Error is ",err);
                });}
                else{
                  Snackbar.show({
                    text: 'Email in Invalid format',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor:'red',
                    textColor:'#fff'
                  });
                  setError('Email invalid')
                }
         
          }
          else{
            Snackbar.show({
              text: 'User Already Exists,Pls Login',
              duration: Snackbar.LENGTH_LONG,
            });
            navigation.navigate('Login')
          }
        })
      

      } else {
        Snackbar.show({
          text: 'Mobile Number must be 10digits ',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor:'red',textColor:'#fff'
        });
        setError('Mobile number not 10 digits')
      }
    
    }
      else {
        Snackbar.show({
          text: 'Password Mismatch',
          duration: Snackbar.LENGTH_LONG,
        });
        setError('Passwords Does not Match')
      }
    }
    else {
      Snackbar.show({
        text: 'Fill all fields',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor:'red',
        textColor:'#fff'
        
      });
      setError('Fill all fields')
    }
    
    
    
    
    } catch (error) {
      console.log(error, 'error');
    }

  };


  return (
    <View style={style.Container}>
      <Image
        source={require('../../Images/Background.jpg')}
        style={style.BgImage}
        resizeMode='cover'
      />
      <ScrollView style={style.Scrollstyle}>
        <Text style={{color:'red'}}>{Error}</Text>
        <Image
          source={require('../../Images/Logo.png')}
          style={{ height: 90, width: 200 }}
          resizeMode='contain'
        />
        <Text style={style.Logintext}>Signup Account</Text>
        <Customtextinput
          placeholder="First Name"
          handletext={text => setFirstname(text)}
        />
        <Customtextinput
          placeholder="Last Name"
          handletext={text => setLastname(text)}
        />
        <Customtextinput
          placeholder="Email"
          Type="email"
          handletext={text => setemail(text)}
        />
        <Customtextinput
          placeholder="Mobile Number"
          Type="Phone"
          handletext={text => setPhone(text)}
        />
        <Customtextinput
          placeholder="Password"
          Type="password"
          handletext={text => setPassword(text)}
        />
        <Customtextinput
          placeholder="Confirm Password"
          Type="password"
          handletext={text => setCPassword(text)}
        />

        <CustomTouchableOpacity
          Type='primary'
          title="Sign Up"
          onPress={handlesignup}
        />

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              borderWidth: 0.5,
              borderStyle: 'dashed',
              borderColor: 'grey',
            }}
          />
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              marginTop: -10,
              backgroundColor: '#f7ebff',
              width: 90,
              textAlign: 'center',
              elevation: -5,
              borderRadius: 2,
            }}
          >
            Or login With
          </Text>
        </View>
        <CustomTouchableOpacity
          Type='secondary'
          title="Sign up with Google"
          onPress={handleonpress}
          icon={require('../../Images/google.png')}
        />

        <Text style={style.createnew} onPress={navigation.goBack}>
          Go to Login
        </Text>

      </ScrollView>
    </View>
  );
};

export default Signup;
