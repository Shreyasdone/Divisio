// Validation and error-handling middleware for Expense operations

import Expense from "../models/Expense.js";
import expenseSchema from "../schemas/expenseSchema.js";
import ExpenseError from "../utils/ExpenseError.js";

/**
 * Validate request body against the defined Joi schema.
 * Throws a 400 error if validation fails or body is missing.
 */
export const validateExpense = (req, res, next) => {
  if (!req.body) {
    throw new ExpenseError(400, "Request body is required");
  }

  const { error } = expenseSchema.validate(req.body);
  if (error) {
    // Aggregate all validation messages
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpenseError(400, errMsg);
  }

  // Proceed if validation passes
  next();
};

/**
 * Check that an Expense with the given ID exists in the database.
 * Throws a 400 error if no matching document is found.
 */
export const isExpenseExist = async (req, res, next) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ExpenseError(400, "Expense does not exist");
  }

  // Proceed if expense is found
  next();
};

/**
 * Global error handler to send standardized JSON error responses.
 * Defaults to status 500 if no status is provided on the error.
 */
export const showError = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ message });
};
