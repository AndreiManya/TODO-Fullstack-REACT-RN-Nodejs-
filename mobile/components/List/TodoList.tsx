import React, { useState, useEffect } from 'react';
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


  useEffect(() =>{
    async function fetchData() {
      try {
        let resp = await fetch('http://172.20.10.2:8080/todo')
        .then(res => res.json())
        .then(comments => setList(comments as Array<TodoProps>));
        console.log(resp)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

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