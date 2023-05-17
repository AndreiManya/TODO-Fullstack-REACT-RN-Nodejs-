import React, { type FC } from 'react'
import { type TodoEdit } from '../../interface/todo'
import { Checkbox, Button, Space, List, Tag } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const Todo: FC<TodoEdit> = ({ _id, value, checked, setChecked, openModal, removeTodo }) => {
  const styled = {
    textDecorationLine: checked ? 'line-through' : 'none'
  }
  return (
    <List.Item>
        <Checkbox checked={checked} onChange={() => { setChecked(_id) }} style={styled}/>
        <Tag color={checked ? 'green' : 'red'} className="todo-text">
            {value}
        </Tag>
        <Space>
            <Button
                icon={<EditOutlined />}
                onClick={() => { openModal(_id) }}
            />
            <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => { removeTodo(_id) }}
            />
        </Space>
    </List.Item>
  )
}

export default Todo
