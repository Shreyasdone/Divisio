import { Router } from "express";
import Expense from "../models/Expense.js";
import User    from "../models/User.js";

const router = Router();

/**
 * DELETE /test/reset
 * (TEST-ONLY) Clears all users and expenses.
 */
router.delete("/reset", async (req, res, next) => {
  try {
    await Expense.deleteMany({});
    await User   .deleteMany({});
    res.json({ success: true, message: "Database reset" });
  } catch (err) {
    next(err);
  }
});

export default router;
