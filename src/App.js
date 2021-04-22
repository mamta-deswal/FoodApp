import 'react-native-gesture-handler'
import React from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import createStore from './Stores';
const { store, persistor } = createStore()
import { enableScreens } from 'react-native-screens'
enableScreens()

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default App
