import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import { fetchDataFI,storeEquity } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import RefreshScreen from "../../components/RefreshScreen";

export default function Equities({ navigation }) {
  const [equities, setEquities] = useState(null);
  const [userDetails,setUserDetails] = useState(null);


  useEffect(() => {
    getSession("user").then((val) => {
      setUserDetails(val);
    });
  }, []); // empty array ensures that the effect only runs once
  

  async function refreshEquities(){
    try{
      let data =await fetchDataFI(userDetails['mobile'],"equities")
      console.log(data)
      console.log("Setting equities in EPage")
      setEquities(data.data.summary);
      storeEquity(data.data.summary)  
    }
    catch(err){
      console.log(err);
    } 
}

  useEffect(() => {
    refreshEquities().then(() => {
      console.log("Equities set on load");
    });
  }, [userDetails]); 

  return (
    <RefreshScreen onRefresh={()=>{refreshEquities()}}>
      <AppBackground>
        <AppHeader title="Equities">
        </AppHeader>
        {equities==null?<FetchLoader></FetchLoader>:null}  

      </AppBackground>
    </RefreshScreen>
  );
}
