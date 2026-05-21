import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, HashRouter } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const response = await api.post('/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}`, { completed: true });
      setTasks(tasks.map((task) => task.id === taskId ? response.data : task));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <HashRouter>
      <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <TaskForm handleAddTask={handleAddTask} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <TaskList
            tasks={tasks}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </HashRouter>
  );
}

export default App;