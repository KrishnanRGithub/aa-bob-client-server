import React, { useState } from 'react';
import { RefreshControl, ScrollView, View, StyleSheet, Animated,Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
import { theme } from '../core/theme';
const RefreshScreen = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [translateY] = useState(new Animated.Value(0));

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh()
    // .then(() => setRefreshing(false))
    // .catch(() => setRefreshing(false));
    setRefreshing(false)
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
        {children}
      </Animated.View>
    </ScrollView>
  );
};

export default RefreshScreen;