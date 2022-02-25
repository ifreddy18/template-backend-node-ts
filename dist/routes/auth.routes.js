"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Middlewares
const validate_inputs_1 = require("../middlewares/validate-inputs");
// Controllers
const auth_controller_1 = require("../controllers/auth.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
// Login a User
router.post('/login', [
    (0, express_validator_1.check)('email', 'This isn\'t a valid email').isEmail(),
    (0, express_validator_1.check)('email', 'The email is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').not().isEmpty(),
    validate_inputs_1.validateInputs
], auth_controller_1.login);
// Login a User
router.get('/auth-state', [
    validate_jwt_1.validateJWT,
    validate_inputs_1.validateInputs
], auth_controller_1.getAuthState);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map