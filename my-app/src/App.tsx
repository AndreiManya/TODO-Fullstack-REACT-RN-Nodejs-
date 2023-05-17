import React, { type ReactElement } from 'react'
import './App.css'
import TodoList from './components/todoList/todoList'

function App (): ReactElement {
  return (
    <div className="App">
      <TodoList/>
    </div>
  )
}

export default App
