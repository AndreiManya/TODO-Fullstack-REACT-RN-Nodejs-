
export interface TodoProps {
    _id: string,
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

export interface ModalProps {
    value?: string,
    changeValue: Function,
    open: boolean,
    onOk: Function, 
    onCancel: Function
}

