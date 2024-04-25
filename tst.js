import { View, Text, PermissionsAndroid, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import CustomTouchableOpacity from '../../Common/CustomTouchableOpacity'
import MapView, { Marker } from 'react-native-maps'
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ActionSheet from 'react-native-actions-sheet'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'

navigator.geolocation = require('@react-native-community/geolocation')

const AddressPage = () => {
const navigation=useNavigation()
const actionSheetRef=useRef(null)
    useEffect(() => {
      getcurrentloction()
        navigation.setOptions({
          HeaderLeft:  () => <HeaderLeft /> ,
          title: 'Delivery Details ',
          
        })
        requestlocationpermission()
      }, [])

      const getcurrentloction=()=>{
        Geolocation.getCurrentPosition(info=>{
          setNewPosition( {latitude:info.coords.latitude??0,
            longitude:info.coords.longitude ??0,
            latitudeDelta:0.001,
            longitudeDelta:0.001})
        })
      }
      const route=useRoute()

      const email=useSelector(state=>state.email)
      const mobilenumber=useSelector(state=>state.mobilenumber)
      const firstname=useSelector(state=>state.firstname)
      const lastname=useSelector(state=>state.lastname)
      const userid=useSelector(state=>state.userid)





      const{cartitems,total}=route.params
      const [Visible, setVisible] = useState(false)



      const addtoorder=async paymentId=>{
        const smallId=paymentId.slice(4,12)
        const date=new Date().toLocaleString()
        var deldate=new Date()
        deldate.setDate(deldate.getDate()+10)
        await firestore()
                  .collection('Orders')
                  .add({
                    Created:date,
                    TotalAmount:total,
                    email:email,
                    mobilenumber:mobilenumber,
                    OrderID:smallId,
                    OrderStatus:'Ordered',
                    CartItems:cartitems,
                    Name:firstname+lastname,
                    ExpDelDate:deldate,
                    Address:'Hello WOrld',
                    Userid:userid})
                  .then(async resp => {
                    await firestore().collection("Cart").where('userid','==',userid).get().then(querysnapshot=>{
                      querysnapshot.forEach(doc=>{
                        doc.ref.delete().then(()=>{
                          setVisible(false);
                          navigation.goBack()
                        })
                      })
                    })
                   
                  });
                }
      
                
      const requestlocationpermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

const callactionsheet=()=>{
  actionSheetRef.current.show()
}
      const callgateway=()=>{
        setVisible(true)
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_CXo5HbmQ83IYL0', // Your api key
            amount: parseInt(total,10)*100 ,
            name: 'Arkway Puchase',
            prefill: {
              email: email,
              contact: mobilenumber,
              name: firstname
            },
            theme: {color: '#dea'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            addtoorder(data.razorpay_payment_id)
            // alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            setVisible(false)
            alert(`Error: ${error.code} | ${error.description}`);
          });
        }
      
      const [NewPosition, setNewPosition] = useState({})
      const [Address, setAddress] = useState('')
      // console.warn('Address Is',Address);
     

      return (
   <View Style={{flex:1,margin:5,alignContent:"center",justifyContent:'space-between'}} > 
    <ScrollView>
        <View>
        <GooglePlacesAutocomplete 
        styles={{textInput:{height:50,width:150,borderWidth:1,margin:10 },predefinedPlacesDescription:{flex:1,fontWeight:'bold'}}}
      placeholder='Enter your Street Name'
      onPress={(data, details = null) => {
        console.log(data, details);
        const location=data?.location??details.geometry?.location;
        // const positiondata={
        //   latitude:location?.lat??0,
        //   longitude:location?.lng??0,
        //   latitudeDelta:0.001,
        //   longitudeDelta:0.001

        // }
        setNewPosition(positiondata)
        setAddress(data.name??data.description)
      }} 

      query={{
        key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4 ',
        language: 'en',
      }}
      currentLocation={true}
      fetchDetails={true}
      currentLocationLabel='Current location'
      
      onFail={fail=>(console.warn('Fail',fail))}
      onNotFound={notfound=>{console.warn('not found',notfound);}}
    />
      
    </View>
    <MapView
     initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
          style={{ width: "100%", height: 400,margin:10 }}
          // onMapReady={resp=>{console.warn(resp);}}
         
          showsUserLocation={true}
          followsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          showsMyLocationButton={true}
        >
          <Marker title='You are here' coordinate={NewPosition} />
        </MapView>

        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',margin:10}} onPress={getcurrentloction}>
          <View style={{backgroundColor:'lightgreen',alignItems:'center',justifyContent:'center',borderRadius:10,padding:15}}>
            <Icon name='location-arrow' size={20}/>
          </View>
          <Text style={{marginLeft:5,fontSize:20,fontWeight:'bold',color:'#000'}}>Current Location</Text>

        </TouchableOpacity>
        <Modal
        visible={Visible}
        onRequestClose={() => setVisible(false)}
        transparent>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
            <ActivityIndicator  size={'large'} animating={true} color='red'/>
            
        </View>
      </Modal>
      <ActionSheet ref={actionSheetRef} >
            <View style={{padding:10,paddingBottom:25,height:250}}>
                <Text style={{fontSize:25,color:'#000',fontWeight:'bold',alignSelf:'flex-start'}}>Payment Sucessfull</Text>
        
      </View>
    </ActionSheet>
  <CustomTouchableOpacity title="Confirm Location " color='lightgreen' onPress={callgateway}/>
     
    </ScrollView>
    </View>
  )
}

export default AddressPage