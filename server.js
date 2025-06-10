import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connect from "./src/config/db.js";
import expenseRouter from "./src/routes/expenseRoutes.js";
import peopleRouter from "./src/routes/peopleRoutes.js";
import settlementRouter from "./src/routes/settlementRoutes.js"
import { showError } from "./src/middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("root working");
})
app.use("/expenses",expenseRouter);
app.use("/people",peopleRouter);
app.use("/",settlementRouter);

app.use(showError);

await connect();
app.listen(port, ()=> console.log(`listening on port ${port}`));