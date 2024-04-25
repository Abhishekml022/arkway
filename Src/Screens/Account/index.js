import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Customtextinput from '../../Common/Customtextinput';
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
import {emailvalidation} from '../../Common/Validations';
import Snackbar from 'react-native-snackbar';
import {verifyPhone} from '../Phonelogin/controller';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateprofile} from '../../storage/actions';
import { updateprofileimage } from './controller';


const Account = () => {
  const [visible, setvisible] = useState(false);
  const [editvisible, seteditvisible] = useState(false);
 
  const email=useSelector(state=>state.email)
  const mobilenumber=useSelector(state=>state.mobilenumber)
  const firstname=useSelector(state=>state.firstname)
  const lastname=useSelector(state=>state.lastname)
  const profileImage=useSelector(state=>state.profileImage)
  const userid=useSelector(state=>state.userid)
  const [profilepic, setprofilepic] = useState(profileImage);

  const [fname, setfname] = useState(firstname);
  const [lname, setlname] = useState(lastname);
  const [mail, setmail] = useState(email);
  const [phone, setphone] = useState(mobilenumber);
  const [editabletext, seteditabletext] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    seteditabletext(false);
  }, [handlebutton]);

  const handleimage = ()  => {
    setvisible(!visible);
  }
  const handlebutton = async () => {
    try {
      
    
    if (emailvalidation(mail.trim())) {
      if (verifyPhone(phone) && phone.length == 10) {
        if (fname.trim() != '') {
          if (lname.trim() != '') {
            let newurl=profileImage
// console.log("hello");
// console.warn('Profile pic',profilepic);
            if (profilepic!==''){
              newurl=await updateprofileimage(profilepic);
// console.log(newurl);
            }
            await firestore()
              .collection('Users')
              .doc(userid)
              .update({
                email: email.trim(),
                mobilenumber: phone.trim(),
                updated: String(new Date()),
                Firstname: fname.trim(),
                Lastname: lname.trim(),
                ProfileImage:newurl
              })
              .then(() => {
                seteditabletext(false);
                dispatch(
                  updateprofile({
                    firstname: fname,
                    lastname: lname,
                    email: email,
                    mobilenumber: mobilenumber,
                    profileImage: newurl

                  }),
                  setprofilepic(newurl)
                 
                );
                Snackbar.show({
                  text: ' Updated Profile details',
                });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            Snackbar.show({
              text: ' last name is not',
            });
          }
        } else {
          Snackbar.show({
            text: ' First name is not',
          });
        }
      } else {
        Snackbar.show({
          text: 'Invalid mobile format',
        });
      }
   
    } else {
      Snackbar.show({
        text: 'Invalid mail format',
      });
    }
  } catch (error) {
      
  }
  };

  const hanldegallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
       
        setprofilepic(image.path);
        seteditvisible(false);
      })
      .catch(err => {
        seteditvisible(false);
        console.log(err);
      });
  };
  const handlecamera = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        seteditvisible(false);
        console.log(image);
        setprofilepic(image.path);
      })
      .catch(err => {
        console.log(err);
        seteditvisible(false);
      });
  };
  const handleeditpress = () => {
    seteditvisible(true);
  };

  return (
    <View style={{padding: 10}}>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 24,
          color: '#000',
          alignSelf: 'center',
        }}>
        {firstname} {lastname}
      </Text>
      <TouchableOpacity onPress={handleimage}>
        <Image
          source={
            profilepic===''?
              profileImage===''
                ? require('../../Images/dummydp.png')
                :{uri:profileImage} 
                :{uri:profilepic} 
            

          }
          style={{
            height: 150,
            width: 150,
            resizeMode: 'cover',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 75,
          }}></Image>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        onPress={handleeditpress}>
        <Image
          source={require('../../Images/edit.png')}
          style={{
            position: 'absolute',
            height: 40,
            width: 40,
            resizeMode: 'cover',
            right: -70,
            top: -35,
          }}></Image>
      </TouchableOpacity>
      <View style={{width: 323, alignSelf: 'center'}}>
        <Customtextinput
          placeholder="First Name"
          colortype="normal"
          handletext={text => setfname(text)}
          dvalue={fname}
          editable={editabletext}
        />
        <Customtextinput
          placeholder="Last Name"
          colortype="normal"
          handletext={text => setlname(text)}
          dvalue={lname}
          editable={editabletext}
        />

        <Customtextinput
          Type="email"
          placeholder="Enter email"
          colortype="normal"
          handletext={text => setmail(text)}
          dvalue={mail}
          editable={editabletext}
        />
        <Customtextinput
          Type="Phone"
          placeholder="Mobile Number"
          colortype="normal"
          handletext={number => setphone(number)}
          dvalue={phone}
          editable={editabletext}
        />
        {editabletext ? (
          <CustomTouchableOpacity
            color="lightgreen"
            title="Update profile"
            onPress={handlebutton}
          />
        ) : (
          <CustomTouchableOpacity
            color="lightgreen"
            title="Edit Profile"
            onPress={() => seteditabletext(!editabletext)}
          />
        )}
      </View>

      <Dialog
        visible={editvisible}
        dialogTitle={<DialogTitle title="Choose Image from" />}>
        <DialogContent>
          <View
            style={{
              flexDirection: 'row',
              width: 250,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={handlecamera}>
                <Image
                  source={require('../../Images/camera.png')}
                  style={{height: 35, width: 35, resizeMode: 'contain'}}
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontWeight: '800',
                    marginTop: 5,
                  }}>
                  {' '}
                  Open Camera
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={hanldegallery}>
                <Image
                  source={require('../../Images/gallery.png')}
                  style={{height: 35, width: 35, resizeMode: 'contain'}}
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontWeight: '800',
                    marginTop: 5,
                  }}>
                  {' '}
                  Open Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DialogContent>
      </Dialog>

      <Modal
        visible={visible}
        onRequestClose={() => setvisible(false)}
        transparent>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}
            onPress={() => setvisible(false)}>
            <Image
              source={require('../../Images/close.png')}
              style={{
                height: 40,
                width: 40,
                top: 10,
                resizeMode: 'cover',
              }}></Image>
          </TouchableOpacity>
          <Image
            source={
              profilepic===''?
              profileImage===''
                ? require('../../Images/dummydp.png')
                :{uri:profileImage} 
                :{uri:profilepic} 
            }
            style={{
              height: 500,
              width: 350,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 10,
            }}></Image>
        </View>
      </Modal>
    </View>
  );
};

export default Account;
