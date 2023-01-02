import React,{useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as All  from './Icon';

const TransactionList = (prop) => {

  
  function classifyCategories(category) {
  // SALARY" "EMI" "LOAN_DISBURSAL" "BOUNCED_IW_ECS" "BOUNCE_TRANSACTION" "BOUNCED_IW_CHEQUE" 
  // "BOUNCED_OW_CHEQUE" "IW_CHEQUE_BOUNCE_CHARGE" "OW_CHEQUE_BOUNCE_CHARGE" "BOUNCED_IW_ECS_CHARGE" 
  // "BOUNCE_CHARGE" "TAX_PAYMENT" "TRANSFER_TO_WALLET" "TRANSFER_FROM_WALLET_TO_BANK" "CASH_WITHDRAWAL" 
  // "MINIMUM_BALANCE_CHARGE" "BANK_CHARGE" "TRANSFER_TO_FD_RD" "INTEREST_COLLECTED" "SALARY_PAID" "CREDIT_CARD_PAYMENT" 
  // "ALCOHOL" "SMALL_SAVINGS" "INTEREST_CREDIT" "CASH_DEPOSIT" "REVERSAL_TXN" "CASH_BACK" "SUBSIDY" "PF_WITHDRAWAL" 
  // "MICROFINANCE" "FOODTRANSPORTATIONENTERTAINMENT" "GAMBLING_AND_BETTING" "SHOPPING" "UTILITIESINVESTMENT_INCOME" "INVESTMENT_EXPENSE" 
  // "HEALTHCAREINSURANCE_PREMIUM" "INSURANCE_CLAIMED" "RENT" "PURCHASE_BY_CARD" "TRANSFER_INTRANSFER_OUTDONATION" "PERSONAL_CARE"
  // Salary,CAHBACK  EMI,LOADN,BANK,   

    const shopping = ["SHOPPING", "PURCHASE_BY_CARD"];
    const entertainment = ["ALCOHOL", "FOODTRANSPORTATIONENTERTAINMENT", "GAMBLING_AND_BETTING"];
    const bank = ["LOAN_DISBURSAL", "BOUNCED_IW_ECS", "BOUNCE_TRANSACTION", "BOUNCED_IW_CHEQUE", "BOUNCED_OW_CHEQUE", "IW_CHEQUE_BOUNCE_CHARGE", "OW_CHEQUE_BOUNCE_CHARGE", "BOUNCED_IW_ECS_CHARGE", "BOUNCE_CHARGE", "TRANSFER_TO_WALLET", "TRANSFER_FROM_WALLET_TO_BANK", "CASH_WITHDRAWAL", "MINIMUM_BALANCE_CHARGE", "BANK_CHARGE", "TRANSFER_TO_FD_RD", "CREDIT_CARD_PAYMENT", "CASH_DEPOSIT", "REVERSAL_TXN", "PF_WITHDRAWAL", "INSURANCE_PREMIUM", "INSURANCE_CLAIMED", "TRANSFER_INTRANSFER_OUTDONATION"];
    const investment = ["SMALL_SAVINGS", "INVESTMENT_INCOME", "INVESTMENT_EXPENSE"];
    const income = ["SALARY", "INTEREST_COLLECTED", "SALARY_PAID", "CASH_BACK", "SUBSIDY"];
    const expense = ["EMI", "TAX_PAYMENT",    "UTILITIES", "HEALTHCARE", "RENT",  "PERSONAL_CARE"];
    if(shopping.includes(category)){
      return "shopping";
    }else if(entertainment.includes(category)){
      return "entertainment";
    }else if(bank.includes(category)){
      return "bank";
    }else if(investment.includes(category)){
      return "investment";
    }else if(income.includes(category)){
      return "income";
    }
    else if(expense.includes(category)){
      return "expenses";
    }else{
      return "other";
    }
  }  

  prop = prop.prop;
  if(prop.counterParty!=null)
      prop.counterParty=prop.counterParty.trim("")
  else{
      prop.counterParty=""
  } 
  var temp=classifyCategories(prop.categoryCode)
  prop.uamount="₹"+prop.amount
  if(prop.type=="CREDIT")
      prop.uamount="+ ₹"+prop.amount

    return (
    <View style={styles.cellContainer}>
      <Image source={All[temp]} style={styles.icon} />

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{prop.counterParty==""?prop.category:prop.counterParty}</Text>
        <Text style={styles.dateText}>{prop.dateOfTransaction+" at "+prop.timeOfTransaction}</Text>
      </View>
      <Text  style={[styles.amountText, prop.type === 'DEBIT' ? styles.debitAmount : styles.creditAmount]}>{prop.uamount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.2,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  timeText: {
    fontSize: 14,
    color: 'gray',
  },
  amountText: {
    fontWeight:"bold",
    fontSize: 18,
  }, 
  debitAmount: {
    fontSize: 18,
  }, 
  creditAmount: {
    fontSize: 18,
    color: 'green',
  },
});

export default TransactionList;
