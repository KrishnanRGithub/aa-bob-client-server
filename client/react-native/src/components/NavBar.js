import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../core/theme'


import HomeScreen from '../screens/Test';
import SettingsScreen from '../screens/Test';
import ProfileScreen from '../screens/Test';
import MessagesScreen from '../screens/Test';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <NavigationContainer
        independent={true}
    >
      <Tab.Navigator

screenOptions={{
    headerShown:false,
    tabBarShowLabel: true,
    tabBarStyle: {
      paddingBottom:7,
      paddingTop:5,
      height:65,
      backgroundColor: "papayawhip",

    },
    labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,         
        activeTintColor: "red",
        inactiveTintColor: "gray",    
    },
  }}
  tabBarOptions={{
    activeTintColor: theme.colors.primary,
    inactiveTintColor: "gray",
    labelStyle: {
       fontSize:11,
        fontWeight: 'bold',
        marginBottom: 3,         
     },
  }}
        // tabBarOptions={{
        //     // screenOptions={{
        //   labelStyle: {
        //     fontSize: 12,
        //     fontWeight: 'bold',
        //     // padding: 10,         
        //   },
        //   tabStyle: {
        //     // marginBottom:20,
        //     // padding: 10,
        //   },
        //   style: {
        //     shadowColor: 'black', // add shadow to the tab navigator
        //     shadowOffset: { width: 0, height: 2 },
        //     shadowOpacity: 0.2,
        //     shadowRadius: 2,
        //     backgroundColor: 'white',
        //     borderTopWidth: 1,
        //     borderTopColor: 'lightgray',
        //     // margin:10
        //   },
        // }}
      >
         <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon5 name="user-alt" color={color} size={size} />
            ),
            tabBarLabel: 'Profile',
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="tags" color={color} size={size} />
            ),
            tabBarLabel: 'Transactions',
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon5 name="coins" color={color} size={size} />
            ),
            tabBarLabel: 'Mutual  Funds',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="suitcase" color={color} size={size} />
            ),
            tabBarLabel: 'Equities',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//     navbar: {
//         bottom: 20,
//         shadowColor: 'black', // add shadow to the tab navigator
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//         backgroundColor: 'white',
//         borderTopWidth: 1,
//         borderTopColor: 'lightgray',
//     },
//   })
  
export default NavBar;