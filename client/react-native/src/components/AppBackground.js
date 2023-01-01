import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { theme } from '../core/theme'

export default function AppBackground({ children }) {
  return (
    <ScrollView
      style={styles.container}
    >
        {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
})
