import AsyncStorage  from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
//import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'UdaciFitness:notifications'


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
}

/**Returns an object thatrepresents the notification */
function createNotification (time) {

    return{
        content: {
          title: "Log your stats!",
          body: "👋 Don't forget to log your data today!",
          sound: "email-sound.wav", // <- for Android below 8.0
          priority: "high",
          enableVibrate: true,
        },
        trigger: {
            time: tomorrow,
            repeates: true,
        },
    }
}

/*export const setLocalNotification = async () => {

    try {
        const jsonValue = await AsyncStorage.getItem(NOTIFICATION_KEY)
        const key = jsonValue != null && JSON.parse(jsonValue)

        if(key != mull){
            let token;
            if (Constants.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log(token);
            } else {
                alert('Must use physical device for Push Notifications');
            }
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}*/