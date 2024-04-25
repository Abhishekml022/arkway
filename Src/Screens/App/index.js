import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import Signup from '../Signup';
import Phonelogin from '../Phonelogin';
import {DimensionContextProvider} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../home';
import CustomDrawer from '../../Common/customDrawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../../Common/CustomTabBar';
import Categories from '../categories';
import Search from '../search';
import Offers from '../Offers';
import Cart from '../Cart';
import { Image, Text, TouchableOpacity, View} from 'react-native';
import Orders from '../Orders';
import Wishlist from '../Wishlist';
import Account from '../Account';
import style from './style';
import HeaderLeft from '../../Common/commonheaderleft';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../storage/store';
import Splash from '../Splash';
import Shop from '../Shop';
import Productpage from '../productpage';
import UserReview from '../Userreview';
import AddressPage from '../Address';
import Orderdetails from '../Orderdetails';

const DrawerNav = createDrawerNavigator();
const AppStack = createNativeStackNavigator();
const Footer = createBottomTabNavigator();

const MyFooter = () => {
  const navigation = useNavigation();
  return (
    <Footer.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/back.png')}
              style={{height: 25, width: 20, marginLeft: 10}}
            />
          </TouchableOpacity>
        ),
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Categories" component={Categories} />
      <Footer.Screen name="Search" component={Search} />
      <Footer.Screen name="Offers" component={Offers} />
      <Footer.Screen name="Cart" component={Cart} />
    </Footer.Navigator>
  );
};
const Appdrawer = () => {
  const navigation = useNavigation();
  const CartCount=useSelector(state=>state.CartCount)


  return (
    <DrawerNav.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerLeft: () => <HeaderLeft Type="back" />,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={style.cartcount}>
              <Text style={{color: '#fff', fontWeight: '800'}}>{CartCount} </Text>
            </View>
            <Image
              source={require('../../Images/Cart.png')}
              style={{
                height: 25,
                width: 25,
                marginRight: 15,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
        ),
      }}>
      <DrawerNav.Screen
        name="Footer"
        component={MyFooter}
        options={{headerShown: false}}></DrawerNav.Screen>
      <DrawerNav.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}></DrawerNav.Screen>
      <DrawerNav.Screen name="Orders" component={Orders}></DrawerNav.Screen>
      <DrawerNav.Screen name="Wishlist" component={Wishlist}></DrawerNav.Screen>
      <DrawerNav.Screen name="Account" component={Account}></DrawerNav.Screen>
      <DrawerNav.Screen name="Categories" component={Categories} />  
      <DrawerNav.Screen name="Productpage" component={Productpage} />
       <DrawerNav.Screen name="Shop" component={Shop} />
       <DrawerNav.Screen name="UserReview" component={UserReview} />
       <DrawerNav.Screen name="AddressPage" component={AddressPage} />
       <DrawerNav.Screen name="Orderdetails" component={Orderdetails} />



       


    </DrawerNav.Navigator>
  );
};

const AppNavigation = () => {
  const {isloggedin} = useSelector(state => state);
  const [loading, setloading] = useState(true)
  console.log(isloggedin);

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 500);
    
  }, [isloggedin])
  
  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            {loading? <AppStack.Screen name="Splash" component={Splash} />      :<> 
                      {isloggedin ? (
            <AppStack.Screen name="AppDrawer" component={Appdrawer} />
          ) : (
            <>
              <AppStack.Screen name="Login" component={Login} />
              <AppStack.Screen name="Signup" component={Signup} />
              <AppStack.Screen name="Phonelogin" component={Phonelogin} />
              <AppStack.Screen name="Shop" component={Shop} />

            </>
          )}
          </>}

        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
