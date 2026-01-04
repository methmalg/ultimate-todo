import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

export interface Todo {
  id: number;
  title: string;
  is_completed: boolean;
}

export const todoApi = {
  getAll: async () => {
    const res = await api.get<Todo[]>("/todos");
    return res.data;
  },
  create: async (title: string) => {
    const res = await api.post<Todo>("/todos", { title });
    return res.data;
  },
  toggle: async (id: number) => {
    const res = await api.put<Todo>(`/todos/${id}`);
    return res.data;
  },
  delete: async (id: number) => {
    await api.delete(`/todos/${id}`);
  },
};
