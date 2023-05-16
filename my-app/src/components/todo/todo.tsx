import React, { FC } from 'react';
import {TodoEdit} from '../../interface/todo';
import { Checkbox } from 'antd';

const Todo: FC<TodoEdit> = ({id, value, checked, setChecked}) => {

  return (
    <Checkbox checked={checked} onChange={() => setChecked(id)} >
        {value}
    </Checkbox>
  );
}

export default Todo;
