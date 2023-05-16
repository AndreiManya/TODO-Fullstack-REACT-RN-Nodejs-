import React, { FC }  from 'react';
import { Button, Modal } from 'antd';
import { ModalProps } from '../../interface/todo';

const EditModal: FC<ModalProps> = ({id, value, checked, open, onOk, onCancel }) => {

  return (
    <Modal 
        title="Edit todo" 
        open={open}
        onCancel={() => onCancel()}
        onOk={() => onOk()}
    >
        <p>{value}</p>
    </Modal>
  );
}

export default EditModal;
