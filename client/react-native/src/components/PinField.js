import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper'
import { theme } from '../core/theme'

const PinField = ({ onChange, description, ...props }) => {
  const [numbers, setNumbers] = useState([]);

  // useEffect(() => {
  //     setNumbers([]);
  // }, [value]);


  const handleChange = (number, index) => {
    const newNumbers = [...numbers];
    newNumbers[index] = number;
    setNumbers(newNumbers);
    onChange(newNumbers.join(''));
  };

  return (
    <View style={styles.container}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.inputContainer}>
            {[...Array(4)].map((_, index) => (
                <TextInput
                key={index}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleChange(text, index)}
                value={numbers[index]}
                secureTextEntry
                />
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width:"100%",
      alignItems: 'flex-start',
    },
    description: {
      marginBottom: 3,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "100%",
      marginBottom: 10,
    },
    input: {
      height: 50,
      width: "23%",
      backgroundColor:"wheat",

      textAlign: 'center',
    },
  });
  
  
export default PinField;

// const styles = StyleSheet.create({
//   container: {
//   flexDirection: 'row',
//   },
//   description: {
//     fontWeight:"500",
//     flex: 1,
//     fontSize:15,
//     marginBottom: 10,
//     alignSelf: 'center',
//     textAlign:"center",
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: 220,
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     width: 50,
//     backgroundColor:"wheat",
//     textAlign: 'center',
//   },
// });