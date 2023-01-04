import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../core/theme'


import MutualFundScreen from '../screens/tab/MutualFund';
import EquitiesScreen from '../screens/tab/Equities';
import ProfileScreen from '../screens/tab/Profile';
import TransactionScreen from '../screens/tab/Transaction';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
      <Tab.Navigator

screenOptions={{
    headerShown:false,
    tabBarShowLabel: true,
    tabBarStyle: {
      paddingBottom:7,
      paddingTop:5,
      height:65,
      borderTopColor: 'orange',
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
          name="Transactions"
          component={TransactionScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
                  <Icon name="bank" color={color} size={size} />
            ),
            tabBarLabel: 'Transactions',
          }}
        />
        <Tab.Screen
          name="Mutual Funds"
          component={MutualFundScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon5 name="coins" color={color} size={size} />
            ),
            tabBarLabel: 'Mutual  Funds',
          }}
        />
        <Tab.Screen
          name="Equities"
          component={EquitiesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="suitcase" color={color} size={size} />
            ),
            tabBarLabel: 'Equities',
          }}
        />
      </Tab.Navigator>
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