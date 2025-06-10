import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true
    }
})

const User  = mongoose.model("User",userSchema);

export default User;