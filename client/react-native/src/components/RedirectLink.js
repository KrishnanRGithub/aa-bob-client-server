import React from 'react';
import { Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../core/theme'

const RedirectLink = ({toPage,linkText}) => {
  const navigation = useNavigation();

 
  const handlePress = () => {
    navigation.navigate(toPage);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.link}>{linkText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontStyle: 'italic',
    color: theme.colors.secondary,
  },
});

export default RedirectLink;