import React, { useState } from "react";
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

const config = require("../../config");

export default Login = ({ navigation }) => {
    const [number, setNumber] = useState({ value: "", error: "" });
    const [pin, setPin] = useState({ value: "", error: "" });
    const [isLoading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState({message:null, type:null});

    const doLogin = async () => {
      Keyboard.dismiss();
      setLoading(true)
      setShowToast(false)
      try{
        if(pin.value.length!=4){
          setToastMsg({message:"Fill the PIN",type:"error"})
          setShowToast(true);
          setLoading(false);
        }
        const numberError = numberValidator(number.value);
        if (numberError) {
          setToastMsg({message:"Invalid mobile number",type:"error"})
          setShowToast(true);
          setLoading(false);
        } else {
            // validate pin so make api call for that
            let url = "http://"+config.server_url + "/user/login" ;
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
        }
      } catch (err) {
        console.error(err);
        setToastMsg({message:"Unexpected Error",type:"error"})
        setShowToast(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Background>
      <Logo />
      <Header>Login</Header>
      <TextInput
        label="Mobile number"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: "" })}
        keyboardType="number-pad"
      />
      <PinField
        onChange={pin => setPin({value:pin,error:""})}
        value={pin.value}
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

