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
exports.generate2FASecret = void 0;
const userModel_1 = require("../models/userModel");
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const generate2FASecret = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const secret = speakeasy_1.default.generateSecret({ name: 'MYApp' });
    user.otpSecret = secret.base32;
    yield user.save();
    const qrCodeUrl = yield qrcode_1.default.toDataURL(secret.otpauth_url);
    return qrCodeUrl;
});
exports.generate2FASecret = generate2FASecret;
//# sourceMappingURL=authService.js.map