import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import { getSession } from "../../helpers/sessionHandler";
import DateRangePicker from "../../components/DateRangePicker";
import TransactionList from "../../components/TransactionList";
import RefreshScreen from "../../components/RefreshScreen";
import { View } from "react-native";
const config = require("../../../config");

export default function Transaction({ navigation }) {
  


  const [transaction, setTransaction] = useState([]);

  const fetchData = async(mobileNumber,type)=>{
    let url = "http://"+config.server_url + "/data/aa/"+mobileNumber+"/"+type;
    console.log(url);
    const response = await fetch(url,  {headers: {
      'Content-Type': 'application/json'
    }});
    // console.log("Response fetched from AA");
    const reply = await response.json();
    return reply
  }
  
  
  
  useEffect(()=>{
    getSession("user").then((val)=>{
      if (val["mobile"]){
        fetchData(val["mobile"],"allTransactions").then((data)=>{
          console.log("Setting transaction in TPage",data.data.length)
          setTransaction(data.data);
        }).catch((err)=>{
          console.log(err)
        })
      }
    })
  },[])

  return (
    <RefreshScreen onRefresh={()=>{console.log("Refreshing in Transaction")}}>
    <AppBackground>
      <AppHeader title="Transactions">
      </AppHeader>
      {transaction.map((i, index) => (
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
