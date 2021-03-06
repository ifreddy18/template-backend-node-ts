import { Router } from 'express';
import { check } from 'express-validator';

// Middlewares
import { validateInputs } from '../middlewares/validate-inputs';

// Controllers
import { getAuthState, login } from '../controllers/auth.controller';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

// Login a User
router.post('/login', [
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], login );

// Login a User
router.get('/auth-state', [
    validateJWT,
    validateInputs
], getAuthState );

export default router;
