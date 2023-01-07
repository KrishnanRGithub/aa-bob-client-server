import React, { useEffect, useState } from "react";
import ListButton from "../../components/ListButton";
import { signoutSession, storeSession } from "../../helpers/sessionHandler";
import { getSession } from "../../helpers/sessionHandler";
import AppScreen from "../../components/AppScreen";
import { Text } from "react-native-paper";
import Footer from "../../components/Footer";
export default function AccountDetails({ navigation }) {
  const [userDetails,setUserDetails] = useState(null);


  return (
    <AppScreen prop={{onRefresh:()=>{console.log("Refresh in profile")},title:"Profile", routes:null}} >
      <Text>Account Details</Text>
    </AppScreen>
  );
}
