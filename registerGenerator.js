import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'ventas.json');

// Función para generar un número de asiento (e.g., A1, B2, C3)
const generateSeatNumber = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seat = faker.number.int({ min: 1, max: 10 });
    const row = faker.helpers.arrayElement(rows);
    return `${row}${seat}`;
};

// Función para generar un ticket de compra
function generarTicket(id) {
    const ticket = {
        ticket_id: id,
        screening_id: faker.number.int({ min: 1, max: 5 }), // Puede variar según la cantidad de funciones disponibles
        seat_number: generateSeatNumber(),
        tickets_quantity: faker.number.int({ min: 1, max: 5 }),
        price_quantity: faker.number.int({ min: 1600, max: 2000, fixed: 2 }),
        purcharse_date: faker.date.recent().toString()
    };
    ticket.precioTotal = (ticket.tickets_quantity * ticket.price_quantity);
    return ticket;
}

// Función para generar un usuario
let userId = 1;
function generarUsuario() {
    const ticketDate=generarTicket();
    const usuario = {
        costumer_id: userId++,
        customer_name: faker.person.firstName(),
        costumer_lastname: faker.person.lastName(),
        customer_dni:faker.number.int({ min: 10000000, max: 46000000 }),
        customer_email: faker.internet.email(),
        customer_phonenumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
        customer_date: ticketDate.purcharse_date
    };
    return usuario;
}

// Función para generar una venta que relacione usuario y ticket
function generarVenta() {
    const usuario = generarUsuario();
    const ticket = generarTicket();
    let sellId = 1;
    const venta = {
        id: sellId++,
        usuario: usuario,
        ticket: ticket,
        fechaVenta: faker.date.recent(),
        metodoPago: faker.helpers.arrayElement(['Tarjeta de Crédito','Efectivo','Transferencia Bancaria','Tarjeta de Débito']),
        purcharse_date:ticket.purcharse_date
    };
    return venta;
}

// Generar 10 ventas de ejemplo
const ventas = Array.from({ length: 1000 }, generarVenta);

// Guardar el JSON en el archivo
writeFileSync(filePath, JSON.stringify(ventas, null, 2));

console.log(`El archivo JSON se ha guardado en: ${filePath}`);

