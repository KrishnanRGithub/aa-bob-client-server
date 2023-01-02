import React, { useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import AppHeader from "../../components/AppHeader";
import Header from "../../components/Header";
import RefreshScreen from "../../components/RefreshScreen";

export default function Profile({ navigation }) {

  return (
    <RefreshScreen  onRefresh={()=>{console.log("Refreshing in Profile")}}>

    <AppBackground>
      <AppHeader title="Profile">
      </AppHeader>
      <Header>Sample</Header>
    </AppBackground>
    </RefreshScreen>

  );
}
