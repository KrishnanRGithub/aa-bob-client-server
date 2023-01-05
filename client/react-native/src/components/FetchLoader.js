import React from 'react'
import { Image, StyleSheet,Text } from 'react-native'
import { useFonts } from 'expo-font';

export default function FetchLoader() {
    const [fontsLoaded] = useFonts({
        'noteFont': require('../assets/note.ttf'),
      });
      if(fontsLoaded){
    
    
        return<>
        <Image source={require('../assets/onstart-loading.gif')} style={styles.image} />
        <Text style={styles.note}>Note : Ensure that you have given access in AA</Text>
        </> 
      }
}

const styles = StyleSheet.create({
  image: {
    marginTop: 200,
    width: 110,
    height: 110,
    marginBottom: 8,
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "noteFont",
    fontSize:14
  }
})
