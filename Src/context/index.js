import { createContext, useContext, useEffect, useState } from "react";
import { useWindowDimensions ,Dimensions as dim, Dimensions} from "react-native";

export const DimensionContext=createContext();
export const useDimesionContext = () =>useContext(DimensionContext);
export  const DimensionContextProvider=({children})=>{

    const dimension=useWindowDimensions()
    const initheight=dim.get('window').height;
    const initwidth=dim.get('window').width;
    const [windowHeight, setwindowHeight] = useState(initheight)
    const [windowWidth, setwindowWidth] = useState(initwidth)
    const [isPortrait, setisPortrait] = useState(false)
    
    const chkportrait=()=>{
       const dim=Dimensions.get('screen') ;
       return dim.height>=dim.width
    };
    useEffect(() => {
        setisPortrait(chkportrait())
    Dimensions.addEventListener('change',()=>{
        setisPortrait(chkportrait())
    })

        }, [])

    useEffect(() => {
    setItem();
    }, [dimension])

    const setItem=()=>{
        const {height,width}=dimension;
        setwindowHeight(height);
        setwindowWidth(width)
    }
    
    
    
    return <DimensionContext.Provider value={{windowHeight,windowWidth,isPortrait}}>{children}</DimensionContext.Provider>
    
}
