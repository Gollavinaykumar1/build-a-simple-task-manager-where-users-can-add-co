import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { getTasks, addTask, deleteTask, updateTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      const updatedTask = await updateTask(id, completed);
      setTasks(tasks.map((task) => task.id === id ? updatedTask : task));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <HashRouter>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
        <Routes>
          <Route path="/" element={
            <div>
              <TaskForm handleAddTask={handleAddTask} />
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} />
              )}
            </div>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;