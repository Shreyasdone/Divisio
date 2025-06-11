import Expense from "../models/Expense.js";
import User from "../models/User.js";

/**
 * GET /expenses
 *
 * Fetches all expenses from the database, populating the 'paidBy' field with user details.
 * Returns a JSON response with the expenses data.
 *
 * @route GET /expenses
 * @access Public
 */
const getExpenses = async (req, res) => {
  let expenses = await Expense.find({}).populate("paidBy").lean();
  expenses = expenses.map((exp) => {
    delete exp.createdAt;
    delete exp.updatedAt;
    return { ...exp, paidBy: exp.paidBy.name };
  });
  res.json({
    success: true,
    data: expenses,
    message: "Expenses fetched successfully",
  });
};

/**
 * POST /expenses
 *
 * Creates a new expense. If the payer (paidBy) does not exist, a new user is created.
 * Returns the created expense document.
 *
 * @route POST /expenses
 * @access Public
 */
const createExpense = async (req, res, next) => {
  try {
    let expenseData = req.body.expense;
    let user = await User.findOne({ name: expenseData.paidBy });
    if (!user) {
      user = new User({ name: expenseData.paidBy });
      await user.save();
    }
    expenseData.paidBy = user._id;
    const expense = new Expense(expenseData);
    await expense.save();

    // Return 201 Created with consistent response structure
    return res.status(201).json({
      success: true,
      data: expense,
      message: "Expense Added Successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /expenses/:id
 *
 * Updates an existing expense by its ID and returns the updated document.
 *
 * @route PUT /expenses/:id
 * @access Public
 **/
const updateExpense = async (req, res, next) => {
  try {
    let { id } = req.params;
    let expense = req.body.expense;
    let updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { ...expense },
      { new: true }
    );
    res.json({
      success: true,
      data: updatedExpense,
      message: "Expense Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /expenses/:id
 *
 * Deletes an expense by its ID and returns the deleted document.
 *
 * @route DELETE /expenses/:id
 * @access Public
 */
const destroyExpense = async (req, res, next) => {
  let { id } = req.params;
  try {
    let deletedExp = await Expense.findByIdAndDelete(id);
    res.json({
      success: true,
      data: deletedExp,
      message: "Expense Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getExpenses,
  createExpense,
  updateExpense,
  destroyExpense,
};
