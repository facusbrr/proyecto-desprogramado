import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Ruta al archivo JSON
const filePath = path.resolve('data', 'users.json');
const filePath1 = path.resolve('data', 'transactions.json');
const filePath2 = path.resolve('data', 'tickets.json');

// Ruta para servir el archivo JSON
app.get('/users', (req, res) => {
    try {
        // Leer el archivo JSON
        const data = readFileSync(filePath, 'utf-8');
        // Convertir el contenido a JSON y enviarlo como respuesta
        const users = JSON.parse(data);
        res.json(users);
    } catch (err) {
        res.status(500).send('Error al leer el archivo de usuarios');
    }
});

app.get('/transactions', (req, res) => {
    try {
        // Leer el archivo JSON
        const data =readFileSync(filePath1, 'utf-8');
        // Convertir el contenido a JSON y enviarlo como respuesta
        const transactions = JSON.parse(data);
        res.json(transactions);
    } catch (err) {
        res.status(500).send('Error al leer el archivo de transacciones');
    }
});

app.get('/tickets', (req, res) => {
    try {
        // Leer el archivo JSON
        const data = readFileSync(filePath2, 'utf-8');
        // Convertir el contenido a JSON y enviarlo como respuesta
        const tickets = JSON.parse(data);
        res.json(tickets);
    } catch (err) {
        res.status(500).send('Error al leer el archivo de boletos');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
