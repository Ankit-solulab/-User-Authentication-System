import mongose , {Schema, Document } from "mongoose";

interface IUser extends Document {
    username : string,
    email: string,
    password: string,
    otpSecret?: string,
    lastLogin?: Date,
    ipAddress?: string,
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    otpSecret:{
        type: String,
    },
    lastLogin:{ 
        type: Date,
    },
    ipAddress: {
    type:String,
    }
});

const User = mongose.model<IUser>("User", userSchema);
export { User };