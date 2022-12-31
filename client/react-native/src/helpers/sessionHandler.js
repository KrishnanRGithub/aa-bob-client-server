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
    try {
      const value = await AsyncStorage.getItem(key)
      return value != null ? JSON.parse(value) : null;
    } catch(e) {
        console.log("Error in fetching key");
      // error reading value
    }
    return null;
}

export async function signoutSession(){
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
      console.log("Error in clearing session")
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

