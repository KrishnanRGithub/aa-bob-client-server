import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListButton = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.text}</Text>
        <Icon name={item.icon} size={24} color="#000" /> 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.2,
  },
  text: {
    fontSize: 18,
  },
});

export default ListButton;
