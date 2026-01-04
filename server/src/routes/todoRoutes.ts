import { Router } from "express";
import {
  getTodos,
  addTodo,
  toggleTodo,
  removeTodo,
} from "../controllers/todoController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", toggleTodo);
router.delete("/:id", removeTodo);

export default router;
