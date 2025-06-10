import { Router } from "express";
import settlementController from "../controllers/settlementController.js";

const router = Router();

router.get("/settlements", settlementController.getSettlements)

router.get("/balances", settlementController.getBalances)

export default router;