"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordLimiter = exports.signinLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.signinLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many login attempts. Please try again later." },
});
exports.forgetPasswordLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many password reset requests. Please try again later." },
});
//# sourceMappingURL=rateLimiter.js.map