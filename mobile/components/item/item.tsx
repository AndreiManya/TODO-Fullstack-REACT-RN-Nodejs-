import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

type ItemProps = {value: string, checked: boolean};

const Item = ({value, checked}: ItemProps) => (
  <View style={{...styles.item, backgroundColor: checked ? 'green' : 'red'}}>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  value: {
    fontSize: 20,
  },
});

export default Item;