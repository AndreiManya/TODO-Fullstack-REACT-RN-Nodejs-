import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

const Spinner = () => {

  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading...</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {},
    indicatorText: {
      fontSize: 18,
      marginTop: 12,
    },
  });

export default Spinner;