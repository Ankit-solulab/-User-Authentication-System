"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
exports.validateSignup = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    (req, res, next) => {
        console.log('Request body:', req.body);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
//# sourceMappingURL=validateRequest.js.map