import { MMKVLoader } from 'react-native-mmkv-storage';

export var storage = new MMKVLoader()
.withEncryption() // Generates a random key and stores it securely in Keychain

export async function storeSession(key,value){
    try {
      value = JSON.stringify(value)
      await storage.setStringAsync(key, value);
    } catch (e) {
        console.log("Error in storing key")
        return false;
        // saving error
    }
    return true;
}

export async function getSession(key){
   let value=null 
   try {
      value=await storage.getStringAsync(key);
      if(value==null)
        return null
    } catch(e) {
        console.log("Error in fetching key");
        return null
        // error reading value

    }
    return JSON.parse(value);
}

export async function signoutSession(){
  try {
    storage.clearStore();
  } catch (e) {
      console.log(e)
      return false;
  }
  return true;
}

export async function clearSession(key){
    try {
      storage.removeItem(key);
    } catch (e) {
        console.log("Error in clearing session")
        return false;
        // saving error

    }
    return true;
}
export async function isSessionSet(key){
    try {
      
      value=await storage.getStringAsync(key);
      return value != null ? true : false;
    } catch(e) {
        console.log("Error in fetching session");
      // error reading value
    }
    return false;
}

