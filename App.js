import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddEntry from './components/AddEntry'

export default class App extends React.Component{

  render(){
    return (
      <View style={styles.container}>
        <AddEntry/>
      </View>
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
