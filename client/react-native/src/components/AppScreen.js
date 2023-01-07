import SplitScreenNavigator from './SplitScreenNavigator'
import React from 'react'
import { theme } from '../core/theme'
import RefreshScreen from './RefreshScreen'
import AppBackground from './AppBackground'
import AppHeader from './AppHeader'

export default function AppScreen({ prop,children }) {
  return (
    <RefreshScreen  onRefresh={prop.onRefresh}>
      <AppBackground>
        <AppHeader title={prop.title}></AppHeader>
        {prop.routes!=null?<SplitScreenNavigator routes={prop.routes} activeRoute={prop.activeRoute}></SplitScreenNavigator>:null}  
 
        {children}  
      </AppBackground>
    </RefreshScreen>
  )
}
