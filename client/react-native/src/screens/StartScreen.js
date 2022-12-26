import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import { ActivityIndicator, Linking } from "react-native";
import { numberValidator } from "../helpers/numberValidator";
// import { StyleSheet, WebView, Platform} from 'react-native-webview';

const config = require("../../config");



// open your gateway

export default function StartScreen({ navigation }) {
  const [number, setNumber] = useState({ value: "", error: "" });
  const [isLoading, setLoading] = useState(false);

  const getURL = async () => {
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
      <Header>Personal Finance</Header>
      <Paragraph>
        Provide access to your financial data so we can help you manage your
        budget and finances.
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
      <Button mode="contained" onPress={getURL}>
        Provide Access
      </Button>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
}
