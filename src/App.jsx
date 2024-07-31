
import { useEffect, useRef } from 'react'
import './App.css'
import { useState } from 'react';
import ListItem from './components/ListItem';

function App() {

  const [todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(null);

  const loadTodos = async () => {
    const res = await fetch(`https://dummyjson.com/todos?limit=20&skip=${skip}`);
    const parsedRes = await res.json();
    setTodos((prev) => {
      const arr = [...prev];
      arr.push(...parsedRes.todos);
      return arr;
    })
    setSkip(prev => prev+20);
  }

  const addItem = (e) => {
    e.preventDefault();
    const inputVal = inputRef.current.value;
    if (inputVal === '') {
      alert('Item is Empty');
      return;
    }
    setTodos((prev) => {
      const arr = [...prev];
      arr.push({
        "id": arr.length + 1,
        "todo": inputVal,
        "completed": false,
      });
      return arr;
    })
  }

  const editItem = (id) => {
    inputRef.current.focus();
    setEdit(id);
  }

  const updateItem = (e) => {
    e.preventDefault();
    setTodos(prev => {
      const arr = [...prev];
      return arr.map((obj) => {
        if (obj.id === edit) {
          obj.todo = inputRef.current.value;
          return obj;
        }
        return obj;
      })
    })
  }

  const deleteItem = (id) => {
    setTodos(prev => {
      const arr = [...prev];
      return arr.filter(obj => {
        if (obj.id !== id) return obj;
      })
    })
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className='flex flex-col gap-4'>

      <h1 className='text-center text-5xl'>Total Todos: {todos.length}</h1>

      <form action="" className='flex gap-4 justify-center'>
        <input ref={inputRef} type="text" name="" id="" className='border border-solid border-gray-400 rounded-md p-1' placeholder='add item...' />
        {
          edit === null ?
          <button onClick={addItem} className='text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-md w-fit'>Add Item</button> :
          <button onClick={updateItem} className='text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-md w-fit'>Update</button> 
        }
      </form>

      <div className='flex justify-center'>
        <ul className='flex flex-col gap-2'>
          {
            todos.map((todo) => {
              return <ListItem key={todo.id} id={todo.id} todo={todo.todo} completed={todo.completed} deleteItem={deleteItem} editItem={editItem}/>
            })
          }
        </ul>
      </div>

      {
        (skip <= 80) &&
        <button className='text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-md w-fit m-auto' onClick={loadTodos}>Load More</button>
      }

    </div>
  )
}

export default App
