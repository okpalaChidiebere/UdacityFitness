import React, {Component} from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import MetricCard from './MetricCard'
import TextButton from './TextButton'
import { addEntry } from '../actions'

class EntryDetail extends Component {

    //If this was a functional component we will use React.memo to attach this function like
    //expor default React.memo(EntryDetail, shouldComponentUpdate)
    shouldComponentUpdate (nextProps) { //This function must return true if you want your Component to render
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    reset = () => {
        const { remove, goBack, entryId } = this.props //note remove, and goBack is coming in from mapDispatchToProps while entryId comes from mapStateToProps
        remove()
        goBack()
        removeEntry(entryId)
    }

    render() {
        const { metrics } = this.props
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    RESET
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
    }
})

function mapStateToProps(state, { route }) {
    const { entryId } = route.params
    return {
      entryId,
      metrics: state[entryId]
    }
}

function mapDispatchToProps (dispatch, { route, navigation }) { //two argumnets, dispatch for Redux Store and ownProps
    const { entryId } = route.params
  
    //return two methods
    return {
        //this method will remove item for a specific day from our store
      remove: () => dispatch(addEntry({
        [entryId]: timeToString() === entryId
          ? getDailyReminderValue() //we reset the data to default value if the key is today
          : null
      })),
      //allow us to navigate back to the home view
      goBack: () => navigation.goBack()
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)

export function EntryDetailNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props
    const { entryId } = route.params
    const year = entryId.slice(0, 4)
    const month = entryId.slice(5, 7)
    const day = entryId.slice(8)
    return{
        //Styling the header for this Component
        headerTintColor: white,
        headerStyle: {
            backgroundColor: purple,
        },
        //End Etyling header for this Component
        title: `${month}/${day}/${year}`, //this ttitle appear at the center of the header with backbutton to the left end of the header
    }
}