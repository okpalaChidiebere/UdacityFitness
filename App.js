import React from 'react'
import { View, StyleSheet, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  )
}

const Tabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator() //we show the tab at the bottom for android
    : createMaterialTopTabNavigator() //we show normal tab for androdi at the top of the screen

const HISTORY_TAB = 'History'
const ADD_ENTRY_TAB = 'Add Entry'

const TabNav = () => (
  <Tabs.Navigator
      initialRouteName={HISTORY_TAB}
      screenOptions={({ route }) => ({
          tabBarIcon: ({color, size}) => {
              let icon;
              switch (route.name) {
                case HISTORY_TAB : 
                  icon = ( <Ionicons name="ios-bookmarks" size={size} color={color}/> )
                  break 
                case ADD_ENTRY_TAB :
                  icon = ( <FontAwesome name="plus-square" size={size} color={color}/> )
                  break                 
              }
              return icon;
          }
      })}
      tabBarOptions={{
          header: null,
          activeTintColor: Platform.OS === "ios" ? purple : white,
          showIcon: true,
          style: {
              height: 80,
              backgroundColor: Platform.OS === "ios" ? white : purple,
              shadowColor: "rgba(0, 0, 0, 0.24)",
              shadowOffset: {
                  width: 0,
                  height: 3
              },
              shadowRadius: 6,
              shadowOpacity: 1
          }
      }}
  >
    <Tabs.Screen name={HISTORY_TAB} component={History}/>
    <Tabs.Screen name={ADD_ENTRY_TAB} component={AddEntry} />
  </Tabs.Navigator>
)

export default class App extends React.Component{

  store = createStore(reducer)

  render(){
    return (
      <Provider store={this.store}>
        <View style={styles.container}>
          <NavigationContainer>
          <UdaciStatusBar backgroundColor={purple} barStyle={// makes all of the items in the StatusBar white
            "light-content"} />
            <TabNav />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //we want this component to take up all the available space. This way, any of its childeren components will be able to expand the fullsize of the phone
    backgroundColor: '#fff',
    alignItems: 'stretch', //to make the slider have full width of screen
  },
});
