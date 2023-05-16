import React, { useState } from 'react';
import Todo from '../todo/todo';
import { Typography, Input, Button, List } from 'antd';
import { TodoProps, InputProps } from '../../interface/todo';

const TodoList = () => {
  const { Title } = Typography;
  const [list, setList] = useState<TodoProps[]>([{id: 1, value: 'First todo', checked: false}]);
  const [value, setValue] = useState<InputProps>({text: '', isError: false});
  const [modal, setModal] = useState<boolean>(false);

  const setChecked = (id: number) => { 
    setList(prev => prev.map((todo: TodoProps) => todo.id === id ? {...todo, checked: !todo.checked} : todo));
  }
  const handlerAddTask = () => { 
    if(value.text.length) { 
      setList((prev) => [...prev, { id: prev.length + 1, value: value.text, checked: false} as TodoProps]);
      return setValue({text: '', isError: false});
    }
    return setValue({...value, isError: true})
  }
  const handleModal = (id: number) => { 
    setModal((prev) => !prev);
  }

  const handleRemove = (id: number) => { 
    setList((prev) => [...prev, { id, value: value.text, checked: false} as TodoProps]);
  }

  return (
    <>
      <Title> Make your own todos list </Title>
      <div className='flex'>
        <Input 
          required
          className='input'
          status={value.isError ? 'error' : ''}
          placeholder={value.isError ? 'Field is required' : ""}
          value={value.text}
          onChange={(e) => setValue({isError: false, text: e.target.value})}
        />
        <Button
          onClick={handlerAddTask}
        >
          Add
        </Button>
      </div> 
      <List
        size="large"
        bordered
        dataSource={list}
        renderItem={(e) =>             
        (
          <Todo 
            key={e.id} 
            id={e.id} 
            value={e.value} 
            checked={e.checked} 
            setChecked={(id: number) => setChecked(id)}
            openModal={(id: number) => handleModal(id)}
            removeTodo={(id: number) => handleRemove(id)}
          />
        )}
      />
    </>
  );
}

export default TodoList;
