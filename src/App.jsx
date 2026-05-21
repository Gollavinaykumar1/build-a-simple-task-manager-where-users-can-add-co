import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { getTasks, addTask, deleteTask, completeTask } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    const newTask = await addTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = async (id) => {
    const updatedTask = await completeTask(id);
    setTasks(tasks.map((task) => task.id === id ? updatedTask : task));
  };

  return (
    <HashRouter>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
        <AddTask onAddTask={handleAddTask} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onCompleteTask={handleCompleteTask} />
        )}
      </div>
    </HashRouter>
  );
}

export default App;