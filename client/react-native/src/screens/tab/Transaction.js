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
import { View } from "react-native";
const config = require("../../../config");

export default function Transaction({ navigation }) {
  


  const [transaction, setTransaction] = useState([]);
  const [userDetails,setUserDetails] = useState({});
  async function refreshTransactions(){
      try{
        data =await fetchDataAA(userDetails['mobile'],"allTransactions")
        console.log("Setting transaction in TPage",data.data.length)
        setTransaction(data.data);
        storeTransaction(data.data)  
      }
      catch(err){
        console.log(err);
      }
      
  }



  useEffect(()=>{
    getSession("user").then((val)=>{
      setUserDetails(val);
    })
    getTransaction().then((val)=>{
      setTransaction(val);
      if (transaction==null){
        refreshTransactions();
      }
    }) 
  },[])

  return (
    <RefreshScreen onRefresh={()=>{refreshTransactions()}}>
    <AppBackground>
      <AppHeader title="Transactions">
      </AppHeader>
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
