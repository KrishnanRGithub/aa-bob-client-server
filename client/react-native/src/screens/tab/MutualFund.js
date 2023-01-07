import React, { useEffect, useState } from "react";
import { fetchDataFI,storeMutualFund } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import { getSession } from "../../helpers/sessionHandler";
import MutualFundList from "../../components/MutualFundList";
import AppScreen from "../../components/AppScreen";
import { FlatList } from "react-native";
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

    <AppScreen prop={{onRefresh:()=>{refreshMF()},title:"Mutual Funds",routes:null}}>
              {mf==null?<FetchLoader></FetchLoader>:null}  
              <FlatList
          data={mf}
          renderItem={({ item, index }) => (
            <MutualFundList key={index} prop={item}></MutualFundList>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
            {/* {mf && mf.map((i, index) => (
                        <MutualFundList
                        key={index}
                        prop={i}
                        ></MutualFundList>
                    ))} */}
    </AppScreen>
  );
}
