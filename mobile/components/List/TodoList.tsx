import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
  Pressable,

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

  const handleRemove = async (id: string) => { 
    try {
        setLoading(true);
        await fetch(`http://172.20.10.2:8080/todo/${id}`, { method: "DELETE" });
        setList(prev => prev.filter((e) => e._id !== id));
        setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleTouch = async (id: string) => { 
    try {
        setLoading(true);
        let item = list.filter((e) => e._id === id)[0];
        await fetch(`http://172.20.10.2:8080/todo/${id}`, 
        {
          method: "PATCH",     
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({...item, 'checked': !item.checked})
        });
        setLoading(false);
        setList(prev => prev.map((todo: TodoProps) => todo._id === id ? {...todo, checked: !todo.checked} : todo));
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
              <Pressable 
                style={styles.button} 
                onPress={handleAddTask}
              >
                <Text style={styles.text}>Add</Text>
              </Pressable>
            </View>
            <FlatList
              data={list}
              renderItem={({item}) => 
                  <Item 
                    key={item._id}
                    id={item._id}
                    value={item.value} 
                    checked={item.checked} 
                    remove={(id: string) => handleRemove(id)}
                    check={(id: string) => handleTouch(id)}
                  />
              }
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default TodoList;