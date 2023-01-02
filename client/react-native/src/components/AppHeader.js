import React,{useState} from 'react';
import { Image,View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme'
import { signoutSession } from '../helpers/sessionHandler';
const kebab_menu = require('../assets/icons/logout-menu.png');


const AppHeader = ({ title, children }) => {
  const [logoutVisible, setLogoutVisible] = useState(false);

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
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "papayawhip",
    borderBottomColor: "orange",
    borderBottomWidth: 0.5,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    overflow: 'visible',
    zIndex:1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
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



{/* <View style={styles.container}>
<View style={{     flexDirection: 'row',
justifyContent: 'space-between',
width: "100%"}}>
  <StatusBar backgroundColor= "papayawhip" />
  <Text style={styles.title}>{title}</Text>
  <TouchableOpacity onPress={() => setLogoutVisible(!logoutVisible)}>
      <Image source={kebab_menu} style={styles.icon}  />
  </TouchableOpacity>
</View>
{logoutVisible && (
  <View style={styles.optionContainer}>
    <TouchableOpacity style={styles.option}>
      <Text style={styles.optionText}>Option 1</Text>
    </TouchableOpacity>
  </View>
)}
{children}
</View> */}