import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async() => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.error("Error Connecting to DB",e));
}

export default connect;