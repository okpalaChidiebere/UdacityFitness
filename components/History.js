import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda as UdacityFitnessCalendar } from 'react-native-calendars'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import AppLoading from 'expo-app-loading'
import ENTRY_DETAILS_STACK from '../utils/constants'

class History extends Component {

    state = {
        ready: false,
    }

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

  renderItem = ({ today, ...metrics }, firstItemInDay, date) => {
      //console.log(today)
      const formattedDate = date.toString("yyyy-MM-dd")
    return(
    <View style={styles.item}>
      {today
        ? <View>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableOpacity
            onPress={() => this.props.navigation.navigate( //we have access to the navigation props because React navigation(Tab Navigation - TabNav) is controlling our Router and it is rendering the History Component
                ENTRY_DETAILS_STACK,
                { entryId: key } //pass any parameter we want to our router. eg for enrtyID we will be poassing props.route.params.entryId
            )}
          >
              <MetricCard date={formattedDate} metrics={metrics} />
          </TouchableOpacity>}
    </View>
    )}

  renderEmptyDate(date) { //we use the arrow function, because we are not using the 'this' keyword inside of it
    const formattedDate = date.toString("MMMM d, yyyy") //convert "2021-01-20T00:00:00.000Z" to Janyary 20, 2021
    return (
        <View style={styles.item}>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
                You didn't log any data on this day.
            </Text>
        </View>
    )
  }

  render() {
    const { entries } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
        <UdacityFitnessCalendar
        items={entries}
        renderItem={ //this will return  a JSX that will be rendered whenever the calendar is going to render a specific day
            this.renderItem}
        renderEmptyDate={// if that day is empty, the JSX returned by this function will be passed to this prop 'renderEmptyDate' 
            this.renderEmptyDate}
        />
    )
    /*
    When i add this it shows good data but my calendar does not work properly
    My calendar only renders 'renderEmptyDate' even when there is data
    <View>
            <ScrollView>
            <Text>{JSON.stringify(this.props)}</Text>
            </ScrollView>
            
        </View>
    */
  }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: white,
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
    },
    noDataText: {
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20
    }
})  


function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(History)