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

// Auto-generated missing exports by VIA
export const createItem = async (data) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) throw new Error('createItem failed');
  return r.json();
};
export const deleteItem = async (id) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('deleteItem failed');
  return r.json();
};
export const getItems = async (params) => {
  const q = params ? '?' + new URLSearchParams(params).toString() : '';
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items${q}`);
  if (!r.ok) throw new Error('getItems failed');
  return r.json();
};
export const getStats = async () => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`);
  if (!r.ok) throw new Error('getStats failed');
  return r.json();
};
