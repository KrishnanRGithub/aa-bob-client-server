import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";

import { fetchDataFI,storeMutualFund } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import RefreshScreen from "../../components/RefreshScreen";
import MutualFundList from "../../components/MutualFundList";
export default function MutualFund({ navigation }) {

  const [mf, setMF] = useState(null);
  const [userDetails,setUserDetails] = useState(null);

  useEffect(() => {
    getSession("user").then((val) => {
      setUserDetails(val);
    });
  }, []); // empty array ensures that the effect only runs once
  

  async function refreshMF(){
    try{
      let data =await fetchDataFI(userDetails['mobile'],"mutualfund")
      console.log(data)
      console.log("Setting MF in EPage")
      setMF(data.data.all);
      storeMutualFund(data.data.all)  
    }
    catch(err){
      console.log(err);
    } 
}

  useEffect(() => {
    refreshMF().then(() => {
      console.log("Equities set on load");
    });
  }, [userDetails]); 

  return (
    <RefreshScreen onRefresh={()=>{refreshEquities()}}>
      <AppBackground>
        <AppHeader title="Mutual Fund">
        </AppHeader>
        {/* <SplitScreenNavigator routes={routes} /> */}
        {mf==null?<FetchLoader></FetchLoader>:null}  
      {mf && mf.map((i, index) => (
                  <MutualFundList
                  key={index}
                  prop={i}
                  ></MutualFundList>
              ))}
      </AppBackground>
    </RefreshScreen>
  );
}
