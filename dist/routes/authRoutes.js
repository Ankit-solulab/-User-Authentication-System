"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
router.post("/signup", validateRequest_1.validateSignup, authController_1.signup);
router.post("/signin", authController_1.signin);
router.post("/ip-based-signin", authController_1.ipBasedSignin);
router.post("/setup2fa", authController_1.setup2FA);
router.post("/verify2fa", authController_1.verify2FA);
router.post("/forget-password", authController_1.forgetPassword);
router.post("/resend-otp", authController_1.resendOTP);
router.get("/last-login/:userId", authController_1.getLastLogin);
router.post("/disable-2fa", authController_1.disable2FA);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map