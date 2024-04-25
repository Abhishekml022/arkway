import { View, Text, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import Customtextinput from '../../Common/Customtextinput';
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();

  const handlePress = () => {
  };

  const handlesignup = async () => {
// console.log(user);
    // console.log('pressed')
    try {
      const userData = {
        username: 'abc',
        email: 'abc@gmail.com',
        mobilenumber: 9755634563,
        password: 'abc',
        created: String(new Date()),
        updated: String(new Date()),
      };
      await firestore()
        .collection('Users')
        .add(userData)
        .then(resp => {
          // console.warn(resp, 'User');
        })
        .catch(err => {
          console.warn("Error is ",err);
        });
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
        <Image
          source={require('../../Images/Logo.png')}
          style={{ height: 90, width: 200 }}
          resizeMode='contain'
        />
        <Text style={style.Logintext}>Signup Account</Text>
        <Customtextinput
          placeholder="Enter your Email"
          Type="email"
          handletext={text => setUsername(text)}
        />
        <Customtextinput
          placeholder="Enter your Mobile Number"
          Type="Phone"
          handletext={text => setPassword(text)}
        />
        <Customtextinput
          placeholder="Enter your Password"
          Type="password"
          handletext={text => setPassword(text)}
        />
        <Customtextinput
          placeholder="Confirm your Password"
          Type="password"
          handletext={text => setPassword(text)}
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
          onPress={() => handlePress(path = 'Google')}
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
