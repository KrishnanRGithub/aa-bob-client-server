import React from 'react';
import { Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../core/theme'
import { useFonts } from 'expo-font';

const RedirectLink = ({toPage,linkText}) => {
  const navigation = useNavigation();

 
  const handlePress = () => {
    navigation.navigate(toPage);
  };
  const [fontsLoaded] = useFonts({
    'noteFont': require('../assets/note.ttf'),
  });
  if(fontsLoaded){
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  link: {
    color: theme.colors.secondary,
    fontFamily: "noteFont",
  },
});

export default RedirectLink;