import { Router } from 'express';
import { createPaymentPreference} from '../controllers/paymentController.js';
import { validatePayment, validatePreference } from '../validation/paymentValidation.js';
import {receiveWebhook} from '../controllers/webhookController.js'
export const routerPayment = Router();

routerPayment.post('/process', validatePayment, );
routerPayment.post('/buy-ticket', validatePreference, createPaymentPreference);
routerPayment.get('/webhook', receiveWebhook);

routerPayment.get('/success', (req, res) => {
  res.status(200).send("Pago completado");
});

routerPayment.get('/failure', (req, res) => {
  res.status(400).send("Fallo el pago");
});

routerPayment.get('/pending', (req, res) => {
  res.status(200).send("Pago pendiente");
});
