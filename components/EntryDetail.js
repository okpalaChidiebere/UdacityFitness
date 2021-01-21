import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { purple, white } from '../utils/colors'

class EntryDetail extends Component {
    render() {
        return (
            <View>
                <Text>Entry Detail - {JSON.stringify(this.props.route.params.entryId)}</Text>
            </View>
        )
    }
}

export default EntryDetail

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