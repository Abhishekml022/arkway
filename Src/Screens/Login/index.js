import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import Customtextinput from '../../Common/Customtextinput';
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import {emailvalidation} from '../../Common/Validations';
import {useDimesionContext} from '../../context';
import { useDispatch } from 'react-redux';
import { login } from '../../storage/actions';

const Login = () => {
  const dispatch = useDispatch();;
  const dimension = useDimesionContext();
  const responsiveStyle = style(dimension.windowHeight, dimension.windowWidth);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Modalvisible, setModalvisible] = useState(false);
  const navigation = useNavigation();

  const handleNav = path => {
    navigation.navigate(path);
  };

  const handlePress = async () => {
    // console.log(profileImage);

    if (Username.trim() !== '' && Password.trim() !== '') {
      if (emailvalidation(Username.trim())) {
        await firestore()
          .collection('Users')
          .where('username', '==', Username.trim().toLocaleLowerCase())
          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              Snackbar.show({
                text: 'You are Not a Registered User, Please Signup to Continue',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: '#fff',
              });
            } else {
              snapshot.forEach(documentSnapshot => {
                const respData = documentSnapshot.data();
              
                if (respData.password === Password.trim()) {
                  Snackbar.show({
                    text: 'Login Success for ' + respData.email,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                    textColor: '#fff',
                  });

                 
                 
                 try {
                  dispatch(
                    login({
                      firstname: respData.Firstname,
                      lastname: respData.Lastname,
                      email: respData.email,
                      mobilenumber:respData.mobilenumber,
                      userid:documentSnapshot.id,
                      profileImage:respData.ProfileImage
                    }),
                  );
                 
                 } catch (err) {
                  console.log(err);
                 } 
                  // navigation.navigate("AppDrawer")
                } else {
                  Snackbar.show({
                    text: 'Password invalid for user ' + respData.email,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                    textColor: '#fff',
                  });
                }
              });
            }
          }); ////end for async
        // navigation.navigate(path)
      } else {
        Snackbar.show({
          text: 'Invalid Email FOrmat',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
          textColor: '#fff',
        });
      }
    } else {
      Snackbar.show({
        text: 'Pls FIll all Fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
        textColor: '#fff',
      });
    }
  };
  return (
    <View style={responsiveStyle.Container}>
      <Image
        source={require('../../Images/Background.jpg')}
        style={responsiveStyle.BgImage}
        resizeMode="cover"
      />
      <ScrollView style={responsiveStyle.Scrollstyle}>
        <Image
          source={require('../../Images/Logo.png')}
          style={{height: 90, width: 200}}
          resizeMode="contain"
        />
        <Text style={responsiveStyle.Logintext}>Login Account</Text>
        <Customtextinput
          placeholder="Enter your Email"
          Type="email"
          handletext={text => setUsername(text)}
        />
        <Customtextinput
          placeholder="Enter your Password"
          Type="password"
          handletext={text => setPassword(text)}
        />
        <CustomTouchableOpacity
          Type="primary"
          title="Login"
          onPress={handlePress}
        />
        <Text
          style={responsiveStyle.createnew}
          onPress={() => handleNav((path = 'Signup'))}>
          If you are new, create Here
        </Text>
        <View style={{marginTop: 5}}>
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
            }}>
            Or login With
          </Text>
        </View>
        <CustomTouchableOpacity
          Type="secondary"
          title="Sign in with Phone"
          onPress={() => handleNav((path = 'Phonelogin'))}
          icon={require('../../Images/smartphone.png')}
        />
        <CustomTouchableOpacity
          Type="secondary"
          title="Sign in with Google"
          onPress={''}
          icon={require('../../Images/google.png')}
        />
      </ScrollView>
      <View
        style={{alignItems: 'center', margin: 0, backgroundColor: '#f7ebff'}}>
        <CustomTouchableOpacity
          Type="tertiary"
          title="Or login as a Guest"
          icon={false}
        />
      </View>
    </View>
  );
};

export default Login;
