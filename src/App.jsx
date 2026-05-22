import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import TaskList from './TaskList';
import AddTask from './AddTask';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.getTasks()
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTask = (task) => {
    api.addTask(task)
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.error(error));
  };

  const handleCompleteTask = (id) => {
    api.completeTask(id)
      .then(() => setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task)))
      .catch(error => console.error(error));
  };

  const handleDeleteTask = (id) => {
    api.deleteTask(id)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-4 pt-6 mt-10">
            <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} onDeleteTask={handleDeleteTask} />
          </div>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;