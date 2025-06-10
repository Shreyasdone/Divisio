import joi from "joi";

const expenseSchema = joi.object({
    expense: joi.object({
        amount: joi.number().required().min(1),
        description: joi.string().min(1).required(),
        paidBy: joi.string().min(1).required()
    }).required()
})

export default expenseSchema;