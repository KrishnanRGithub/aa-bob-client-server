import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import ListButton from "../../components/ListButton";
import RefreshScreen from "../../components/RefreshScreen";
import { signoutSession, storeSession } from "../../helpers/sessionHandler";
import { getSession } from "../../helpers/sessionHandler";

export default function TransactionAnalytics({ navigation }) {
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
    <RefreshScreen  onRefresh={()=>{console.log("Refreshing in Profile")}}>
      <AppBackground>
        <AppHeader title="Profile">
        </AppHeader>

        <ListButton 
              item={{text:"Allow access in Account Aggregator",icon:"sync"}} 
              onPress={async ()=>{await removeAAUserIdFromSession();  navigation.navigate("StartScreen"); }} 
            />    
          <ListButton 
              item={{text:"Logout",icon:"logout"}} 
              onPress={()=>{signoutSession(); navigation.navigate("Login");}} 
            /> 
      </AppBackground>
    </RefreshScreen>

  );
}
