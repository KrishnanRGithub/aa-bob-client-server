import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { storeSession,getSession } from "../helpers/sessionHandler";

const config = require("../../config");

export default function Complete({ navigation }) {
  
  const [isLoading, setLoading] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({message:null, type:null});

  useEffect(() => {
    return navigation.addListener("focus",()=>{
      getSession("user").then((val)=>{
        console.log("On complete page load Session",val)
        if(['referenceId'])
          setRenderPage(true)
      })
    })
  }, [navigation]);
  

  
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
