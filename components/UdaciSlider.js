import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
        <Slider
        style={//this will make to take up the space of its parent. So the slider wil appear with full width
          {flex: 1}}
        maximumValue={max}
        minimumValue={0}
        step={step}
        value={value}
        onValueChange={onChange}
        />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
})