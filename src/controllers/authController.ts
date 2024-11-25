import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { JWT_SECRET, JWT_EXPIRES_IN, OTP_SECRET } from "../config/constants";
import { generateOTP } from "../utils/generateOTP";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

// Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error:any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Signin
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ token });
  } catch (error:any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 2FA Setup (QR Code generation)
export const setup2FA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).send({ message: "User ID is required" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const secret = speakeasy.generateSecret({ name: "MyApp" });
    user.otpSecret = secret.base32;
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    res.status(200).json({ qrCodeUrl });
  } catch (error:any) {
    res.status(500).send({ message: "Error generating 2FA QR code", error: error.message });
  }
};

// 2FA Verification
export const verify2FA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      res.status(400).send({ message: "User ID and OTP are required" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const isValid = speakeasy.totp.verify({
      secret: user.otpSecret || OTP_SECRET,
      encoding: "base32",
      token: otp,
    });

    if (!isValid) {
      res.status(400).send({ message: "Invalid OTP" });
      return;
    }
    res.status(200).json({ message: "2FA Verification Success" });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Forget Password
export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const otp = generateOTP();
    user.otpSecret = otp;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error:any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Resend OTP
export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const otp = generateOTP();
    user.otpSecret = otp;
    await user.save();

    res.status(200).send({ message: "OTP resent successfully" });
  } catch (error:any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
