import { pool } from "../config/db";

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  is_completed: boolean;
  created_at: Date;
}

export const getTodosByUser = async (userId: number) => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows as Todo[];
};

export const createTodo = async (userId: number, title: string) => {
  const result = await pool.query(
    "INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *",
    [userId, title]
  );
  return result.rows[0] as Todo;
};

export const toggleTodoCompletion = async (id: number, userId: number) => {
  const result = await pool.query(
    "UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId]
  );
  return result.rows[0] as Todo | undefined;
};

export const deleteTodo = async (id: number, userId: number) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id",
    [id, userId]
  );
  return result.rows[0];
};
