import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'

class History extends Component {
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
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
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