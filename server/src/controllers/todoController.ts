import { Request, Response } from "express";
import {
  getTodosByUser,
  createTodo,
  toggleTodoCompletion,
  deleteTodo,
} from "../models/todoModel";

interface AuthRequest extends Request {
  user?: { id: number };
}

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const todos = await getTodosByUser(userId);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { title } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTodo = await createTodo(userId, title);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!id) return res.status(400).json({ message: "Todo ID is required" });

    const updatedTodo = await toggleTodoCompletion(parseInt(id), userId);

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!id) return res.status(400).json({ message: "Todo ID is required" });

    const deleted = await deleteTodo(parseInt(id), userId);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
