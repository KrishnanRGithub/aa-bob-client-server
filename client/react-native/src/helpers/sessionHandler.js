import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeSession(key,value){
    try {
      value = JSON.stringify(value)
      await AsyncStorage.setItem(key, value)
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
       value = await AsyncStorage.getItem(key)
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
    await AsyncStorage.clear()
  } catch (e) {
      console.log(e)
      return false;
  }
  return true;
}

export async function clearSession(key){
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log("Error in clearing session")
        return false;
        // saving error

    }
    return true;
}
export async function isSessionSet(key){
    try {
      const value = await AsyncStorage.getItem(key)
      return value != null ? true : false;
    } catch(e) {
        console.log("Error in fetching session");
      // error reading value
    }
    return false;
}

