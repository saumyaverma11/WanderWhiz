import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        isVerified: {
            type: Boolean,
            default: false
        },
        bio: {
            type: String,
            default: "",
        },
        budget: {
            type: String,
            default: "",
        },
        travelStyle: {
            type: String,
            default: "",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },

        verificationToken: String
    },
    { timestamps: true }         // automatically addedd createdAt and updatedAt 
);

export default mongoose.model("User", userSchema);   //creates mongodbb collection and connects schema with DB