import { z } from 'zod';

const paymentSchema = z.object({
    transaction_amount: z.number().positive(),
    description: z.string().min(1),
    payment_method_id: z.string().min(1),
    email: z.string().email(),
});

export const validatePayment = (req, res, next) => {
    try {
        paymentSchema.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ message: err.errors });
    }
};

const itemSchema = z.object({
    title: z.string(),
    quantity: z.number().positive(),
    currency_id: z.string().nullish(),
    unit_price: z.number().positive(),
});

const preferenceSchema = z.object({
    items: z.array(itemSchema).nonempty(),
});

export const validatePreference = (req, res, next) => {
    try {
        preferenceSchema.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
};
