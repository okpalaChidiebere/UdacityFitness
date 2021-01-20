import React from "react";
import { View, StyleSheet } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { red, orange, blue, lightPurp, pink, white } from "./colors";


export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  /*
  The code above is thesame to 
  export function isBetween (num, x, y) {
   return (num >= x && num <= y)
 }
  */
  
  export function calculateDirection (heading) {
    let direction = ''
  
    if (isBetween(heading, 0, 22.5)) {
      direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
      direction = 'North'
    } else {
      direction = 'Calculating'
    }
  
    return direction
  }
  
  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }


  export function getMetricMetaInfo(metric) {

    //This object has the five properties which co-relates to the specific metrics that we are tracking
    const info = {
        /*The objects in here contains any information that will help us build the UI for our specific form*/

        run: { //information we need to know about run
            displayName: "Run",
            max: 50, //max miles you can run in a day
            unit: "miles",
            step: 1,
            type: "steppers", //input type can be a steppers(A button to increament or decreament) or slider(for slider we have to specify the number ranger we want the slider to have)
            getIcon() { //when this method is invoked we will get the icon for this specific metric 'run'
              return (
                <View style={[styles.iconContainer, {backgroundColor: red}]}>
                  <MaterialIcons name="directions-run" color={white} size={35} />
                </View>
              );
            }
        },
        bike: {
            displayName: "Bike",
            max: 100,
            unit: "miles",
            step: 1,
            type: "steppers",
            getIcon() {
              return (
                <View style={[styles.iconContainer, {backgroundColor: orange}]}>
                  <MaterialCommunityIcons name="bike" color={white} size={32} />
                </View>
              );
            }
          },
          swim: {
            displayName: "Swim",
            max: 9900,
            unit: "meters",
            step: 100,
            type: "steppers",
            getIcon() {
              return (
                <View style={[styles.iconContainer, {backgroundColor: blue}]}>
                  <MaterialCommunityIcons name="swim" color={white} size={35} />
                </View>
              );
            }
          },
          sleep: {
            displayName: "Sleep",
            max: 24,
            unit: "hours",
            step: 1,
            type: "slider",
            getIcon() {
              return (
                <View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
                  <FontAwesome name="bed" color={white} size={30} />
                </View>
              );
            }
          },
          eat: {
            displayName: "Eat",
            max: 10,
            unit: "rating",
            step: 1,
            type: "slider",
            getIcon() {
              return (
                <View style={[styles.iconContainer, {backgroundColor: pink}]}>
                  <MaterialCommunityIcons name="food" color={white} size={35} />
                </View>
              );
            }
          }
        };
      
        //if you dont pass in an argument when you invoke this function, we will return the whole object
        //but, if you pass in an argument(key to a desired metric), specifically the metric, then we just return just that metric 
        return typeof metric === "undefined" 
        ? info 
        : info[metric];
  }

  /*This method is called when we want to reset an entry for a specific day  */
  export function getDailyReminderValue () {
    return {
      today: "👋 Don't forget to log your data today!" //It's just "CMD + CTRL + Space" on Mac tp pick emojis


    }
  }

  const styles = StyleSheet.create({
    iconContainer: {
      padding: 5,
      borderRadius: 8,
      width: 50,
      height: 50,
      justifyContent: 'center', //set items inside of the icon container to be at the centre of the Main axix
      alignItems: 'center', //centre for the cross axix as well
      marginRight: 20
    },
  })