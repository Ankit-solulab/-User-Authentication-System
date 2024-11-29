import rateLimit from "express-rate-limit";
export const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts. Please try again later." },
});

export const forgetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: { message: "Too many password reset requests. Please try again later." },
});
