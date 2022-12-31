
import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { signoutSession } from "../helpers/sessionHandler";


export default Logout = ({ navigation }) => {
  signoutSession().then(()=>{
        navigation.navigate("Login");
  })  
  return (
    <Background>
      <Logo />
    </Background>
  );
};