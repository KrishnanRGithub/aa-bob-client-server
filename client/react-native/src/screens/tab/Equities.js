import React, { useEffect, useState } from "react";
import { fetchDataFI,storeEquity } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import EquityList from "../../components/EquityList";
import AppScreen from "../../components/AppScreen";
import { FlatList } from "react-native";

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
    <AppScreen prop={{onRefresh:()=>{refreshEquities()},title:"Equities",routes:[{"title":"Holdings","path":"Equities"},{"title":"Transactions","path":"Profile"}],activeRoute:0}}>
      {equities==null?<FetchLoader></FetchLoader>:null}  
      <FlatList
          data={equities}
          renderItem={({ item, index }) => (
            <EquityList key={index} prop={item}></EquityList>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

      {/* {equities && equities.map((i, index) => (
                  <EquityList
                  key={index}
                  prop={i}
                  ></EquityList>
              ))} */}
    </AppScreen>
  );
}
