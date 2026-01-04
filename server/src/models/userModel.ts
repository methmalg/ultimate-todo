import { pool } from "../config/db";

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [username, email, passwordHash]
  );
  return result.rows[0] as User;
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] as User | undefined;
};
