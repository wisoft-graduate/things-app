import React from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Navigator from './src/navigation'
import { StatusBar } from 'react-native'
import useGetUserInfo from './src/@common/hooks/useGetUserInfo'

function App(): React.JSX.Element {
  useGetUserInfo()

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
