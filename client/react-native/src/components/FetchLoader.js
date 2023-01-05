import React from 'react'
import { Image, StyleSheet,Text } from 'react-native'

export default function FetchLoader() {
  return<>
  <Image source={require('../assets/onstart-loading.gif')} style={styles.image} />
  <Text style={styles.note}>Note : Ensure that you have given access in AA</Text>
  </> 
}

const styles = StyleSheet.create({
  image: {
    marginTop: 150,
    width: 110,
    height: 110,
    marginBottom: 8,
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:14
  }
})
