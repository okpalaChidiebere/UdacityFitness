/*
AsyncStorage is a simple, unencrypted, asynchronous, persistent(even 
    when you close the app and come back the data will be there), 
    key-value storage system that is global to the app. 
    Have similar concepts to SharedPreferences for android and LocalStorage for web browsers.

    So our app uses a local dabase instead of an external database
*/

import AsyncStorage  from '@react-native-async-storage/async-storage'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar' //This key indicates the location where we will persist our data inside our AsuncStorage

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      //data[key] = undefined //not necessary
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

export function fetchCalendarResults () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}