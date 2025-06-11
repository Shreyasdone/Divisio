// Joi schema for validating Expense-related request payloads
import Joi from "joi";

/**
 * Defines the structure and validation rules for an Expense object:
 * - amount: must be a number >= 1
 * - description: non-empty string
 * - paidBy: non-empty string indicating the payee's name or ID
 */
const expenseSchema = Joi.object({
  expense: Joi.object({
    amount: Joi.number()
      .min(1)
      .required()
      .messages({
        "number.base": "Amount must be a number",
        "number.min": "Amount must be at least 1",
        "any.required": "Amount is required"
      }),

    description: Joi.string()
      .min(1)
      .required()
      .messages({
        "string.base": "Description must be a string",
        "string.empty": "Description cannot be empty",
        "any.required": "Description is required"
      }),

    paidBy: Joi.string()
      .min(1)
      .required()
      .messages({
        "string.base": "paidBy must be a string",
        "string.empty": "paidBy cannot be empty",
        "any.required": "paidBy is required"
      })
  })
    .required()
    .messages({ "any.required": "Expense object is required" })
});

export default expenseSchema;