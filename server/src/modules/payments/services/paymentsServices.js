import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();
//Credencial Mercado Pago
mercadopago.mercadopago.configuration.setAccessToken(process.env.MP_ACCESS_TOKEN)

export const crearOrden = async(req, res)=>{
    const paymentData = req.body;
    const preference = {
        items: [
            {
                title: paymentData.title,
                quantity: 1,
                currency_id: 'ARG',
                unit_price: paymentData.amount,
            }
        ],
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending',
        },
        auto_return: 'approved',
        notification_url: 'https://30bc-190-138-201-129.ngrok-free.app/webhook',
    };
    try{
        const response = await mercadopago.preferences.create(preference);
        return res.status(200).json({ success: true, init_point: response.body.init_point});
    } catch (err) {
        console.error('Error al crear la orden', err)
        throw new Error('Error al crear la orden: ' + err.message)
    }
}