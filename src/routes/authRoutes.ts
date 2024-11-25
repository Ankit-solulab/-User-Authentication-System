import { Router } from 'express';
import { signup, signin, verify2FA, setup2FA, forgetPassword, resendOTP } from '../controllers/authController';
import { validateSignup } from '../middlewares/validateRequest';

const router: Router = Router();

// Signup Route
router.post('/signup', validateSignup,signup);

// Signin Route
router.post('/signin', signin);

// 2FA Setup Route
router.post('/setup2fa', setup2FA);

// 2FA Verification Route
router.post('/verify2fa', verify2FA);

// Forget Password Route
router.post('/forgetPassword', forgetPassword);

// Resend OTP Route
router.post('/resendOTP', resendOTP);

export default router;