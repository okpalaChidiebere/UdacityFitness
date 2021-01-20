import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'

export default class App extends React.Component{

  store = createStore(reducer)

  render(){
    return (
      <Provider store={this.store}>
        <View style={styles.container}>
          <History />
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
