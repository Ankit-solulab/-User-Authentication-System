import mongoose, { Schema, Document } from "mongoose";

interface LoginHistory {
  ip: string;
  os: string;
  deviceType: string;
  deviceModel: string;
  location: string;
  loginDate: Date;
  timestamp: number;

}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  failedLoginAttempts: number;
  isBlocked: boolean;
  blockedUntil: Date | null;
  lastLogin: Date | null;
  allowedIPs: string[];
  loginHistory: LoginHistory[]; // Update type
  otpSecret?: string | null;
  otpCreatedAt?: Date;
}

const LoginHistorySchema: Schema = new Schema({
  ip: { type: String, required: true },
  os: { type: String, required: true },
  deviceType: { type: String, required: true },
  deviceModel: { type: String, required: true },
  location: { type: String, required: true },
  loginDate: { type: Date, required: true },
  timestamp: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },
  blockedUntil: { type: Date, default: null },
  lastLogin: { type: Date, default: null },
  allowedIPs: { type: [String], default: [] },
  loginHistory: { type: [LoginHistorySchema], default: [] },
  otpSecret: { type: String, default: null },
  otpCreatedAt: { type: Date },
});

export const User = mongoose.model<IUser>("User", UserSchema);

