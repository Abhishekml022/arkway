import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import { useDimesionContext } from '../../context';

const Customtextinput = props => {
  const {colortype,handletext,placeholder,Type,dvalue,edit,editable} = props;
  const dimension=useDimesionContext()
  const responsiveStyle=style(dimension.windowHeight,dimension.windowWidth,props.colortype)
  
  const [show, setshow] = useState(false);
  const keyboardType =
    Type === 'email'
      ? 'email-address'
      : Type === 'Number'
      ? 'numeric'
      : Type === 'Phone'
      ? 'numeric': 
      Type === 'Otp'
      ? 'numeric':'default';
  const secureTextEntry = Type === 'password' ? (show ? false : true) : false;
  const maxLength = Type === 'Phone'? 10:Type === 'Otp'? 6:null
  const icon =
    Type === 'email'
      ? require('../../Images/email.png')
      : Type === 'password'
      ? (show
          ? require('../../Images/show.png')
          : require('../../Images/hide.png'))
      : false;
  const handlepassword = () => {
    setshow(!show);
  };
  return (
    <View style={[responsiveStyle.container]}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={responsiveStyle.TextInput}
        placeholderTextColor={'#000'}
        secureTextEntry={secureTextEntry}
        onChangeText={handletext}
        defaultValue={dvalue}
        onEndEditing={edit}
        editable={editable}
        
        maxLength={maxLength}></TextInput>
      <TouchableOpacity
        onPress={handlepassword} 
        disabled={Type !== 'password' ? true : false}>
      {Type!=='primary'?  <Image source={icon} style={responsiveStyle.Image} /> :false}
      </TouchableOpacity>
    </View>
  );
};

export default Customtextinput;
