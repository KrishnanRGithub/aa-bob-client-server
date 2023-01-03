import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import { RefreshControl, ScrollView, View, StyleSheet, Animated,Dimensions,Image } from 'react-native';
const screenHeight = Dimensions.get('window').height;
import { theme } from '../core/theme';
const RefreshScreen = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [translateY] = useState(new Animated.Value(0));
  const [fetching, setFetching] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setFetching(true);
    onRefresh()
    // .then(() => setRefreshing(false))
    // .catch(() => setRefreshing(false));
    setTimeout(()=>{setFetching(false)}, 7000); 
    setRefreshing(false);

};

  const handleScrollBeginDrag = () => {
    Animated.timing(translateY, {
      toValue: -60,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleScrollEndDrag = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // if(refreshing){
  //   return <LoadingScreen/>
  // }
  return (
    <ScrollView
    style={{backgroundColor: theme.colors.surface}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}

        />
      }
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
    >

      <Animated.View style={{ transform: [{ translateY }] }}>
      
        <View style={styles.center}>
            {fetching ? <Image source={require('../assets/icons/fetch.gif')} style={styles.fetch}/> : null}
        </View>

        {children}
      </Animated.View>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  fetch: {
    position:'absolute',
    zIndex:20,
    top:7,
    right:10,
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
  },
  center: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
export default RefreshScreen;