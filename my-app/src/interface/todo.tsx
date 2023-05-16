export interface TodoProps {
    id: number,
    value: string,
    checked: boolean,
}

export interface TodoEdit {
    id: number,
    value: string,
    checked: boolean,
    setChecked: Function,
    openModal: Function,
    removeTodo: Function,
}

export interface InputProps {
    text: string,
    isError: boolean, 
}
