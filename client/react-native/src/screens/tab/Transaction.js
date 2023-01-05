import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import { getSession } from "../../helpers/sessionHandler";
import DateRangePicker from "../../components/DateRangePicker";
import TransactionList from "../../components/TransactionList";
import RefreshScreen from "../../components/RefreshScreen";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchDataAA,getTransaction,storeTransaction } from "../../helpers/dataStore";
import FetchLoader from "../../components/FetchLoader";
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
    <RefreshScreen onRefresh={()=>{refreshTransactions()}}>
    <AppBackground>
      <AppHeader title="Transactions">
      </AppHeader>
      {transaction==null?<FetchLoader></FetchLoader>:null}  
      {transaction && transaction.map((i, index) => (
                  <TransactionList
                  key={index}
                  prop={i}
                  ></TransactionList>
              ))}
      {/* <DateRangePicker></DateRangePicker> */}
    </AppBackground>
    </RefreshScreen>

  );
}
