import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { storeSession,getSession } from "../helpers/sessionHandler";

const config = require("../../config");

export default function Complete({ navigation }) {
  
  const [isLoading, setLoading] = useState(false);
  const [renderPage, setRenderPage] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({message:null, type:null});

  // useEffect(() => {
  //   return navigation.addListener("focus",()=>{
  //     getSession("user").then((val)=>{
  //       console.log("On Page load Session",val)
  //       if(val){
  //         x=10
  //         // setRenderPage(true)
  //       }
  //       else{
  //         setShowToast(false)
  //         setLoading(false)
  //         setRenderPage(true)
  //       }
  //     })
  //   })
  // }, [navigation]);
  

  
  if(renderPage==false){
    return<></>
  }


  return (
    // <Background>
    //   <Header>Consent successfully approved</Header>
      <NavBar>
      </NavBar>
    // <Background>
  );
}
