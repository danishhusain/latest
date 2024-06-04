import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Main from './src/screen/Main'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './src/component/Search';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>

      {/* <View style={{ flex: 1 }}>
        <Main />
      </View> */}
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})