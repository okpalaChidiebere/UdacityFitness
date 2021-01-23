import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
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
        coords: {
            //we will only need this two fields from the coords object return by the callback funtion
            // more https://docs.expo.io/versions/latest/sdk/location/#locationobject
            altitude: 0,
            speed: 0,
        },
        status: 'null',
        direction: '',
    })
    const bounceValue = useRef(new Animated.Value(1)).current;

    const askPermission = async () => {
        try{
            let { status } = Permissions.askAsync(Permissions.LOCATION)
            if(status === 'granted') {
                return setLocation()
            }
            setState({status})
        }catch(e){
            console.warn("Error asking location permission", e);
            setState({status: 'undetermined'})
        }
    }

    const setLocation = async () => {
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 100, //we want to location to update as quickly as possible
            distanceInterval: 1
           }, ({coords}) => {
               const newDirection = calculateDirection(coords.heading) //returns eh North, NorthEast, etc
                const { direction } = state //help us update the direction in realtime

                if (newDirection !== direction) { //compare the new direction against the old direction
                    Animated.sequence([
                      Animated.timing(bounceValue, { useNativeDriver: true, duration: 200, toValue: 1.04}), //our first animation of the bounce value will be timed
                      Animated.spring(bounceValue, { useNativeDriver: true, toValue: 1, friction: 4 }) //we will take our bounceValue down to 1
                    ]).start() //always call .start on your animations
                }
             
                setState((curr) => ({
                    coords,
                    status: 'granted',
                    direction: newDirection
                }))
           })
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
            <Animated.Text 
            style={ //tie the bounceValue to our UI
                [styles.direction, {transform: [{scale: bounceValue}]}]}>
                {direction}
            </Animated.Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              {Math.round(coords.altitude * 3.2808)} feet
            </Text>
            <Text style={[styles.subHeader, {color: white}]}>
              {200} feet
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
            {(coords.speed * 3.2369) } Speed
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