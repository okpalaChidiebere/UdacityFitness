import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES : //when this runs, state will always be first empty. THis is simialar action to initial data for your app
      return {
        ...state,
        ...action.entries, //the entries will be an object containing keys that reference a specific that with the value being the specific metric logged by the user for that day
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default entries