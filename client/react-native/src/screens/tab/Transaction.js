import React, { useEffect, useState } from "react";
import { getSession } from "../../helpers/sessionHandler";
import DateRangePicker from "../../components/DateRangePicker";
import TransactionList from "../../components/TransactionList";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchDataAA,getTransaction,storeTransaction } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
import AppScreen from "../../components/AppScreen";
const config = require("../../../config");

export default function Transaction({ navigation }) {
  

  const [transaction, setTransaction] = useState(null);
  const [userDetails,setUserDetails] = useState(null);


  useEffect(() => {
    getSession("user").then((val) => {
      setUserDetails(val);
    });
  }, []); // empty array ensures that the effect only runs once
  
  useEffect(() => {
    refreshTransactions().then(() => {
      console.log("Transaction set on load");
    });
  }, [userDetails]); 
  
  async function refreshTransactions(){
      try{
        let data =await fetchDataAA(userDetails['mobile'],"allTransactions")
        console.log("Setting transaction in TPage",data.data.length)
        setTransaction(data.data);
        storeTransaction(data.data)  
      }
      catch(err){
        console.log(err);
      } 
  }


  if(false){
    return<><LoadingScreen></LoadingScreen></>
  }




  return (
    <AppScreen prop={{onRefresh:()=>{refreshTransactions()},title:"Transactions",routes:null}} >
       {transaction==null?<FetchLoader></FetchLoader>:null}  
      {transaction && transaction.map((i, index) => (
                  <TransactionList
                  key={index}
                  prop={i}
                  ></TransactionList>
              ))}
    </AppScreen>
  );
}




{/* <RefreshScreen onRefresh={()=>{refreshTransactions()}}>
<AppBackground>
  <AppHeader title="Transactions">
  </AppHeader>
 
</AppBackground>
</RefreshScreen> */}