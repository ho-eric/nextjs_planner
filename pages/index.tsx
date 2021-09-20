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
  const [timeBlock, setTimeBlock] = useState("");
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
      endTime: "",
    }

    const newTimeBlock = {
      id: newTodo.id,
      task: todo,
      value: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    }

    setTodoList([...todoList].concat(newTodo));
    setTodo("");
    setTimeBlockList([...timeBlockList].concat(newTimeBlock));
    setTimeBlock("");
    document.getElementById('task').value = '';
  };

  const handleDelete = todo => {
    setTodoList(todoList.filter(t => t !== todo));
    setTimeBlockList(timeBlockList.filter(t => t.id !== todo.id));
    console.log('deleted:', todo);
    console.log('cur todo list:', todoList);
    console.log('cur timeblock list:', timeBlockList);
  };

  const handleAddTime = id => {
    const updatedTodoList = [...todoList].map((todo) => {

      if (todo.id === id) {
        todo.startTime = todoStartTime;
        todo.endTime = todoEndTime;
      }

      handleAddTimeBox(todo);
      return todo;
    });

    setTodoList(updatedTodoList);
    setTodoEdit(null);
  }

  const handleAddTimeBox = todo => {
    const updatedTimeBlockList = [...timeBlockList].map((timeBlock) => {

      let splitStartTime = todo.startTime.split(':');
      let splitEndTime = todo.endTime.split(':');
      let timeInMins = (new Date().setHours(splitEndTime[0], splitEndTime[1])
        - new Date().setHours(splitStartTime[0], splitStartTime[1])) / 60000;

      if (todo.id === timeBlock.id) {
        timeBlock.value = timeInMins;
      }

      return timeBlock;
    });

    setTimeBlockList(updatedTimeBlockList);
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
                      required
                      onChange={(e) => setTodoStartTime(e.target.value)}
                    />
                    &nbsp;
                    to
                    &nbsp;
                    <input
                      id="endTime"
                      type="time"
                      name="endTime"
                      required
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
        Task Time Breakdown:
        <PieChart data={timeBlockList} />
      </div>
    </div>
  )
}


export default Home
