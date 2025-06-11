import mongoose from "mongoose";

/**
 * User Model
 * Represents a user in the system.
 * @property {String} name - The name of the user (unique).
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
