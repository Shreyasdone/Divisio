// Mongoose model for Expense documents
// Represents a single expense entry with auto-managed timestamps

import { Schema, model } from "mongoose";

/**
 * Expense schema defines:
 * - amount: numeric value >= 1
 * - description: brief text of the expense
 * - paidBy: reference to the User who paid
 * - splitType: division strategy among participants
 * 
 * Timestamps option adds createdAt and updatedAt fields automatically.
 */
const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      min: 1,
      required: true  // ensure every expense has a positive amount
    },
    description: {
      type: String,
      required: true,
      trim: true      // remove surrounding whitespace
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true  // reference to the paying user
    },
    splitType: {
      type: String,
      enum: ["equal", "percentage", "exact"],
      default: "equal" // default to equal sharing
    }
  },
  {
    timestamps: true    // adds createdAt and updatedAt
  }
);

// Export the Expense model for use in controllers and elsewhere
const Expense = model("Expense", expenseSchema);
export default Expense;
