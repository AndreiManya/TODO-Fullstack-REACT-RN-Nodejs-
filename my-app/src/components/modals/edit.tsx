import React, { type FC } from 'react'
import { Modal, Input } from 'antd'
import { type ModalProps } from '../../interface/todo'

const EditModal: FC<ModalProps> = ({ value, changeValue, open, onOk, onCancel }) => {
  return (
    <Modal
        title="Edit todo"
        open={open}
        onCancel={() => { onCancel() }}
        onOk={() => { value ?? onOk() }}
    >
        <Input
            value={value}
            onChange={(e) => { changeValue(e.target.value) }}
        />
    </Modal>
  )
}

export default EditModal
