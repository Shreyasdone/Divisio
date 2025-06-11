import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env

import express from "express";
import connect from "./src/config/db.js";
import expenseRouter from "./src/routes/expenseRoutes.js";
import peopleRouter from "./src/routes/peopleRoutes.js";
import settlementRouter from "./src/routes/settlementRoutes.js";
import testRouter from "./src/routes/testRoutes.js";
import { showError } from "./src/middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 8080; // Use provided PORT or default to 8080

// Parse URL-encoded bodies and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("root working");
});

// API routes
app.use("/expenses", expenseRouter);
app.use("/people", peopleRouter);
app.use("/", settlementRouter);
app.use("/test", testRouter);

// Global error handler
app.use(showError);

// Connect to MongoDB and start the server
await connect();
app.listen(port, () => console.log(`listening on port ${port}`));
