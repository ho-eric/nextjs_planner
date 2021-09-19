import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import styles from '../styles/Home.module.css'
import PieChart from '../components/PieChart'

const Home: NextPage = () => {

  const [todo, setTodo] = useState({
    id: new Date().getTime(),
    task: '',
    startTime: '',
    endTime: ''
  });

  const [todoList, setTodoList] = useState([]);
  const [showTime, setShowTime] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
    console.log("current todos:", todoList);
  };

  const handleAddTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTodoList([
      todo,
      ...todoList
    ])
    console.log('task created:', todo);
    document.getElementById('task').value = '';
  };

  const handleAssignStartTime = (e) => {
    e.preventDefault();
    console.log(todo.task, e.target.name, e.target.value);
      setTodo({
        ...todo,
        [e.target.name]: e.target.value
      });
  }

  const handleAssignEndTime = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  }

  const handleDelete = todo => {
    setTodoList(todoList.filter(t => t !== todo));
    console.log('deleted:', todo);
    console.log('current tasks:', todoList);
  };

  const showTimeBox = () => setShowTime(true);

  const TimeBox = () => {
    return (
      <div>
        <form>
          &nbsp;
          from
          &nbsp;
          <input
            id="startTime"
            type="time"
            name="startTime"
            onChange={handleAssignStartTime}
          />
          &nbsp;
          to
          &nbsp;
          <input
            id="endTime"
            type="time"
            name="endTime"
            onChange={handleAssignEndTime}
          />
          &nbsp;
          <button onClick={handleChange}>Assign</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Head>
        <title>NextJS Planner</title>
      </Head>
      <main className={styles.title}>
        NextJS Planner
      </main>
      <form>
        <input
          id="task"
          placeholder="Enter your task here"
          type="text"
          name="task"
          autoComplete="off"
          onChange={handleChange}
        />
        <button onClick={handleAddTask}>
          Add Task
        </button>
      </form>
      <ul>
        {
          todoList.map((todo, index) => (
            <h1 key={index}>{todo.task}
              &nbsp;
              <button onClick={showTimeBox}>Assign/Edit Time</button>
              {showTime ? <TimeBox /> : null}
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
