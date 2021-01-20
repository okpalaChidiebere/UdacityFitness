import React, { Component } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { getMetricMetaInfo, timeToString } from "../utils/helpers"
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from "@expo/vector-icons";
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'


//component for our submit button
function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={//note: 'onPress' in React native is equivalent to onClick in normal React
        onPress}>
        <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

/*This Component is a form for our fitness app. The user can log an activity with this form */
export default class AddEntry extends Component {

  state = {
    //stepper input metrics
    run: 0,
    bike: 0,
    swim: 0,
    //end steppr input metrics
    //slider inputs
    sleep: 0,
    eat: 0,
    //end slider input metrics
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      //add step to the current state
      const count = state[metric] + step

      return {
        ...state,
        [metric]: Math.min(count, max), //we dont want the metrix to go above the max. So when count start to go above max, this function will return the max(which is smaller than count at that point)
        //[metric]: count > max ? max : count,
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      //subtract step from the current state
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: Math.max(0, count), //making sure we dont go below 0. So when count starts to go to the negative, this functiion will return 0
        //[metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }
  submit = () => {
    const key = timeToString() //key we will use to identify an information submitted by this form,  is the time
    const entry = this.state //get all the matrices logged in but the user

    // Update Redux

    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 })) //reset the form to empty

    // Navigate to home

    // Save to "DB". NOTE: we used AsyncStorage which allows data persistene even when the phone or app closes. 
    //It shares similar concepts with Preferences and SharedPreferences for Android phones and LoaclStorage for webBrowsers
    submitEntry({ key, entry })

    // Clear local notification so that the user dont get a notification to submit their information for this day
  }
  reset = () => {
    const key = timeToString();

    // Update Redux

    // Route to Home

    // Update "DB". NOTE: we used AsyncStorage which allows data persistene even when the phone or app closes. 
    //It shares similar concepts with Preferences and SharedPreferences for Android phones and LoaclStorage for webBrowsers
    removeEntry(key)
  }

  render() {

    const metaInfo = getMetricMetaInfo() //gets the whole object

    if (true) { //eventually we will pass this.props.alreadyLogged
      return (
        <View>
          <Ionicons name={"md-happy-outline"} size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }


    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        <Text>{ //for debugging
        /*JSON.stringify(this.state)*/}</Text>
        {Object.keys(metaInfo).map((key) => { 
          const { getIcon, type, ...rest } = metaInfo[key] //get each object based on th key
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}