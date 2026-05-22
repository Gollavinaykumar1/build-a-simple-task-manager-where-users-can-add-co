const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  getTasks: async () => {
    const response = await fetch(`${BASE_URL}/tasks`);
    return response.json();
  },
  addTask: async (task) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return response.json();
  },
  completeTask: async (id) => {
    await fetch(`${BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH'
    });
  },
  deleteTask: async (id) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
  }
};

export default api;