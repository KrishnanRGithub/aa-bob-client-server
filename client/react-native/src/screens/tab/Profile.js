import React, { useEffect, useState } from "react";
import ListButton from "../../components/ListButton";
import { signoutSession, storeSession } from "../../helpers/sessionHandler";
import { getSession } from "../../helpers/sessionHandler";
import AppScreen from "../../components/AppScreen";
import Footer from "../../components/Footer";
export default function Profile({ navigation }) {
  const [userDetails,setUserDetails] = useState(null);


  useEffect(() => {
    getSession("user").then((val) => {
      setUserDetails(val);
    });
  }, []); // empty array ensures that the effect only runs once

  async function removeAAUserIdFromSession(){
    try{
      userDetails["trackingId"] = null;
      userDetails["referenceId"]=null;
      await storeSession("user",userDetails);
      console.log(await getSession("user"));
    }
    catch(err){
      console.log(err);
    } 
}
  return (
    <AppScreen prop={{onRefresh:()=>{console.log("Refresh in profile")},title:"Profile", routes:null}} >
        <ListButton 
              item={{text:"All Accounts",icon:"account-box"}} 
              onPress={()=>{navigation.navigate("AccountDetails");}} 
            /> 
        <ListButton 
              item={{text:"Allow access in Account Aggregator",icon:"sync"}} 
              onPress={async ()=>{await removeAAUserIdFromSession();  navigation.navigate("StartScreen"); }} 
            />    
          <ListButton 
              item={{text:"Logout",icon:"logout"}} 
              onPress={()=>{signoutSession(); navigation.navigate("Login");}} 
            /> 
            <Footer/>
  </AppScreen>
  );
}
