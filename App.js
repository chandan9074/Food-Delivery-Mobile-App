import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
// import {createSwitchNavigator} from "react-navigation"

import {Home, OrderDelivery, Resturant} from './screens'
import Tabs from './components/Navigations/Tabs'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown : false
      }}
      initialRouteName="Home"
      >
        <Stack.Screen name='Tabs' component={Tabs} />
        <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
        <Stack.Screen name='Resturant' component={Resturant} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
