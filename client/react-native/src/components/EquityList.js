// {"dateOfInvestment": "2004-04-12", "issuerName": "HCL Technologies Ltd", "rate": "1021.97", "timeOfInvestment": "13:20:00-05:00", "units": "34","lastTradedPrice"}


import React,{useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as All  from './Icon';

const EquityList = (prop) => {

    prop=prop.prop;
    var ratio = (parseFloat(prop.lastTradedPrice)-parseFloat(prop.rate))/parseFloat(prop.rate);
    ratio=ratio*100;
    ratio=ratio.toFixed(2);
    var ratioColor="black";
    if(ratio>0){
        ratio="+"+ratio.toString()+"%";
        ratioColor="green";
    }else{
        ratio=ratio.toString()+"%";
        ratioColor="maroon";
    }
    
    return (
    <View style={styles.cellContainer}>
      <View style={styles.textContainer}>
        <View>
            <Text style={styles.nameText}>{prop.issuerName}</Text>
            <Text style={{...styles.ratioText,color:ratioColor}}>{ratio}</Text>
        </View>
        {/* <Text style={styles.dateText}>{prop.dateOfInvestment}</Text> */}
      </View>
      <View style={styles.rateContainer}>
      <Text  style={styles.amountText}>{"₹"+parseFloat(prop.rate)*parseFloat(prop.units)}</Text>
        <Text style={styles.unitText}>{prop.units+" units"}</Text>
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
  ratioText: {
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

export default EquityList;
