// //              "amc":i["amc"] ,
// "fundType":i["fundType"] ,
// "amount":i["amount"] ,
// "closingUnits":i["closingUnits"],
// "navDate":i["navDate"],
// "type":i["type"] 
import React,{useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as All  from './Icon';

const MutualFundList = (prop) => {

    prop=prop.prop;
    
    var typeColor="black";
    if(prop.type=="SELL"){
        typeColor="green";
    }else{
        typeColor="maroon";
    }
    
    return (
    <View style={styles.cellContainer}>
      <View style={styles.textContainer}>
        <View>
            <Text style={styles.nameText}>{prop.amc}</Text>
            <Text style={{...styles.typeText,color:typeColor}}>{prop.type}</Text>
        </View>
        <Text style={styles.dateText}>{prop.navDate}</Text>
      </View>
      <View style={styles.rateContainer}>
      <Text  style={styles.amountText}>{"₹"+prop.amount}</Text>
        <Text style={styles.unitText}>{prop.closingUnits+" units"}</Text>
      </View>
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
  rateContainer: {
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
},
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  unitText: {
    fontSize: 14,
    color: 'gray',
    textAlign:"right",
},
  timeText: {
    fontSize: 14,
    color: 'gray',
  },
  amountText: {
    fontWeight:"bold",
    fontSize: 18,
  },
});

export default MutualFundList;
