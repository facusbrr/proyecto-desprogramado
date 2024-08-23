import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv'

dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
    options: {
        timeout: 5000,
        idempotencyKey: 'abc'
    }
});

const preference = new Preference(client);
export const createPreference = async (items) => {
    try {
        const preferenceBody = {
            items: items.map(item => ({
                id: item.id.toString(),
                title: item.title,
                quantity: item.quantity,
                currency_id: item.currency_id,
                unit_price: item.unit_price,
            })),
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending',
            },
            auto_return: 'approved',
            notification_url: 'http://localhost:3000/webhook',
        };

        const response = await preference.create({ body: preferenceBody });
        console.log('Respuesta completa de MercadoPago:', response);

        if (response.body && response.body.init_point) {
            return response.body;
        } else {
            throw new Error('No se recibió un campo "init_point" válido en la respuesta de MercadoPago.');
        }
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error.response ? error.response.data : error.message);
        throw new Error('Error al crear la preferencia de pago: ' + (error.response ? error.response.data : error.message));
    }
};