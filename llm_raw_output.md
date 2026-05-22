# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { FiCheckSquare } from 'react-icons/fi'
import { clsx } from 'clsx'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/tasks`)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`${BASE_URL}/tasks`, { task: newTask })
      .then(response => {
        setTasks([...tasks, response.data])
        setNewTask('')
        toast('Task added successfully')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleComplete = (id) => {
    axios.put(`${BASE_URL}/tasks/${id}`, { completed: true })
      .then(response => {
        setCompletedTasks([...completedTasks, id])
        toast('Task completed successfully')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id))
        toast('Task deleted successfully')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <HashRouter>
      <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            placeholder="Add new task"
          />
          <button
            type="submit"
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            <FaPlus size={16} className="mr-2" />
            Add Task
          </button>
        </form>
        <ul className="mt-4">
          {tasks.map((task) => (
            <li key={task.id} className={clsx('flex justify-between items-center py-2', task.completed && 'text-gray-500')}>
              <span>{task.task}</span>
              {task.completed ? (
                <FiCheckSquare size={16} className="text-green-500" />
              ) : (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                <FiTrash2 size={16} className="mr-2" />
                Delete
              </button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
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
// No need to import anything here, as we're using the axios library in App.jsx
const api = {
  // Add your API routes here, if needed
}

export default api
=== END ===