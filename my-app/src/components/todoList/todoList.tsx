import React, { useState } from 'react';
import Todo from '../todo/todo';
import { Typography, Input, Button } from 'antd';
import { TodoProps, InputProps } from '../../interface/todo';

const TodoList = () => {
  const { Title } = Typography;
  const [list, setList] = useState<TodoProps[]>([{id: 1, value: 'First todo', checked: false}]);
  const [value, setValue] = useState<InputProps>({text: '', isError: false});

  const setChecked = (id: number) => { 
    setList(prev => prev.map((todo: TodoProps) => todo.id === id ? {...todo, checked: !todo.checked} : todo));
  }
  const handlerAddTask = () => { 
    if(value.text.length) { 
      setList((prev) => [...prev, { id: prev.length + 1, value: value.text, checked: false} as TodoProps]);
      setValue({...value, text: ''});
    }
  }

  return (
    <>
      <Title> Make your own todos list </Title>
      <div className='flex'>
        <Input 
          className='input'
          value={value.text}
          onChange={(e) => setValue({...value, text: e.target.value})}
        />
        <Button
          onClick={handlerAddTask}
        >
          Add
        </Button>
      </div>
      {
        list.length && list.map((e) => ( 
          <Todo 
            key={e.id} 
            id={e.id} 
            value={e.value} 
            checked={e.checked} 
            setChecked={(id: number) => setChecked(id)}
          />
        ))
      }
    </>
  );
}

export default TodoList;
