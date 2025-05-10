import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View>
      <Text style={styles.text}>
        Hello Amit
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    paddingTop: "50%",
  }
})

export default App;
