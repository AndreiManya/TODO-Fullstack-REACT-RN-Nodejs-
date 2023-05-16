import React, { FC, useState } from 'react';
import Todo from '../todo/todo';
import { Typography, Input, Button, List } from 'antd';
import { TodoProps, InputProps } from '../../interface/todo';
import EditModal from '../modals/edit';

const TodoList: FC = () => {
  const { Title } = Typography;
  const [list, setList] = useState<TodoProps[]>([]);
  const [value, setValue] = useState<InputProps>({text: '', isError: false});
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<TodoProps>({id: 2222, value: 'w', checked: false});

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
  const openModal = (id: number) => { 
    let selected = list.filter((e) => e.id === id);
    setClicked(selected[0]);
    setModal(true);
  }
  const closeModal = () => { 
    setModal(false);
  }

  const handleRemove = (id: number) => { 
    let copy = list.filter((e) => e.id !== id);
    setList(copy);
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
            openModal={(id: number) => openModal(id)}
            removeTodo={(id: number) => handleRemove(id)}
          />
        )}
      />
      <EditModal
        {...clicked}
        open={modal}
        onOk={() => closeModal()}
        onCancel={() => closeModal()}
      />
    </>
  );
}

export default TodoList;
