import { View, Text, FlatList, Image, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Octicons'
import firestore from '@react-native-firebase/firestore'
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget'
import ActionSheet from 'react-native-actions-sheet'
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity'
import { useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'

const UserReview = props => {
    
    

    const data={...props}
    const product=data.route.params.product
    // console.warn(product);
    const [Reviews, setReviews] = useState(null)
    const[content,setcontent]= useState('')
    useEffect(() => {
      navigation.setOptions({
        headerRight:  () => (
            <View style={{marginRight:15}}>
                <TouchableOpacity onPress={handlenewreview}>
            <Icon name='diff-added' size={30} color="green" />
            </TouchableOpacity>
            </View>
        )
           
        
    
      })
    
     
    }, [product])


const profileImage=useSelector(state=>state.profileImage)
const userid=useSelector(state=>state.userid)
const lastname=useSelector(state=>state.lastname)
const firstname=useSelector(state=>state.firstname)
// console.warn(props.id,userid,profileImage,firstname+''+lastname);

    const submitreview =async()=>{
        // console.warn('pressed');
        const reviewdata = {
            Productid:product.id,
            Productname:product.Name,

        Content:content,
        Rating:rating,
        Userid:userid,
        Image:profileImage,
        Username:firstname+' '+lastname,
        created: String(new Date()),
           
          };
        
            await firestore()
            .collection('Reviews')
            .add(reviewdata)
            .then(resp => {
              Alert.alert('Success')
           
            actionSheetRef.current.hide()
              
}).catch(err=>{
    console.warn("Error is ",err);
    
})
          
}
    useEffect(() => {
      reviewcall()
      

    
    }, [product])
    
    const handlenewreview=()=>{
        actionSheetRef.current.show()
    }
    const reviewcall=async()=>{
        const Return=[];
    
        await firestore().collection('Reviews').where('Productname','==',product.Name).get().then((snapshot)=>{
            if(snapshot.empty){
                setReviews(null)
            }
                else{
                    snapshot.forEach(doc=>{
                        if(doc.exists){
                          
                            Return.push(doc.data())
                        //    console.warn(doc.data());
                        }
                        setReviews(Return)
                        
                        
                        
                    })
                }
            
        })
    }
    const navigation=useNavigation()
    const [rating, setrating] = useState()
    const actionSheetRef=useRef(null)

  return (
    <View>
{Reviews===null ?<Text>No reviews, submit a review now</Text>:false}
        <FlatList data={Reviews} renderItem={({item,index})=>{
        
            return(
                <ScrollView style={{backgroundColor:'#ded',borderRadius:20,padding:15,marginTop:10}}>

                <View style={{flexDirection:'row',marginBottom:10}}>
                    <Image source={{uri:item.Image}} style={{height:50,width:50,resizeMode:'contain'}}/>
                    
                    <View>
                        
                <Text style={{fontSize:18,color:'#000',fontWeight:'bold'}}>{item.Username}</Text>
                <StarRatingDisplay rating={item.Rating}  starSize={25} enableSwiping={true} maxStars={4} color='red'/>
        
                </View>
        
                </View>
                <Text style={{textAlign:'justify',lineHeight:18,color:'#000'}}>{item.Content}</Text>

            </ScrollView>
            
            )
        }}/>
        <ActionSheet ref={actionSheetRef}>
            <View style={{padding:10,paddingBottom:25}}>
                <Text style={{fontSize:25,color:'#000',fontWeight:'bold',alignSelf:'flex-start'}}>Write a review</Text>
     <StarRating rating={rating} onChange={setrating} starSize={35} style={{alignSelf:'flex-start',marginTop:10}}/>
     <TextInput style={{height:100,backgroundColor:'#ded',borderRadius:15,width:325,marginTop:10,textAlignVertical:'top'}} multiline={true} onChangeText={text=>setcontent(text)}placeholder={"Write here"}/>
     <CustomTouchableOpacity title='Submit' color={'lightgreen'} onPress={submitreview}/>
        
      </View>
    </ActionSheet>
    </View>
    
  )
}

export default UserReview