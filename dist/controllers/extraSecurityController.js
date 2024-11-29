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
exports.loginHistory = exports.turnOff2FA = exports.getLastLogin = exports.ipBasedSignin = void 0;
const userModel_1 = require("../models/userModel");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
// IP-Based Signin
const ipBasedSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const clientIP = req.ip || "0.0.0.0";
        const location = geoip_lite_1.default.lookup(clientIP);
        if (user.allowedIPs && !user.allowedIPs.includes(clientIP)) {
            res.status(403).json({ message: "IP address is not authorized" });
            return;
        }
        res.status(200).json({ message: "Signin successful with IP-based validation" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.ipBasedSignin = ipBasedSignin;
// Get Last Login
const getLastLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ lastLogin: user.lastLogin });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.getLastLogin = getLastLogin;
// Turn Off 2FA
const turnOff2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.is2FAEnabled = false;
        user.otpSecret = null;
        yield user.save();
        res.status(200).json({ message: "2FA has been turned off successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.turnOff2FA = turnOff2FA;
// Login History
const loginHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userModel_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ loginHistory: user.loginHistory });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.loginHistory = loginHistory;
//# sourceMappingURL=extraSecurityController.js.map