# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FiDelete } from 'react-icons/fi';
import { FiCheck } from 'react-icons/fi';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get(`${BASE_URL}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        toast.error('Error fetching tasks');
      });
  }, []);

  const handleAddTask = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, data);
      setTasks([...tasks, response.data]);
      reset();
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/tasks/${id}`, { completed: true });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
      toast.success('Task completed successfully');
    } catch (error) {
      toast.error('Error completing task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <HashRouter>
      <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <form onSubmit={handleSubmit(handleAddTask)} className="flex flex-col mb-4">
          <input type="text" {...register('title')} className="p-2 border border-gray-400 rounded-lg mb-2" placeholder="Task title" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
        </form>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={clsx('flex justify-between py-2 border-b border-gray-400', task.completed && 'text-gray-500')}>
              <span>{task.title}</span>
              <div className="flex justify-end">
                <button onClick={() => handleCompleteTask(task.id)} className="mr-2 text-green-500 hover:text-green-700"><FiCheck /></button>
                <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700"><FiDelete /></button>
              </div>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  getTasks: async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  addTask: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  completeTask: async (id) => {
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: true })
      });
    } catch (error) {
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      throw error;
    }
  }
};

export default api;
=== END ===