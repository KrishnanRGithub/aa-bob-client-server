import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const Toast = ({ message, type }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  
  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: type === 'error' ? '#960505' : '#015c28',
        opacity: fadeAnim,
      }}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};





// const Toast = ({ message, type }) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const messageRef = useRef(message);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start();

//     const timeoutId = setTimeout(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }).start();
//     }, 3000);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [messageRef.current]);

//   return (
//     <Animated.View
//       style={{
//         ...styles.container,
//        backgroundColor: type === 'error' ? '#960505' : '#015c28',
//           opacity: fadeAnim,
//       }}
//     >
//       <Text style={styles.text}>{message}</Text>
//     </Animated.View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,  
  },
  text: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
});

export default Toast;