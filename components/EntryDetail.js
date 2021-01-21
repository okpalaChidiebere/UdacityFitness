import React, {Component} from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import MetricCard from './MetricCard'
import TextButton from './TextButton'

class EntryDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={reset} style={{margin: 20}}>
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

export default connect(mapStateToProps)(EntryDetail)

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