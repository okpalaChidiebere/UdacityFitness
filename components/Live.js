import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'

const Live = (props) =>  {
  /*state = {
    coords: null,
    status: null,
    direction: ''
  }
  */
 //Using React Hooks! It helps makes functional components stateful
    const [ state, setState ] = useState({
        coords: null,
        status: 'undetermined',
        direction: ''
    })

    const askPermission = () => {

    }

  
    const { status, coords, direction } = state

    /*There are few different views we display to the user dependig on the 
    permission the user granted our app to use */

    if (status === null) { //user hans't given us any permission yet
      return <View><ActivityIndicator style={{marginTop: 30}}/></View> //we just show a loading indicator
    }

    
    if (status === 'denied') {  //Here we ask for permission and the user did not giev our app permission
      return (
        <View>
          <Text>Denied</Text>
        </View>
      )
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You need to enable location services for this app.
          </Text>
          <TouchableOpacity style={styles.button} onPress={askPermission}>
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    return ( //At this point permission is granted
      <View style={styles.container}>
        <Text>Live</Text>
        <Text>{JSON.stringify(state)}</Text>
      </View>
    )
  
} 

export default Live

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between'
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    button: {
      padding: 10,
      backgroundColor: purple,
      alignSelf: 'center',
      borderRadius: 5,
      margin: 20,
    },
    buttonText :{
      color: white,
      fontSize: 20,
    }
}) 