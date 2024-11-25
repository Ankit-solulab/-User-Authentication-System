import { body , validationResult } from "express-validator";

export const  validateSignup = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),

    (req, res, next) => {
        console.log('Request body:',req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
