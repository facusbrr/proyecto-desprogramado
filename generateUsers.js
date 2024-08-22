import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import path from 'path';

// Ruta al archivo JSON generado;
const filePath = path.resolve('data', 'users.json');

let userId = 1;//Inicializa el id en 1;

// Función para generar un usuario falso;
const generateUser = () => ({
    id: userId++,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password:faker.internet.password({ length: 60 }),
    birthDate: faker.date.birthdate(50, new Date()).toISOString().split('T')[0],
});

// Generar 1000 usuarios
const users = Array.from({ length: 1000 }, generateUser);

// Guardar los datos en un archivo JSON
writeFileSync(filePath, JSON.stringify(users, null, 2));

console.log('1000 usuarios generados y guardados en data/users.json exitosamente!');
