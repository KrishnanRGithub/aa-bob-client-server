import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import { fetchDataFI,storeEquity } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import RefreshScreen from "../../components/RefreshScreen";
import EquityList from "../../components/EquityList";
import Transaction from "./Transaction";
import Profile from "./Profile";
import SplitScreenNavigator from "../../components/SplitScreenNavigator";
export default function Equities({ navigation }) {
  const [equities, setEquities] = useState(null);
  const [userDetails,setUserDetails] = useState(null);

  const routes = [
    {
      index:0,
      title: 'Holdings',
      component: <Transaction />,
    },
    {
      index:1,
      title: 'Transactions',
      component: <Profile />,
    },
  ];
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
        {/* <SplitScreenNavigator routes={routes} /> */}
        {equities==null?<FetchLoader></FetchLoader>:null}  
      {equities && equities.map((i, index) => (
                  <EquityList
                  key={index}
                  prop={i}
                  ></EquityList>
              ))}
      </AppBackground>
    </RefreshScreen>
  );
}
