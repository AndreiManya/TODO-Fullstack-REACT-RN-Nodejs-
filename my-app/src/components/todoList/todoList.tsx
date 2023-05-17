import React, { FC, useState, useMemo, useEffect } from 'react';
import Todo from '../todo/todo';
import { Typography, Input, Button, List } from 'antd';
import { TodoProps, InputProps } from '../../interface/todo';
import EditModal from '../modals/edit';
import Spinner from '../spinner/index';

const TodoList: FC = () => {
  const { Title } = Typography;
  const defaultData = useMemo(()=> ({_id: 'awd2weqdw', value: '', checked: false}), [])

  const [list, setList] = useState<TodoProps[]>([]);
  const [value, setValue] = useState<InputProps>({text: '', isError: false});
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<TodoProps>(defaultData);

  const [loading, setLoading] = useState<boolean>(true);

  const setChecked = async (id: string) => { 
    try {
        setLoading(true);
        let item = list.filter((e) => e._id === id)[0];
        await fetch(`http://localhost:8080/todo/${id}`, 
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

  const handlerAddTask = async () => { 
    try {
      if(value.text.length) { 
        setLoading(true);
        await fetch('http://localhost:8080/todo', 
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
  
  const handleChange = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080/todo/${clicked._id}`, 
      {
        method: "PATCH",     
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(clicked)
      });
      setLoading(false);
      setList((prev) => prev.map((e) => e._id === clicked._id ? clicked : e));
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const openModal = (id: string) => { 
    let selected = list.filter((e) => e._id === id);
    setClicked(selected[0]);
    setModal(true);
  }

  const closeModal = () => { 
    setClicked(defaultData);
    setModal(false);
  }

  const handleRemove = async (id: string) => { 
    try {
        setLoading(true);
        await fetch(`http://localhost:8080/todo/${id}`, { method: "DELETE" });
        setList(prev => prev.filter((e) => e._id !== id));
        setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() =>{
    async function fetchData() {
      try {
        let resp = await fetch('http://localhost:8080/todo')
        .then(res => res.json())
        .then(comments => comments.length ? setList(comments as Array<TodoProps>) : []);
        console.log(resp)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [])

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
            key={e._id} 
            _id={e._id} 
            value={e.value} 
            checked={e.checked} 
            setChecked={(id: string) => setChecked(id)}
            openModal={(id: string) => openModal(id)}
            removeTodo={(id: string) => handleRemove(id)}
          />
        )}
      />
      <EditModal
        value={clicked.value}
        changeValue={(val: string) => {setClicked({...clicked, value: val})} }
        open={modal}
        onOk={() => handleChange()}
        onCancel={() => closeModal()}
      />
      {
        loading &&
        <Spinner/>
      }
    </>
  );
}

export default TodoList;
