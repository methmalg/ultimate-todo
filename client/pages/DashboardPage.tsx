import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";
import { todoApi, setAuthToken } from "../src/services/api";
import type { Todo } from "../src/services/api";
import { TodoItem } from "../components/ui/TodoItem";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const created = await todoApi.create(newTodo);
      setTodos([created, ...todos]);
      setNewTodo("");
    } catch (err) {
      console.error("Failed to create todo", err);
      alert("Failed to add todo");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, is_completed: !t.is_completed } : t
        )
      );

      await todoApi.toggle(id);
    } catch (err) {
      console.error("Failed to toggle todo", err);
      alert("Failed to update task");
      loadTodos();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      setTodos(todos.filter((t) => t.id !== id));
      await todoApi.delete(id);
    } catch (err) {
      console.error("Failed to delete todo", err);
      alert("Failed to delete task");
      loadTodos();
    }
  };

  const handleLogout = () => {
    setAuthToken("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500 mt-1">Manage your day efficiently</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <form onSubmit={handleAdd} className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!newTodo.trim()}>
              <Plus className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading your tasks...</p>
          ) : todos.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed">
              <p className="text-gray-500">No tasks yet. Add one above! 🚀</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
