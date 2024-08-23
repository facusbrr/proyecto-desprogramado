import { readFileSync } from 'fs';
import { resolve } from 'path';

export const readData = (filePath) => {
  try {
    const data = readFileSync(resolve(__dirname, filePath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return null;
  }
};
