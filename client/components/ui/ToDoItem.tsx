import { Trash2 } from "lucide-react";
import type { Todo } from "../../src/services/api";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
        />
        <span
          className={`text-lg transition-all ${
            todo.is_completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-2"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
