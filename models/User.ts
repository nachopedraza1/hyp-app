import { IUser } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, requied: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'client',
        required: true,
        enum: {
            values: ['client', 'admin'],
            message: '{VALUE} no es un rol válido.'
        }
    }
}, {
    timestamps: true
});

const userModel: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;