import { MMKV } from 'react-native-mmkv'
import config from '../../config'
export const storage = new MMKV({
  id: `angris-storage`,
  encryptionKey: config.session_key,
})

export async function storeSession(key,value){
    try {
      value = JSON.stringify(value)
      storage.set(key, value)
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
      value = storage.getString(key) // 'Marc'
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
    storage.clearAll()
  } catch (e) {
      console.log(e)
      return false;
  }
  return true;
}

export async function clearSession(key){
    try {
      storage.delete(key)
    } catch (e) {
        console.log("Error in clearing session")
        return false;
        // saving error

    }
    return true;
}
export async function isSessionSet(key){
    try {
      return storage.getBoolean(key) 
    } catch(e) {
        console.log("Error in fetching session");
      // error reading value
    }
    return false;
}

