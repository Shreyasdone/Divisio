import {Schema, model} from "mongoose";

const expenseSchema = new Schema({
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    description: {
        type: String,
        required:true,
        trim: true
    },
    paidBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    splitType: {
        type: String,
        enum: ["equal","percentage","exact"],
        default: "equal"
    }
}, {
    timestamps: true  
});

const Expense = model("Expense", expenseSchema);

export default Expense;