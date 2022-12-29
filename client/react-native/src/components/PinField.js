import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper'
import { theme } from '../core/theme'

const PinField = ({ onChange, ...props }) => {
  const [numbers, setNumbers] = useState([]);

  const handleChange = (number, index) => {
    const newNumbers = [...numbers];
    newNumbers[index] = number;
    setNumbers(newNumbers);
    onChange(newNumbers.join(''));
  };

  return (
    <View style={styles.container}>
        <Text style={styles.description}>Enter your 4-digit PIN:</Text>
        <View style={styles.inputContainer}>
            {[...Array(4)].map((_, index) => (
                <TextInput
                key={index}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleChange(text, index)}
                value={numbers[index]}
                autoFocus={index === 0}
                />
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-start',
    },
    description: {
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 220,
    },
    input: {
      height: 50,
      width: 50,
      textAlign: 'center',
    },
  });
  
  
export default PinField;