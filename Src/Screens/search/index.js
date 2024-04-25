import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomSearchBar from '../../Common/CustomSearchbar'
import style from './style'
import { useDimesionContext } from '../../context'
import Trending from '../../Common/Trending'
import OfferProducts from '../../Common/Offerproducts'

const Search = () => {
  dimension=useDimesionContext()
  const responsivestyle=style(dimension.windowHeight,dimension.windowWidth,dimension.isPortrait)
  return (
    <ScrollView style={responsivestyle.container}>
      <CustomSearchBar/>
      <Trending/>
      <OfferProducts/>
    </ScrollView>
  )
}

export default Search