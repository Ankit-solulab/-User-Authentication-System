"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = exports.forgetPassword = exports.verify2FA = exports.setup2FA = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const constants_1 = require("../config/constants");
const generateOTP_1 = require("../utils/generateOTP");
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
// Signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.User({
            username,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.signup = signup;
// Signin
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password fields are required" });
            return;
        }
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, constants_1.JWT_SECRET, { expiresIn: constants_1.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.signin = signin;
// 2FA Setup (QR Code generation)
const setup2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).send({ message: "User ID is required" });
            return;
        }
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const secret = speakeasy_1.default.generateSecret({ name: "MyApp" });
        user.otpSecret = secret.base32;
        yield user.save();
        const qrCodeUrl = yield qrcode_1.default.toDataURL(secret.otpauth_url);
        res.status(200).json({ qrCodeUrl });
    }
    catch (error) {
        res.status(500).send({ message: "Error generating 2FA QR code", error: error.message });
    }
});
exports.setup2FA = setup2FA;
// 2FA Verification
const verify2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            res.status(400).send({ message: "User ID and OTP are required" });
            return;
        }
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const isValid = speakeasy_1.default.totp.verify({
            secret: user.otpSecret || constants_1.OTP_SECRET,
            encoding: "base32",
            token: otp,
        });
        if (!isValid) {
            res.status(400).send({ message: "Invalid OTP" });
            return;
        }
        res.status(200).json({ message: "2FA Verification Success" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.verify2FA = verify2FA;
// Forget Password
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
            return;
        }
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const otp = (0, generateOTP_1.generateOTP)();
        user.otpSecret = otp;
        yield user.save();
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.forgetPassword = forgetPassword;
// Resend OTP
const resendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
            return;
        }
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const otp = (0, generateOTP_1.generateOTP)();
        user.otpSecret = otp;
        yield user.save();
        res.status(200).send({ message: "OTP resent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.resendOTP = resendOTP;
//# sourceMappingURL=authController.js.map