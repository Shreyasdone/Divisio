/**
 * Expense Routes
 * Handles all routes related to expenses, including CRUD operations.
 */

import { Router } from "express";
import expenseController from "../controllers/expenseController.js";
import {
  isExpenseExist,
  validateExpense,
} from "../middlewares/errorHandler.js";

const router = Router();

router.get("/", expenseController.getExpenses);

router.post(
  "/",
  validateExpense, // Middleware to validate expense data
  expenseController.createExpense // Controller to handle expense creation
);

router.put(
  "/:id",
  isExpenseExist, // Middleware to check if expense exists
  expenseController.updateExpense
);

router.delete(
  "/:id",
  isExpenseExist, // Middleware to check if expense exists
  expenseController.destroyExpense
);

export default router;
