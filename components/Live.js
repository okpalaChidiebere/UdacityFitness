import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { calculateDirection } from '../utils/helpers'

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
        status: 'null',
        direction: ''
    })

    const askPermission = () => {

    }

    const setLocation = async () => {
        let { coords } = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 100, //we want to location to update as quickly as possible
            distanceInterval: 1
           })
        const newDirection = calculateDirection(coords.heading) //returns eh North, NorthEast, etc
        setState((curr) => ({
            coords,
            status: 'granted',
            direction: newDirection
        }))
    }

    //useEffect is similar to componentDidMount for class Components
    useEffect(() => {
        (async () => {
            try{
                let { status } = await Permissions.getAsync(Permissions.LOCATION) //ask the user for permission
                if (status === 'granted') {
                    return setLocation()
                }
                setState({
                    status
                })
            }catch(e){
                console.warn("Error getting location permission")
                setState({status: 'undetermined'})
            }
        })()
    }, [])
    

  
    const { status, coords, direction } = state

    /*There are few different views we display to the user dependig on the 
    permission the user granted our app to use */

    if (status === null) { //user hans't given us any permission yet
      return <View><ActivityIndicator style={{marginTop: 30}}/></View> //we just show a loading indicator
    }

    
    if (status === 'denied') {  //Here we ask for permission and the user did not giev our app permission
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enabling location services for this app.
          </Text>
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
        <View style={styles.directionContainer}>
            <Text style={styles.header}>You're heading</Text>
            <Text style={styles.direction}>
                North
            </Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Altitude
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
              {200} feet
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Speed
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
              {300} MPH
            </Text>
          </View>
        </View>
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
    },
    directionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      fontSize: 35,
      textAlign: 'center',
    },
    direction: {
      color: purple,
      fontSize: 120,
      textAlign: 'center',
    },
    metricContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: purple,
    },
    metric: {
      flex: 1,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    subHeader: {
      fontSize: 25,
      textAlign: 'center',
      marginTop: 5,
    },
}) 