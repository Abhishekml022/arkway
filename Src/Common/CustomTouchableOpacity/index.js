import {TouchableOpacity,Text, Image } from 'react-native'
import React from 'react'
import style from './style'
import { useDimesionContext } from '../../context'
import { useNavigation } from '@react-navigation/native'

const CustomTouchableOpacity = (props) => {
  const dimension=useDimesionContext()
  const responsiveStyle=style(dimension.windowHeight,dimension.windowWidth,)
    const Title=props.title
    const {Type,onPress,icon,color}=props
      //  console.log(icon)
  return (
    <TouchableOpacity style={[responsiveStyle.TouchableOpacity, {backgroundColor:(Type==='primary'?"#dcb1df":color?color:"#f3daf5")}]} onPress={onPress}>
   {Type=='secondary'?<Image source={icon} style={responsiveStyle.icon}/>:null}
        <Text style={{color :Type==='primary'?"#000":'#000',fontFamily:Type==='primary'?"Poppins-Black":'Poppins-SemiBold',fontSize:Type==='primary'?27:20}} >{Title} </Text>
    </TouchableOpacity>
  )
}

export default CustomTouchableOpacity