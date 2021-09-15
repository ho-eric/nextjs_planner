import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [todo, setTodo] = useState({
    task: "",
    startTime: "",
    endTime: ""
  });

  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTodoList([
      todo,
      ...todoList
    ])
    console.log('task created:', todo);

    document.getElementById('task').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';


  };

  const handleEdit = todo => {

  }

  const handleDelete = todo => {
    setTodoList(todoList.filter(t => t !== todo));
    console.log('deleted:', todo);
  };

  return (
    <div>
      <Head>
        <title>NextJS Planner</title>
      </Head>
      <main className={styles.title}>
        NextJS Planner
      </main>
      <form onSubmit={handleAddTask}>
        <input
          id="task"
          placeholder="Enter your task here"
          type="text"
          name="task"
          onChange={handleChange}
        />
        &nbsp;
        from
        &nbsp;
        <input
          id="startTime"
          type="time"
          name="startTime"
          onChange={handleChange}
        />
        &nbsp;
        to
        &nbsp;
        <input
          id="endTime"
          type="time"
          name="endTime"
          onChange={handleChange}
        />
        &nbsp;
        <button type="submit">
          Add Task
        </button>
      </form>
      <ul>
        {
          todoList.map((todo, index) => (
            <h1>{todo.task} from {todo.startTime} to {todo.endTime}
              &nbsp;
              <button onClick={() => handleEdit(todo)}>Edit</button>
              &nbsp;
              <button onClick={() => handleDelete(todo)}>Delete</button>
            </h1>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
