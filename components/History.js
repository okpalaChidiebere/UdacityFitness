import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda as UdacityFitnessCalendar } from 'react-native-calendars'

class History extends Component {

    state = {
        ready: false,
    };

  componentDidMount () {
    const { dispatch } = this.props

    fetchCalendarResults() //we receive our entries from AnsycStorgae
      .then((entries) => dispatch(receiveEntries(entries))) //add it to our Redux Store with the results
      .then(({ entries }) => {
        if (!entries[timeToString()]) { //if we dont have any entries for today
          dispatch(addEntry({ //we set the default daily reminder text as the data for that day in the Store, So this will show up in the UI
            [timeToString()]: getDailyReminderValue() 
          }))
        }
      })
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
      console.log(today)
    return(
    <View>
      {today
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text>}
    </View>
  )}
  renderEmptyDate(formattedDate) { //we use the arrow function, because we are not using the 'this' keyword inside of it
    return (
      <View>
        <Text>No Data for this day</Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props
    return (
        <UdacityFitnessCalendar
        items={entries}
        renderItem={ //this will return  a JSX that will be rendered whenever the calendar is going to render a specific day
            this.renderItem}
        renderEmptyDate={// if that day is empty, the JSX returned by this function will be passed to this prop 'renderEmptyDate' 
            this.renderEmptyDate}
        />
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(History)