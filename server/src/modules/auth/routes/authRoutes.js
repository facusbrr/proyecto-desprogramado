import { Router } from 'express';
import { registerUserController, loginUserController } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validation/authValidation.js';
import { validate } from '../../../middleware/validate.js';

export const routerAuth = Router();

routerAuth.post('/register', validate(registerSchema), registerUserController);

routerAuth.post('/login', validate(loginSchema), loginUserController);