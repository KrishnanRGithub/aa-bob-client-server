import React,{useState} from 'react';
import { Image,View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme'
import { signoutSession } from '../helpers/sessionHandler';
import SplitScreenNavigator from './SplitScreenNavigator';
const kebab_menu = require('../assets/icons/logout-menu.png');
import {useFonts} from 'expo-font';
const AppHeader = ({ title,subNav,children,routes }) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
const [fontsLoaded] = useFonts({
  'headFont': require('../assets/head.ttf'),
});
if(fontsLoaded){
    return (
    <View style={styles.container}>
      <View style={{     flexDirection: 'row',
      justifyContent: 'space-between',
      width: "100%"}}>
        <StatusBar backgroundColor= "papayawhip" />
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
    }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "papayawhip",
    borderBottomWidth: 0,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    overflow: 'visible',
    zIndex:1,
  },
  title: {
    fontSize: 25,
    fontFamily: 'headFont',
    // fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 10,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  optionContainer: {
    position: 'absolute',
    bottom: 16, // add this line
    top: 35,
    right: 16,
    backgroundColor: 'wheat',
    zIndex: 2,
    height: 200, // Fixed height for the option container
  },
  option: {
    padding: 18,
  },
  optionText: {
    fontSize: 16,
  },
});

export default AppHeader;
