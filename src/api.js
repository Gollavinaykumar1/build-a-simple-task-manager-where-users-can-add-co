const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  return await response.json();
};

const addTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return await response.json();
};

const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
};

const completeTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, { method: 'PATCH' });
  return await response.json();
};

export { getTasks, addTask, deleteTask, completeTask };

// Auto-generated missing exports by VIA
export const addTask = async (data) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) throw new Error('addTask failed');
  return r.json();
};
export const completeTask = async (...args) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/completetasks`);
  if (!r.ok) throw new Error('completeTask failed');
  return r.json();
};
export const deleteTask = async (id) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/tasks/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('deleteTask failed');
  return r.json();
};
export const getTasks = async (params) => {
  const q = params ? '?' + new URLSearchParams(params).toString() : '';
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/tasks${q}`);
  if (!r.ok) throw new Error('getTasks failed');
  return r.json();
};
