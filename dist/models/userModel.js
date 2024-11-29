"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LoginHistorySchema = new mongoose_1.Schema({
    ip: { type: String, required: true },
    os: { type: String, required: true },
    deviceType: { type: String, required: true },
    deviceModel: { type: String, required: true },
    location: { type: String, required: true },
    loginDate: { type: Date, required: true },
    timestamp: { type: Number, required: true },
});
const UserSchema = new mongoose_1.Schema({
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
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map