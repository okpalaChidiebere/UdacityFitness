import React, { Component } from "react"
import { View, TouchableOpacity, Text, StyleSheet ,Platform } from "react-native"
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers"
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from "@expo/vector-icons";
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from "../utils/colors";



//component for our submit button
function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={
      Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
    }
      onPress={//note: 'onPress' in React native is equivalent to onClick in normal React
        onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

/*This Component is a form for our fitness app. The user can log an activity with this form */
class AddEntry extends Component {

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

    this.props.dispatch(addEntry({
      [key]: entry //remeber we identify each entry by their date it was entered in our Reduc store
    }))

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
    //whenever reset runs you want to update the value data for that specific day to be the default value for the specific day
    this.props.dispatch(addEntry({ 
      [key]: getDailyReminderValue()
    }))

    // Route to Home

    // Update "DB". NOTE: we used AsyncStorage which allows data persistene even when the phone or app closes. 
    //It shares similar concepts with Preferences and SharedPreferences for Android phones and LoaclStorage for webBrowsers
    removeEntry(key)
  }

  render() {

    const metaInfo = getMetricMetaInfo() //gets the whole object

    if (this.props.alreadyLogged) { //eventually we will pass this.props.alreadyLogged
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === "ios" ? "ios-happy-outline" : "md-happy-outline"} size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }


    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        <Text>{ //for debugging
        /*JSON.stringify(this.state)*/}</Text>
        {Object.keys(metaInfo).map((key) => { 
          const { getIcon, type, ...rest } = metaInfo[key] //get each object based on th key
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: white
  },
  row: { //styling each row for a meta data entry information for this form
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  center: { //used for styling the view that will show when the user has already logged theor info
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});


function mapStateToProps (state) {
  const key = timeToString()

  return {
    //if state[key] is null or statkey[key] has a today propery it means the user has not logged any information for that day so alreadyLogged will be false 
    /*Remeber we have three section in 
    - we could have an object with all of its properties where state[key] has an enty
    - A section where state[key] is null we print 'You didnt log any data for this day'
    - Lastly Where state[key] has a today property which is default when no entry has been logged for that day */
    //rememeber key is the day for that day! 
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(
  mapStateToProps
)(AddEntry)