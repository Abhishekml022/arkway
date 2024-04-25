import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const updateprofileimage = async image => {
    // console.warn('ividethi',image);
  return new Promise(async resolve => {
    try {
      const uri = image;
      // console.warn('uri is',uri);
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      // console.warn('filename is',filename);

      const pathForFirebaseStorage = await getpathForFirebaseStorage(uri);
      // console.warn('path fbs is',pathForFirebaseStorage);

      await storage().ref(filename).putFile(pathForFirebaseStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => {

          resolve(url)
          // console.warn('url fb is',url);
          ;
        });
    } catch (error) {}
  });
};

const getpathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
// console.warn(stat.path);
  return stat.path;

};
