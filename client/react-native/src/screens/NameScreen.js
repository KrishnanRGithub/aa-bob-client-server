import React, {useEffect} from 'react'
import { ImageBackground, StyleSheet, Text,Image, View } from 'react-native'
import { theme } from '../core/theme'
import Logo from '../components/Logo';
import { useFonts } from 'expo-font';

export default NameScreen = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    'titleFont': require('../assets/title.ttf'),
  });
  if(fontsLoaded){


    setTimeout(() => {
        navigation.navigate('Login')
        }, 800)  

  return (
    <View style={styles.background} onStartShouldSetResponder={() => true} onResponderGrant={()=>navigation.navigate('Login')}>

    <ImageBackground
      resizeMode="repeat"
      style={styles.container}
    >
     <Image source={require('../assets/logo.png')} style={styles.image} />
    <Text style={{...styles.header}}>dhan</Text>
    <Text style={styles.subtext}>A financial product from Angris</Text>
     </ImageBackground>
    </View>

  );
  }
};



const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.surface,
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:90  
    },
    header: {
        fontSize: 60,
        color: theme.colors.primary,
        fontFamily: "titleFont",
        paddingVertical: 3,
      },
    subtext: {
        fontSize: 14,
        color: theme.colors.secondary,
        paddingVertical: 10,
        fontStyle:"italic"
      },
      image: {
        width: 150,
        height: 150,
      },
  })
  