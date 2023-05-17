import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableHighlight
} from 'react-native';

type ItemProps = {
  value: string, 
  checked: boolean, 
  id: string,
  remove: Function,
  check: Function

};
const Item = ({value, checked, id, remove, check}: ItemProps) => (
  <TouchableHighlight
    onPress={() => check(id)}
  >
      <View style={{...styles.item, backgroundColor: checked ? 'green' : 'red'}}>
        <Text style={styles.value}>{value}</Text>
        <Pressable 
          style={styles.button} 
          onPress={() => remove(id)}
        >
          <Text style={styles.text}>Del</Text>
        </Pressable>
      </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  value: {
    fontSize: 20,
    padding: 10,
    flex: 1, 
    flexWrap: 'wrap'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default Item;