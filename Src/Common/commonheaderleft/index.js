import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HeaderLeft = props => {
    const navigation=useNavigation()
  return  (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={props.Type=='back'? require('../../Images/back.png') : require('../../Images/category.png')}
            style={{height: 25, width: 20, marginLeft: 10,resizeMode:'contain'}}
          />
        </TouchableOpacity>
      )
}

export default HeaderLeft