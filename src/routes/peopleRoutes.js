import { Router } from "express";
import peopleController from "../controllers/peopleController.js";

const peopleRouter = Router();

// Fetch and return the list of all people's names
// GET /people
peopleRouter.get("/", peopleController.getPeople);

export default peopleRouter;
