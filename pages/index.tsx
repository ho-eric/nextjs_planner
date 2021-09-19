import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import styles from '../styles/Home.module.css'
import PieChart from '../components/PieChart'

const Home: NextPage = () => {

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEdit, setTodoEdit] = useState(null)
  const [todoStartTime, setTodoStartTime] = useState("");
  const [todoEndTime, setTodoEndTime] = useState("");
  const [timeBlockList, setTimeBlockList] = useState([]);

  const handleAddTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (document.getElementById('task').value === '') {
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      task: todo,
      startTime: "",
      endTime: ""
    }
    setTodoList([...todoList].concat(newTodo));
    setTodo("");
    document.getElementById('task').value = '';
  };

  const handleDelete = todo => {
    setTodoList(todoList.filter(t => t !== todo));
    console.log('deleted:', todo);
  };

  const handleAddTime = id => {
    const updatedTodoList = [...todoList].map((todo) => {

      if (todo.id === id) {
        todo.startTime = todoStartTime;
        todo.endTime = todoEndTime;
      }
      console.log("Assigned time", todo);
      console.log("Current todo list:", todoList);
      return todo;
    });
    setTodoList(updatedTodoList);
    setTodoEdit(null);
  }

  return (
    <div>
      <Head>
        <title>NextJS Planner</title>
      </Head>
      <main className={styles.title}>
        NextJS Planner
      </main>
      <div className={styles.container}>
        <form>
          <input
            id="task"
            placeholder="Enter your task here"
            type="text"
            name="task"
            autoComplete="off"
            onChange={(e) => setTodo(e.target.value)}
          />
          &nbsp;
          <button onClick={handleAddTask}>
            Add Task
          </button>
        </form>
        <ol type="1">
          {
            todoList.map((todo) => (
              <li key={todo.id}>
                {todo.id === todoEdit ? (
                  <div>
                    {todo.task}
                    &nbsp;
                    <input
                      id="startTime"
                      type="time"
                      name="startTime"
                      onChange={(e) => setTodoStartTime(e.target.value)}
                    />
                    &nbsp;
                    to
                    &nbsp;
                    <input
                      id="endTime"
                      type="time"
                      name="endTime"
                      onChange={(e) => setTodoEndTime(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>{todo.task} {todo.startTime} {todo.endTime}</div>
                )}
                {
                  todo.id === todoEdit ? (
                    <button onClick={() => handleAddTime(todo.id)}>Assign</button>
                  ) : (
                    <button onClick={() => setTodoEdit(todo.id)}>Assign/Edit Time</button>
                  )
                }
                &nbsp;
                <button onClick={() => handleDelete(todo)}>Delete</button>
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}


export default Home
