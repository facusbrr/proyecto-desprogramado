import pool from "../../../config/db.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../../../utils/jwt.js";

const registrarUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password)
    return console.error("Los campos son obligatorio");
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const [result] = pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    );
    const user = { id: result.insertId, name, email };
    const token = generarToken(user);
    return { user, token };
  } catch (err) {
    console.error("Error al registrar el usuario", err.message);
    throw new Error("Error al registrar");
  }
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password) return console.error("Los campos son obligatorios");
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      email
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.error("Sus datos son incorrectos");
    }
  } catch (err) {
    console.error("Error al inciar sesión", err.message);
    throw new Error("No se pudo iniciar sesión");
  }
};
