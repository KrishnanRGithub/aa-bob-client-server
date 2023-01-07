import React, { useEffect, useState } from "react";
import { getSession } from "../../helpers/sessionHandler";
import { FlatList } from "react-native";
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
  const [data, setData] = useState(null);

  const handleLoadMore = () => {
    // Load the next set of items here and add them to the list
    var newItem= transaction.slice(data.length,data.length+100)
    setData([...data, ...newItem]);
  };

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
        setData(data.data.slice(0,100))
        storeTransaction(data.data)  ;
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
      {/* {transaction && transaction.map((i, index) => (
                  <TransactionList
                  key={index}
                  prop={i}
                  ></TransactionList>
              ))} */}
              <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionList key={index} prop={item}></TransactionList>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.9}
        /> 
    </AppScreen>
  );
}


