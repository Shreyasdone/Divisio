import { Router } from "express";
import expenseController from "../controllers/expenseController.js";
import { isExpenseExist, validateExpense } from "../middlewares/errorHandler.js";
import wrapAsync from "../utils/asyncWrap.js";

const router = Router();

router.get("/", expenseController.getExpenses);

router.post("/",validateExpense, expenseController.createExpense);

router.put("/:id",isExpenseExist, expenseController.updateExpense);

router.delete("/:id",isExpenseExist, expenseController.destroyExpense);

export default router;
