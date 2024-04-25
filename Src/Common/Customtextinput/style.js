import {StyleSheet, Dimensions} from 'react-native';
// const {height, width} = Dimensions.get('screen');
const style = (height,width,colortype)=>
StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    borderRadius:13,
    backgroundColor: colortype=='normal'?'#bfe5b1': '#d3c1de',
    borderColor:colortype=='normal'? 'green':null,
    borderWidth: colortype=='normal'? 1:0,
    marginVertical:height*.017,padding:.4,paddingRight:50
  },
  TextInput: {
    height: width * 0.12,
    width: width * 0.8,
    borderRadius: 10,
    opacity: 98,
    fontSize: 18,
    color: '#000',
    margin:5
  },
  Image: {
    height: height * 0.05,
    width: width * 0.05,
    resizeMode: 'contain',
  },
});

export default style;
