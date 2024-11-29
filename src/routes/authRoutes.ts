import { Router } from "express";
import {
  signup,
  signin,
  ipBasedSignin,
  setup2FA,
  verify2FA,
  forgetPassword,
  resendOTP,
  getLastLogin,
  disable2FA
} from "../controllers/authController";
import { validateSignup } from "../middlewares/validateRequest";

const router: Router = Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", signin);
router.post("/ip-based-signin", ipBasedSignin);
router.post("/setup2fa", setup2FA);
router.post("/verify2fa", verify2FA);
router.post("/forget-password", forgetPassword);
router.post("/resend-otp", resendOTP);
router.get("/last-login/:userId", getLastLogin);
router.post("/disable-2fa", disable2FA);

export default router;
