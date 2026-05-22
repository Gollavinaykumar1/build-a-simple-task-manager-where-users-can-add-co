# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
import { FiCheckCircle, FiTrash2, FiXCircle } from 'react-icons/fi'

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function App() {
  const [tasks, setTasks] = useState([])
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    axios.get(`${BASE_URL}/tasks`)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        toast.error('Failed to load tasks')
      })
  }, [])

  const addTask = (data) => {
    axios.post(`${BASE_URL}/tasks`, data)
      .then(response => {
        setTasks([...tasks, response.data])
        reset()
        toast.success('Task added successfully')
      })
      .catch(error => {
        toast.error('Failed to add task')
      })
  }

  const completeTask = (id) => {
    axios.put(`${BASE_URL}/tasks/${id}/complete`)
      .then(response => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task))
        toast.success('Task completed successfully')
      })
      .catch(error => {
        toast.error('Failed to complete task')
      })
  }

  const deleteTask = (id) => {
    axios.delete(`${BASE_URL}/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id))
        toast.success('Task deleted successfully')
      })
      .catch(error => {
        toast.error('Failed to delete task')
      })
  }

  return (
    <HashRouter>
      <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <form onSubmit={handleSubmit(addTask)} className="mt-4">
          <input
            type="text"
            {...register('title')}
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
            placeholder="Add new task"
          />
          <button
            type="submit"
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Task
          </button>
        </form>
        <ul className="mt-4">
          {tasks.map(task => (
            <li
              key={task.id}
              className={clsx('flex items-center justify-between py-2 border-b border-gray-300', {
                'text-gray-500': task.completed,
              })}
            >
              <span className={clsx('text-sm', {
                'line-through': task.completed,
              })}>
                {task.title}
              </span>
              <div className="flex items-center justify-end">
                {task.completed ? (
                  <FiCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </HashRouter>
  )
}

export default App
=== END ===

=== FILE: src/main.jsx ===
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
// This file is not used in the provided code, but it's included to match the requirements
export const api = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  } catch (error) {
    throw error
  }
}
=== END ===