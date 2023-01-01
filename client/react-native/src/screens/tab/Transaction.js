import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import { getSession } from "../../helpers/sessionHandler";
import DateRangePicker from "../../components/DateRangePicker";
import TransactionList from "../../components/TransactionList";
const config = require("../../../config");

export default function Transaction({ navigation }) {
  

  // SALARY" "EMI" "LOAN_DISBURSAL" "BOUNCED_IW_ECS" "BOUNCE_TRANSACTION" "BOUNCED_IW_CHEQUE" 
  // "BOUNCED_OW_CHEQUE" "IW_CHEQUE_BOUNCE_CHARGE" "OW_CHEQUE_BOUNCE_CHARGE" "BOUNCED_IW_ECS_CHARGE" 
  // "BOUNCE_CHARGE" "TAX_PAYMENT" "TRANSFER_TO_WALLET" "TRANSFER_FROM_WALLET_TO_BANK" "CASH_WITHDRAWAL" 
  // "MINIMUM_BALANCE_CHARGE" "BANK_CHARGE" "TRANSFER_TO_FD_RD" "INTEREST_COLLECTED" "SALARY_PAID" "CREDIT_CARD_PAYMENT" 
  // "ALCOHOL" "SMALL_SAVINGS" "INTEREST_CREDIT" "CASH_DEPOSIT" "REVERSAL_TXN" "CASH_BACK" "SUBSIDY" "PF_WITHDRAWAL" 
  // "MICROFINANCE" "FOODTRANSPORTATIONENTERTAINMENT" "GAMBLING_AND_BETTING" "SHOPPING" "UTILITIESINVESTMENT_INCOME" "INVESTMENT_EXPENSE" 
  // "HEALTHCAREINSURANCE_PREMIUM" "INSURANCE_CLAIMED" "RENT" "PURCHASE_BY_CARD" "TRANSFER_INTRANSFER_OUTDONATION" "PERSONAL_CARE"

  // Salary,CAHBACK  EMI,LOADN,BANK,   

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
    <AppBackground>
      <AppHeader title="Transaction">
      </AppHeader>
      {transaction.map((i, index) => (
                <TransactionList
                key={index}
                prop={i}
                ></TransactionList>
            ))}
      {/* <DateRangePicker></DateRangePicker> */}
    </AppBackground>
  );
}
