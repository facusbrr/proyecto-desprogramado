import { createPreference, createPayment } from '../services/paymentsServices.js';

// Controlador para crear una preferencia
export const createPaymentPreference = async (req, res) => {
  try {
    const { title, unit_price, quantity, purpose = 'onboarding_credits' } = req.body;

    const preferenceData = {
      items: [
        {
          title: title || 'Mi producto',
          unit_price: unit_price || 100,
          quantity: quantity || 1,
        }
      ],
      purpose,
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
    };

    const response = await createPreference(preferenceData);
    res.status(200).json({ id: response.id, init_point: response.init_point });
  } catch (error) {
    console.error('Error al crear la preferencia:', error.message);
    res.status(500).json({ error: 'Error al crear la preferencia. Inténtalo nuevamente.' });
  }
};

// Controlador para obtener el estado del pago
export const getPaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  
  try {
    const response = await createPayment({ id: paymentId }); // Ajustar si es necesario
    res.status(200).json(response);
  } catch (error) {
    console.error('Error al obtener el estado del pago:', error.message);
    res.status(500).json({ error: 'Error al obtener el estado del pago. Inténtalo nuevamente.' });
  }
};
