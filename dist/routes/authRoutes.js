"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
// Signup Route
router.post('/signup', validateRequest_1.validateSignup, authController_1.signup);
// Signin Route
router.post('/signin', authController_1.signin);
// 2FA Setup Route
router.post('/setup2fa', authController_1.setup2FA);
// 2FA Verification Route
router.post('/verify2fa', authController_1.verify2FA);
// Forget Password Route
router.post('/forgetPassword', authController_1.forgetPassword);
// Resend OTP Route
router.post('/resendOTP', authController_1.resendOTP);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map