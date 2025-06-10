import { Router } from "express";
import peopleController from "../controllers/peopleController.js";

const router = Router();

router.get("/", peopleController.getPeople)

export default router;