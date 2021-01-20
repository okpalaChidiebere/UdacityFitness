import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { purple, gray, white } from '../utils/colors'

export default function UdaciSteppers ({ max, unit, value, onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, 
    {justifyContent: 'space-between'}] //this will make the spaces between the row to be queal
    }>
      <View style={ //without this, the two child nodes that contains the touchables and units will not be arranged horizontally
        {flexDirection: 'row'}}>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name='minus' size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name='plus' size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { //we aligned the items(button) vertially along the center 
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
})