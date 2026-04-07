import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function TabSettings() {
  return (
    <View style={styles.container}>
      <Text>TabSettings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
