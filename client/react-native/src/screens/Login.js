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

const config = require("../../config");

export default Login = ({ navigation }) => {
    const [number, setNumber] = useState({ value: "", error: "" });
    const [pin, setPin] = useState({ value: "", error: "" });
    const [isLoading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const doLogin = async () => {
      console.log(pin.value)
      setLoading(true);
      setShowToast(true);

      setNumber({ ...number, error: "numberError" });
      return
      const numberError = numberValidator(number.value);
      if (numberError) {
        setNumber({ ...number, error: numberError });
        setLoading(false);
      } else {
        try {
 
          // validate pin so make api call for that
          let url = "http://"+config.server_url + "/init/" + number.value;
          console.log(url);
  
          const response = await fetch(url,  {headers: {
            'Content-Type': 'application/json'
          }});
          console.log("Response fetched from AA");
  
          const AaUrl = await response.text();
          console.log("Fetched Response AaURL : "+AaUrl);
          // Linking.openURL(AaUrl);
     
          // return <Link source={{ uri: AaUrl }} />;
          navigation.navigate("Dashboard", { param: AaUrl });
        } catch (error) {
          console.error(error + " Start Screen");
        } finally {
          setLoading(false);
        }
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
      {showToast && (
        <Toast message="This is a success message" type="success" />
      )}
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
};

