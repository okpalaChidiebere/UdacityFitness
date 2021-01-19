import React from 'react'
import { View,
  Text,
  StyleSheet,
  TouchableHighlight, //transform a button from its primary color to another color whn you press on it
  TouchableNativeFeedback, //only supported on android. it gives the button a ripple effect is only for android
  TouchableOpacity, //makes the button to be opaque when clicked so the background of the app will be seen through the button
  TouchableWithoutFeedback, //basically a raw button with no feedback. DONT use this too much because nativ app is all about feedback from UI to user
 } from 'react-native'
import AddEntry from './components/AddEntry'

export default function App() {

  const handlepress = () => {
    alert('hello')
    //you use TouchableHighlight and TouchableOpacity often
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight 
      style={styles.btn} 
      onPress={handlepress} 
      underlayColor={ //color to show when the button is pressed
        '#d4271b'}>
          <Text style={styles.btntext}>Touchable Highlight</Text>
      </TouchableHighlight>
      <TouchableOpacity 
      style={styles.btn} 
      onPress={handlepress} >
          <Text style={styles.btntext}>Touchable Opacity</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback
      onPress={handlepress} >
          <View style={styles.btn} >
            <Text style={styles.btntext}>Touchable Without feedback</Text>
          </View>
      </TouchableWithoutFeedback>
      <TouchableNativeFeedback
      backgroundColor={TouchableNativeFeedback.SelectableBackground(0.1)}
      onPress={handlepress} >
          <View style={styles.btn} >
            <Text style={styles.btntext}>Touchable Native feedback</Text>
          </View>
      </TouchableNativeFeedback>
    </View>
  )
}
//<AddEntry />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#e53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btntext: {
    color: '#fff'
  }
});
