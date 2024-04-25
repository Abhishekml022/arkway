import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import Icon from 'react-native-vector-icons/Entypo'


const ExtraInfo = () => {
    
const SECTIONS=[{
    title:'Manufacture Details',
    description:'This is manufactures at the worlds best hill stations, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    title:'Product Policy',
    description:'Ready to eat, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},

{
    title:'Specifications',
    description:'Ready to eat, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}

]

const [curractivesession,setcurractivesession]=useState('')


const _renderHeader=(section)=>{
    return(
        <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:5,borderBottomWidth:1,borderColor:'#000'}}>
                     <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>{section.title}</Text>
                     <Icon name='chevron-down' size={24} /> 

        </View>
    )
}

const _renderContent=(section)=>{
    return(
        <View style={{marginVertical:5,borderBottomWidth:1,borderColor:'#000',paddingBottom:7,overflow:'scroll'}}>
            <Text style={{textAlign:'justify',lineHeight:18,color:'#000'}}>{section.description}</Text>

        </View>
    )
}

const _updateSections=(activeSections)=>{
setcurractivesession(activeSections)
}



  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={curractivesession}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor='transparent'
      />
    </View>
  )
}

export default ExtraInfo