import { CATEGORIES, LOGIN, SIGNOUT, UPDATEPROFILE, UPDATECARTCOUNT, WISHCART } from "./constants"

export const login =data=>({
    type:LOGIN, 
    payload: {
        firstname:data.firstname,
        lastname:data.lastname,
        email:data.email,
        mobilenumber:data.mobilenumber,
        userid:data.userid,
        profileImage:data.profileImage

    }
})   
export const signout =data=>({
    type:SIGNOUT, 
    payload: {
       
    }
})   
export const updateCartCount =data=>({
    type:UPDATECARTCOUNT, 
    payload: {
       CartCount:data
    }
    
})   
export const updateprofile=data=>({
    type:UPDATEPROFILE, 
    payload: {
        firstname:data.firstname,
        lastname:data.lastname,
        email:data.email,
        mobilenumber:data.mobilenumber,
        profileImage:data.profileImage

    }
})
export const categories=data=>({
    type:CATEGORIES, 
    payload: {
        categories:data.categories,

    }
})

export const updatewishcart=data=>({
    type:WISHCART, 
    payload: {
        wishid:data
       

    }
})
