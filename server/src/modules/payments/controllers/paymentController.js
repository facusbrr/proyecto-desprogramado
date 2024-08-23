import { createPreference } from '../services/paymentsServices.js';
import {pool} from '../../../config/db.js'

export const createPaymentPreference = async (req, res) => {
    try {
        const { movie_id } = req.body;

        if (!movie_id) {
            return res.status(400).json({ error: 'El campo "movie_id" es requerido.' });
        }

        const [rows] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [movie_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada.' });
        }

        const movie = rows[0];

        const items = [
            {
                id: movie.movie_id,
                title: movie.title,
                description: movie.description,
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 12.99, 
            }
        ];
        const initPoint = await createPreference(items);

        res.redirect(initPoint);
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la compra. Inténtalo nuevamente.' });
    }
};
