import React, { Component } from "react"
import { View } from "react-native"
import { getMetricMetaInfo } from "../utils/helpers"

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
  
  render() {
    return <View>{getMetricMetaInfo("run").getIcon()}</View>
  }
}