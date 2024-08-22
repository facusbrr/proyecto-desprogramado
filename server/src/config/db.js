import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
//Maneja multiples conexiones simultaneamente
export const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 1000,
});

//Obtener una conexión con el pool
export default async function connectionDB() {
  let connection
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la base de datos" + " " + connection.threadId); // Id único para cada conexión
    return connection;
  } catch (err) {
    console.error("No se conecto a la base de datos", err.stack);
    throw err;
  } finally {
    if(connection) connection.release();
  }
}
