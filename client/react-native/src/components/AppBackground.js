import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '../core/theme'

export default function AppBackground({ children }) {
  return (
    <View
      style={styles.container}
    >
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
})
