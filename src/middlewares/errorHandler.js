import Expense from "../models/Expense.js";
import expenseSchema from "../schemas/expenseSchema.js";
import ExpenseError from "../utils/ExpenseError.js";

export const validateExpense = (req,res,next) => {
    if(!req.body) {
        throw new ExpenseError(400, "Request Body is required");
    }
    let {error} = expenseSchema.validate(req.body); 
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpenseError(400, errMsg);
    } else {
        next();
    }
}

export const isExpenseExist = async(req,res,next) => {
    const {id} = req.params;
    let expense = await Expense.findById(id);
    if(!expense) {
        throw new ExpenseError(400, "Expense doesn't exist");
    } else {
        next();
    }
}

export const showError = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ message });
};
