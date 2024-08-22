import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import path from 'path';

// Ruta al archivo JSON
const filePath = path.resolve('data', 'tickets.json');

// Función para generar un número de asiento (e.g., A1, B2, C3)
const generateSeatNumber = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seat = faker.number.int({ min: 1, max: 10 });
    const row = faker.helpers.arrayElement(rows);
    return `${row}${seat}`;
};

// Función para generar un registro de boleto
const generateTicket = (id) => ({
    TicketID: id,
    ScreeningID: faker.number.int({ min: 1, max: 5 }), // Puede variar según la cantidad de funciones disponibles
    SeatNumber: generateSeatNumber(),
    UserID : faker.number.int({ min: 1, max: 1000 }),
    PurchaseDate: faker.date.recent().toString(),
});

// Generar 100 registros de boletos
const tickets = Array.from({ length: 1000 }, (_, index) => generateTicket(index + 1));

// Guardar los datos en un archivo JSON
writeFileSync(filePath, JSON.stringify(tickets, null, 2));

console.log('1000 boletos generados y guardados en data/tickets.json exitosamente!');
