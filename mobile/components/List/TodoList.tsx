import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import Item from '../item/item';

export interface TodoProps {
  id: number,
  value: string,
  checked: boolean,
}

const TodoList = () => {
  const [list, setList] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Make your own todos list</Text>
      <FlatList
        data={list}
        renderItem={({item}) => <Item value={item.value} checked={item.checked} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10
  },
});

export default TodoList;