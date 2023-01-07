import React, { useEffect, useState } from "react";
import { fetchDataFI,storeEquity } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import EquityList from "../../components/EquityList";
import AppScreen from "../../components/AppScreen";
export default function EquitiesHistory({ navigation }) {
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
    <AppScreen prop={{onRefresh:()=>{refreshEquities()},title:"Equities",routes:[{"title":"Holdings","path":"Equities"},{"title":"Transactions","path":"EquitiesHistory"}],activeRoute:1}}>
      {equities==null?<FetchLoader></FetchLoader>:null}  
      {equities && equities.map((i, index) => (
                  <EquityList
                  key={index}
                  prop={i}
                  ></EquityList>
              ))}
    </AppScreen>
  );
}
