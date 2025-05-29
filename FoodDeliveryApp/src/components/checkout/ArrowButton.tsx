import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@unistyles/Constants';


interface ArrowButtonProps {
    title: string;
    onPress: () => void;
    price?: number;
    loading?: boolean;
}

const ArrowButton = () => {
  return (
    <View>
      <Text>ArrowButton</Text>
    </View>
  )
}

export default ArrowButton

const styles = StyleSheet.create({
    btn: {
        borderBlockColor: Colors.active,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginHorizontal: 15
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})