import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

export const UserModel = (mongoose.models.User) || mongoose.model("User", userSchema)
