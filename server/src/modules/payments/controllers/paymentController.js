import { createPreference } from '../services/paymentsServices.js';

export const createPaymentPreference = async (req, res) => {
    try {
        // Aquí puedes ajustar los items de la preferencia
        const items = [
            {
                id: '123',
                title: 'Avengers: Endgame',
                description: 'Ticket for Avengers: Endgame',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 12.99,
            }
        ];
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'El campo "items" es requerido y debe ser un array con al menos un item.' });
        }

        const initPoint = await createPreference(items);

        res.redirect(initPoint);
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la compra. Inténtalo nuevamente.' });
    }
};
