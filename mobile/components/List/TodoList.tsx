import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
  Button,
} from 'react-native';
import Spinner from '../spinner/spinner';
import Item from '../item/item';

export interface TodoProps {
  _id: string,
  value: string,
  checked: boolean,
}

export interface InputProps {
  text: string,
  isError: boolean, 
}

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement | null>();

  const [list, setList] = useState<TodoProps[]>([]);
  const [value, setValue] = useState<InputProps>({text: '', isError: false});
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddTask = async () => { 
    try {
      if(value.text.length) { 
        inputRef?.current?.blur();
        setLoading(true);
        await fetch('http://172.20.10.2:8080/todo', 
        {
          method: "POST",     
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({value: value.text, checked: false})
        }).then((e) => e.json()).then((e) => {
          setList((prev) => [...prev, e as TodoProps]);
        });
        setLoading(false);
        return setValue({text: '', isError: false});
      }
      return setValue({...value, isError: true})
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
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
      <>
        {
          loading ?
            <Spinner/>
          :
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Make your own todos list</Text>
            <View style={styles.row}>
              <TextInput
                style={{...styles.input, borderColor: value.isError ? 'red' : 'black'}}
                inputMode="text"
                value={value.text}
                onChangeText={(e) => setValue({isError: false, text: e})}
                placeholder={value.isError ? 'Field is required' : ""}
                ref={inputRef}
              />
              <Button
                title="Add"
                onPress={handleAddTask}
              />
            </View>
            <FlatList
              data={list}
              renderItem={({item}) => <Item key={item._id} value={item.value} checked={item.checked} />}
              keyExtractor={item => item._id}
            />
          </SafeAreaView>
        }
      </>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderStyle: 'solid',
    borderColor: 'red',
    padding: 2
  }
});

export default TodoList;