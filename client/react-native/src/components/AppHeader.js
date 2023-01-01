import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { theme } from '../core/theme'

const AppHeader = ({ title, children }) => {
  return (
    <View style={{ position:"relative",marginBottom:10,  backgroundColor: "papayawhip",  borderBottomColor:"orange", borderBottomWidth:0.5,  width:"100%", flexDirection: 'row', alignItems: 'center', height: 50 }}>
      <StatusBar backgroundColor= "papayawhip" />
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: theme.colors.primary, marginLeft: 10 }}>{title}</Text>
      {children}
    </View>
  );
};

export default AppHeader;