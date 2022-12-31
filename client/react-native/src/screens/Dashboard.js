import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import WebView from "react-native-webview";
const config = require("../../config");

export default function Dashboard({ navigation, route }) {
  const webviewRef = useRef(null);
  const redirect_url = config.server_url + "/redirect";

  const onNavigation = (navState) => {
    console.log(navState)
    if (navState.url.includes(redirect_url)) {
      navigation.navigate("Complete");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: route.params.param,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={onNavigation}
          style={styles.margin}
        />
      </SafeAreaView>
    </>
  );
}

  

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor:"#f8fafc"
    // AA background color
  },
  margin: {
    backgroundColor:"#f8fafc",
    marginTop: 50,
    marginLeft:15,
    marginRight:15
  },
});
