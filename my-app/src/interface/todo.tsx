
export interface TodoProps {
    id: number,
    value: string,
    checked: boolean,
}

export interface TodoFunctions {
    setChecked: Function,
    openModal: Function,
    removeTodo: Function,
}

export interface InputProps {
    text: string,
    isError: boolean, 
}

export type TodoEdit = TodoFunctions & TodoProps;

export interface Modal {
    open: boolean,
    onOk: Function, 
    onCancel: Function
}

export type ModalProps = Modal & TodoProps;

