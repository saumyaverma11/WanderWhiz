import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        name : {type :String, required :true},
        email : {type:String, required : true, unique: true},
        password: {type: String, required :true},
    },
    { timestamps : true}         // automatically addedd createdAt and updatedAt 
);

export default mongoose.model("User", userSchema);   //creates mongodbb collection and connects schema with DB