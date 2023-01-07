import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
const Footer = () => {
    const [fontsLoaded] = useFonts({
        'titleFont': require('../assets/title.ttf'),
      });
    if(fontsLoaded){
        return (
            <View style={styles.container}>
                <Image source={require('../assets/footer.png')} style={styles.image} />
                <Text style={styles.text}>© 2023 Angris</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // centers the items horizontally
    justifyContent: 'center', // centers the items vertically
  },
  image: {
    width: "50%",
    height: 72,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'noteFont',
  },
});

export default Footer;