import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import { StartScreen, Complete, Dashboard, Login, Signup, Logout,NameScreen } from "./src/screens";
// import { Profile, Equities, Transaction, MutualFund } from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="NameScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="NameScreen" component={NameScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Complete" component={Complete} />
          <Stack.Screen name="Logout" component={Logout} />
          {/* <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Equities" component={Equities} />
          <Stack.Screen name="MutualFund" component={MutualFund} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
