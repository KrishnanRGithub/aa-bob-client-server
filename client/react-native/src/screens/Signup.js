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
import { storeSession,isSessionSet } from "../helpers/sessionHandler";


const config = require("../../config");

export default function Signup({ navigation }) {
    const [number, setNumber] = useState({ value: "", error: "" });
    const [pin, setPin] = useState({ value: "", error: "" });
    const [repin, setRepin] = useState({ value: "", error: "" });
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
            setPin(false)
            setRepin(false)
            setRenderPage(true)
          }
        })
      })
    }, [navigation]);
    
    const doSignup = async () => {
      Keyboard.dismiss();
      setLoading(true)
      setShowToast(false)
      try{

        const validNumber = numberValidator(number.value);
        if (!validNumber) {
          setToastMsg({message:"Invalid mobile number",type:"error"})
          setShowToast(true);
          setLoading(false);
          return;
        } 

        if(pin.value.length!=4){
          setToastMsg({message:"Fill the PIN",type:"error"})
          setShowToast(true);
          setLoading(false);
          return;
        }
        if(pin.value!==repin.value){
          setToastMsg({message:"Pin doesnt match",type:"error"})
          setShowToast(true);
          setLoading(false);
          return;
        }
       
        // validate pin so make api call for that
        let url = "http://"+config.server_url + "/user/signup" ;
        const response = await fetch(url,  {
          method: "POST", 
          body: JSON.stringify({
                mobile: number.value,
                pin: pin.value,
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        });
    
        let msg = await response.json();
        setToastMsg({message:msg["msg"],type:msg["type"]})
        setShowToast(true);
        setLoading(false);  
        // navigation.navigate("Dashboard", { param: AaUrl });
        
      } catch (err) {
        console.error(err);
        setToastMsg({message:"Unexpected Error",type:"error"})
        setShowToast(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }

    };

    if(renderPage==false){
      return<></>
    }
  return (
    <Background>
    <Logo />
    <Header>Create Account</Header>
    <TextInput
      label="Mobile number"
      returnKeyType="next"
      value={number.value}
      onChangeText={(text) => setNumber({ value: text, error: "" })}
      error={!!number.error}
      errorText={number.error}
      keyboardType="number-pad"
    />
    <PinField
      onChange={pin => setPin({value:pin,error:""})}
      value={pin.value}
      description={`Set 4 Digit Pin`}
      keyboardType="number-pad"
    />
    <PinField
      onChange={repin => setRepin({value:repin,error:""})}
      value={repin.value}
      description={`Re-Enter 4 Digit Pin`}
      keyboardType="number-pad"
    />
    <Button mode="contained" onPress={doSignup}>
      Create Account
    </Button>
    <RedirectLink 
      toPage="Login"
      linkText="Existing user ? Click here to login"
    />
    {showToast && (<Toast message= {toastMsg.message} type={toastMsg.type} />)}
    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
  </Background>
  );
}
