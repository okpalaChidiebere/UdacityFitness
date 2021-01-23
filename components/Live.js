import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

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
        status: null,
        direction: ''
    })

  
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
        <View>
          <Text>undetermined</Text>
        </View>
      )
    }

    return ( //At this point permission is granted
      <View>
        <Text>Live</Text>
        <Text>{JSON.stringify(state)}</Text>
      </View>
    )
  
} 

export default Live