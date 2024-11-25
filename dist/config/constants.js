"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IP_LIMIT = exports.Email_REGEX = exports.OTP_SECRET = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "QWERTY1987";
exports.JWT_EXPIRES_IN = "1h";
exports.OTP_SECRET = process.env.OTP_SECRET || "12345@@#";
exports.Email_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.IP_LIMIT = 5;
//# sourceMappingURL=constants.js.map