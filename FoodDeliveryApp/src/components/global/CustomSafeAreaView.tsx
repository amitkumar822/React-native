import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { Colors } from '@unistyles/Constants'

interface CustomeSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView:FC<CustomeSafeAreaViewProps> = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </View>
  )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
})