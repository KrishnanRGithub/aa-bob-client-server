import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import { ActivityIndicator } from "react-native";
import { numberValidator } from "../helpers/numberValidator";
import { StyleSheet } from 'react-native';
import RedirectLink from "../components/RedirectLink";
import { storeSession,getSession,clearSession } from "../helpers/sessionHandler";
import LoadingScreen from "../components/LoadingScreen";


const config = require("../../config");
const styles = StyleSheet.create({
  unedit: {
    backgroundColor:"#e0e0e0",
    fontSize:20
  },
});


// open your gateway

export default function StartScreen({ navigation }) {
  // clearSession("user").then(()=>{
  //   pass=1
  // })
  const [number, setNumber] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({message:null, type:null});
  
  const fetchUrlFromAA = async()=>{
    let url = "http://"+config.server_url + "/init/" + number;
    console.log(url);

    const response = await fetch(url,  {headers: {
      'Content-Type': 'application/json'
    }});
    // console.log("Response fetched from AA");
    const replyFromAA = await response.json();
    return replyFromAA
  }

  const consentStatus = async(mobileNum)=>{
    let url = "http://"+config.server_url + "/consent/status/" + mobileNum;
    console.log(url)
    const response = await fetch(url,  {headers: {
      'Content-Type': 'application/json'
    }});
    // console.log("Consent status fetched from AA");
    const replyFromAA = await response.json();
    return replyFromAA
  }

  useEffect(() => {
    return navigation.addListener("focus",()=>{
      getSession("user").then((val)=>{
        console.log("On Page load Session",val)
        if (val["trackingId"]){
          consentStatus(val["mobile"]).then((status)=>{
            console.log("Mobile consent status :"+status)
            if(status.status=="COMPLETED")
            {
              navigation.navigate("Complete");
              setRenderPage(false)
            }
            else{
              console.log(val["mobile"])
              setNumber(val["mobile"])
              setRenderPage(true)    
            }
          }).catch(()=>{
            console.log("Error in checking the status of AA")
          })
          console.log(val)
        }else if(val){
          console.log(val["mobile"])
          setNumber(val["mobile"])
          setRenderPage(true)
        }
        else{
          setShowToast(false)
          setNumber("")
          setLoading(false)
          setRenderPage(true)
        }
      })
    })
  }, [navigation]);


  const getURL = async () => {
    setLoading(true);
    const validNumber = numberValidator(number);
    if (!validNumber) {
      setToastMsg({message:"Invalid mobile number",type:"error"})
      setShowToast(true);
      setLoading(false);
      return;
    }else {
      try {
        const reply = await fetchUrlFromAA();
        let sessionVar = await getSession("user")
        console.log(sessionVar)
        sessionVar["trackingId"]=reply.trackingId;
        sessionVar["referenceId"]=reply.referenceId;
        await storeSession("user",sessionVar);
        navigation.navigate("Dashboard", { param: reply["url"] });
      } catch (error) {
        console.error(error + " Start Screen");
      } finally {
        setLoading(false);
      }
    }
  };

  if(renderPage==false||isLoading){
    return<><LoadingScreen></LoadingScreen></>
  }

  return (
    <Background>
      <Logo />
      <Header>Personal Finance</Header>
      <Paragraph>
        Provide access to your financial data so we can help you manage your
        budget and finances.
      </Paragraph>
      <TextInput
        label="Mobile number"
        returnKeyType="next"
        value={number}
        onChangeText={(text) => setNumber(text)}
        keyboardType="number-pad"
        editable={false}
        style={styles.unedit}
      />
      <Button mode="contained" onPress={getURL}>
        Provide Access
      </Button>
      <RedirectLink 
        toPage="Logout"
        linkText="Click here to logout and use a differnet number"
      />
      {/* {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null} */}
    </Background>
  );
}
