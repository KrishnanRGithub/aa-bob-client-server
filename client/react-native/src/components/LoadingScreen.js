import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/loading.gif')} // This is the path to your GIF file
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"wheat",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 100,
    height: 100,
  }
});

export default LoadingScreen;




// import React ,{useEffect,useRef} from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import loading from '../assets/icons/loading.json'; // This is the path to your loading animation file
// import LottieView from 'lottie-react-native'; // This is the Lottie library for rendering animations

// const LoadingScreen = ({autoplay = true, loop = true, speed = 1.5}) => {

//     const animation = useRef(null);

//   return (

//     <View style={styles.container}>
//       <LottieView 
//         source={loading} 
//         autoPlay={true}
//         loop={true}
//         ref={animation}
//         style={styles.icon}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:"wheat"

//   },
//   icon:{
//     height:150,
//     width:150,
//   }
// });

// export default LoadingScreen;