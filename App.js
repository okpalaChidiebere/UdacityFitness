import React from 'react'
import { View, StyleSheet, Text, Slider } from 'react-native'
import AddEntry from './components/AddEntry'

export default class App extends React.Component{

  state = {
    value: 0
  }

  render(){
    return (
      <View style={styles.container}>
        <Slider
        minimumValue={-10}
        maximumValue={10}
        step={//to remove the decimals
          1}
        value={this.state.value}
        onValueChange={(value) => this.setState({value})}
        />
        <Text>Value: {this.state.value}</Text>
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
