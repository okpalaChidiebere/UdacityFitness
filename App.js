import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component{

  store = createStore(reducer)

  render(){
    return (
      <Provider store={this.store}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', //to make the slider have full width of screen
    justifyContent: 'center',
  },
});
