import React, { useState } from 'react';
import Todo from '../todo/todo';
import { Typography } from 'antd';
import { TodoProps } from '../../interface/todo';

const TodoList = () => {
  const { Title } = Typography;
  const [list, setList] = useState<TodoProps[]>([{id: 1, value: 'First todo', checked: false}])
  const setChecked = (id: number) => { 
    setList(prev => prev.map((todo: TodoProps) => todo.id === id ? {...todo, checked: !todo.checked} : todo));
  }

  return (
    <>
      <Title> Make your own todos list </Title>
      {
        list.length && list.map((e) => ( 
          <Todo key={e.id} id={e.id} value={e.value} checked={e.checked} setChecked={(id: number) => setChecked(id)}/>
        ))
      }
    </>
  );
}

export default TodoList;
