import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TransactionList = (prop) => {
prop = prop.prop;
if(prop.counterParty!=null)
    prop.counterParty=prop.counterParty.trim("")
else{
    prop.counterParty=""
} 
prop.uamount="₹"+prop.amount
if(prop.type=="CREDIT")
    prop.uamount="+ ₹"+prop.amount

    return (
    <View style={styles.cellContainer}>
      <Image source={{uri:'https://assets-netstorage.groww.in/mf-assets/logos/reliance_groww.png'}} style={styles.icon} />
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
