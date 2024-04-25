export const verifyPhone =phone=>{
    if(/^[a-zA-Z]/.test(phone)||/[^\d\-+]/.test(phone))
     
    {
        return false
    }
    else {
       
            return true
        }
    
}
export const verifyOtp =otp=>{
    if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(otp))
     
    {
        return false
    }
    else {
       
            return true
        }
    
}