import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  console.log("📩 Register endpoint hit!");
  console.log("📦 Request Body:", req.body);

  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      // Return 400 Bad Request immediately
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password (Security Best Practice)
    // We never store plain text passwords!
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Save to DB
    const newUser = await createUser(username, email, passwordHash);

    // 4. Respond
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email 
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};