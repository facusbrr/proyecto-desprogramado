import { Router } from 'express';
import { createPaymentPreference } from '../controllers/paymentController.js';
export const routerPayment = Router();

routerPayment.post('/create-preference', createPaymentPreference);
