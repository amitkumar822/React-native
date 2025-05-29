import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'

const CartHOC:FC = () => {
    const dispatch = useAppDispatch();
    // const carts = useAppSelector(state => state.cart)


  return (
    <View>
      <Text>CartHOC</Text>
    </View>
  )
}

export default CartHOC