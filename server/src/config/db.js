import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
//Maneja m+ultiples conexiones simultaneamente
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//Obtener una conexión con el pool
export async function connectionDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a la base de datos" + " " + connection.threadId); // Id único para cada conexión
    return connection;
  } catch (err) {
    console.error("No se conecto a la base de datos", err.stack);
    throw err;
  }
}
