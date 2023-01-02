import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import ListButton from "../../components/ListButton";
import RefreshScreen from "../../components/RefreshScreen";
import { signoutSession } from "../../helpers/sessionHandler";
export default function Profile({ navigation }) {

  return (
    <RefreshScreen  onRefresh={()=>{console.log("Refreshing in Profile")}}>
      <AppBackground>
        <AppHeader title="Profile">
        </AppHeader>
          <ListButton 
              item={{text:"Logout",icon:"logout"}} 
              onPress={()=>signoutSession()} 
            />    
      </AppBackground>
    </RefreshScreen>

  );
}
