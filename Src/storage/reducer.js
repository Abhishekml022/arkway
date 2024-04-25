import {CATEGORIES, LOGIN, SIGNOUT, UPDATECARTCOUNT, UPDATEPROFILE, WISHCART, } from './constants';

const initialstate = {
  firstname: '',
  lastname: '',
  email: '',
  mobilenumber:'',
  userid:'',
  profileImage:'',
  isloggedin: false,
  CartCount:0,
  categories:[],
  wishid:[]
};
export const arkwayReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN: 
   
    return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email:action.payload.email,
        mobilenumber:action.payload.mobilenumber,
        isloggedin: true,
        userid:action.payload.userid,
        profileImage:action.payload.profileImage
      };

      case SIGNOUT: 
   
    return {
        ...state,
        firstname: '',
        lastname: '',
        email:'',
        isloggedin: false,
      };
      case UPDATEPROFILE: 
   
      return {
          ...state,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email:action.payload.email,
          mobilenumber:action.payload.mobilenumber,
        profileImage:action.payload.profileImage

        };
        case CATEGORIES: 
  
        return {
           ...state,
            categories: action.payload.categories,
                      };
    
    case UPDATECARTCOUNT: 
    return {
      ...state,
      CartCount:action.payload.CartCount
      };

      case WISHCART: 
    return {
      ...state,
      wishid:action.payload.wishid
      };
       
    default:
      return state;
  }
};
