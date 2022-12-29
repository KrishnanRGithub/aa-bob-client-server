import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
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
  
    const doLogin = async () => {
      setLoading(true);
      const numberError = numberValidator(number.value);
  
      if (numberError) {
        setNumber({ ...number, error: numberError });
        setLoading(false);
      } else {
        try {
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
      <Paragraph>
        Login with your register mobile number to access your personal finance assistant
      </Paragraph>
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
        // value={pin.value}
        keyboardType="number-pad"
      />
      <Button mode="contained" onPress={doLogin}>
        Login
      </Button>
      <RedirectLink 
        toPage="Signup"
        linkText="New here ? Click here to signup"
      />
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
};


// export default function Login({ navigation }) {

//   return (
//     <Background>
//     </Background>
//   );
// }
