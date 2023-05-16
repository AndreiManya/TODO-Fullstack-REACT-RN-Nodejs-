import React, { FC } from 'react';
import {TodoEdit} from '../../interface/todo';
import { Checkbox, Button, Space, List } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
  } from '@ant-design/icons';


const Todo: FC<TodoEdit> = ({id, value, checked, setChecked, openModal}) => {
  const styled = {
    textDecorationLine: checked ? 'line-through' : 'none', 
  }
  return (
    <List.Item>
        <Checkbox checked={checked} onChange={() => setChecked(id)} style={styled}> 
        {value}
        </Checkbox>
        <Space>
            <Button
                icon={<EditOutlined />}
            />
            <Button
                danger 
                icon={<DeleteOutlined />}
            />
        </Space>
    </List.Item>
  );
}

export default Todo;
