import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'
import CommonSectionHeader from '../CommonSectionHeader'

const UserReview = (props) => {
  // console.warn('The props are',props);
    const [rating, setrating] = useState(0)
  return (
    <View>
<CommonSectionHeader head={'User Reviews(1)'} rtext={'See all'} path='UserReview' product={props.product}/>
    <View style={{backgroundColor:'#ded',borderRadius:20,padding:15}}>
        
    

        <View style={{flexDirection:'row',marginBottom:10}}>
            <Image source={require('../../Images/dummydp.png')} style={{height:50,width:50,resizeMode:'contain'}}/>
            
            <View>
                
        <Text style={{fontSize:18,color:'#000',fontWeight:'bold'}}>UserReview</Text>
        <StarRating rating={rating} onChange={setrating} starSize={25} enableSwiping={true} maxStars={4} color='red'/>

        </View>

        </View>
        <Text style={{textAlign:'justify',lineHeight:18,color:'#000'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
    </View>
      
    </View>

  )
}

export default UserReview