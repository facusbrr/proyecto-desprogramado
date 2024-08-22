import { pool } from "../../../config/db.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../../../utils/jwt.js";

export const registerUser = async (userData) => {
  const { nombre, apellido, email, password } = userData;
  if (!nombre || !email || !apellido || !password)
    return console.error("Los campos son obligatorio");
  let connection;
  try {
    const hashPassword = await bcrypt.hash(password, 6);
    connection = await pool.getConnection() 
    const [result] = await connection.query(
      "INSERT INTO users (nombre, apellido, email, password) VALUES (?, ?, ?, ?)",
      [nombre, apellido, email, hashPassword]
    );
    connection.release();
    const user = { id: result.insertId, nombre, apellido, email };
    const token = generarToken(user);
    return { user, token };
  } catch (err) {
    console.error("Error al registrar el usuario", err.message);
    throw new Error("Error al registrar");
  } finally {
    if(connection) connection.release();
  }
};

export const loginUser = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password){
    console.error("Los campos son obligatorios");
    return;
  } 

  
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      email
    );

    if(rows.length === 0) {
      console.log('No existe el usuario');
      return;
    }
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.error("Sus datos son incorrectos");
    }

    const token = generarToken(user);
    return {user, token};
  } catch (err) {
    console.error("Error al inciar sesión", err.message);
    throw new Error("No se pudo iniciar sesión");
  } finally {
    if(connection) connection.release();
  }
};
