import { Router } from "express";
import settlementController from "../controllers/settlementController.js";

const settlementRouter = Router();

// Return minimal transactions to settle debts among all users
// GET /settlements
settlementRouter.get("/settlements", settlementController.getSettlements);

// Return current balances (owes and owed) for each user
// GET /balances
settlementRouter.get("/balances", settlementController.getBalances);

export default settlementRouter;
