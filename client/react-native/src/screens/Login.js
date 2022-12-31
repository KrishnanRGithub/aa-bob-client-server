import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Toast from "../components/Toast";
import TextInput from "../components/TextInput";
import PinField from "../components/PinField";
import RedirectLink from "../components/RedirectLink";
import { ActivityIndicator, Linking } from "react-native";
import { numberValidator } from "../helpers/numberValidator";
import { Keyboard } from 'react-native';
import { storeSession,isSessionSet, clearSession } from "../helpers/sessionHandler";

const config = require("../../config");

export default Login = ({ navigation }) => {

  // clearSession("user").then((val)=>{
  //   if (val){
  //      console.log(val)
  //   }})

    const [number, setNumber] = useState("");
    const [pin, setPin] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState({message:null, type:null});
    const [renderPage, setRenderPage] = useState(false);
  
    useEffect(() => {
      return navigation.addListener("focus",()=>{
        isSessionSet("user").then((val)=>{
          if (val){
             console.log(val)
             navigation.navigate("StartScreen");
          }else{
            setShowToast(false)
            setNumber("")
            setLoading(false)
            setPin("")
            setRenderPage(true)
          }
        })
      })
    }, [navigation]);
    
    
    
    const doLogin = async () => {
      Keyboard.dismiss();
      setLoading(true)
      setShowToast(false)
      try{
        const validNumber = numberValidator(number);
        if (!validNumber) {
          setToastMsg({message:"Invalid mobile number",type:"error"})
          setShowToast(true);
          setLoading(false);
          return;
        }
        if(pin.length!=4){
          setToastMsg({message:"Fill the PIN",type:"error"})
          setShowToast(true);
          setLoading(false);
          return;
        }
        // validate pin so make api call for that
        let url = "http://"+config.server_url + "/user/login" ;
        const response = await fetch(url,  {
          method: "POST", 
          body: JSON.stringify({
                mobile: number,
                pin: pin,
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        });
    
        let msg = await response.json();
        setToastMsg({message:msg["msg"],type:msg["type"]})
        if(msg["auth"])
        {
            if(await storeSession("user",msg["user"]))
                navigation.navigate("StartScreen");
            else{
              setToastMsg({message:"Couldn't set session",type:"error"})
            }
        }        
      } catch (err) {
        console.error(err);
        setToastMsg({message:"Unexpected Error",type:"error"})
      } finally {
        setShowToast(true);
        setLoading(false);
      }
    };
    if(renderPage==false){
      return<></>
    }

  return (
    <Background>
      <Logo />
      <Header>Login</Header>
      <TextInput
        label="Mobile number"
        returnKeyType="next"
        value={number}
        onChangeText={(text) => setNumber(text)}
        keyboardType="number-pad"
      />
      <PinField
        onChange={text => setPin(text)}
        value={pin}
        // description={`4 Digit\nPin`}
        description={`Enter 4 Digit Pin`}
        keyboardType="number-pad"
      />
      <Button mode="contained" onPress={doLogin}>
        Login
      </Button>
      <RedirectLink 
        toPage="Signup"
        linkText="New here ? Click here to signup"
      />
      {showToast && (<Toast message= {toastMsg.message} type={toastMsg.type} />)}
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
};

