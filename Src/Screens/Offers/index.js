import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomSearchBar from '../../Common/CustomSearchbar'
import style from './style'
import { useDimesionContext } from '../../context'
import OfferProducts from '../../Common/Offerproducts'
import Trending from '../../Common/Trending'
import Offerdesign from '../../Common/Offerdesign'

const Offers = () => {
  dimension=useDimesionContext()
  const responsivestyle=style(dimension.windowHeight,dimension.windowWidth,dimension.isPortrait)
  return (
    <ScrollView style={responsivestyle.container}>
      <CustomSearchBar/>
<Offerdesign Percentage='41' couponCode="Xmym" Head='Raining Offers' body='On spends Above 799'/>
<Offerdesign Percentage='50' couponCode="wow50" Head='Beat the Trend' body='On spends Above 499'/>
<Offerdesign Percentage='75' couponCode="75aav" Head='Blockbuster Offers' body='On spends Above 1499'/>
<Offerdesign Percentage='41' couponCode="Xmym" Head='Raining Offers' body='On spends Above 799'/>
<Offerdesign Percentage='50' couponCode="wow50" Head='Beat the Trend' body='On spends Above 499'/>
<Offerdesign Percentage='75' couponCode="75aav" Head='Blockbuster Offers' body='On spends Above 1499'/>





    </ScrollView>
  )
}

export default Offers