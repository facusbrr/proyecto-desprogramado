import { pool } from '../../../config/db.js'
import bcrypt from 'bcryptjs'
import { generarToken } from '../../../utils/jwt.js'

export const registerUser = async (userData) => {
  const { name, last_name, username, email, password } = userData
  if (!name || !email || !username || !last_name || !password)
    return console.error('Los campos son obligatorio')
  try {
    const hashPassword = await bcrypt.hash(password, 6)
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      'INSERT INTO admins (name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, last_name, username, email, hashPassword]
    )
    connection.release()
    const user = { id: result.insertId, name, last_name, username, email }
    const token = generarToken(user)
    return { user, token }
  } catch (err) {
    console.error('Error al registrar el usuario', err.message)
    throw new Error('Error al registrar')
  } finally {
    if (connection) connection.release()
  }
}

export const loginUser = async (loginData) => {
  const { username, password } = loginData
  if (!username || !password) {
    console.error('Los campos son obligatorios')
    return
  }
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.query(
      'SELECT * FROM admins WHERE username = ?',
      username
    )

    if (rows.length === 0) {
      console.log('No existe el usuario')
      return
    }
    const user = rows[0]

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.error('Sus datos son incorrectos')
    }

    const token = generarToken(user)
    return { user, token }
  } catch (err) {
    console.error('Error al inciar sesión', err.message)
    throw new Error('No se pudo iniciar sesión')
  } finally {
    if (connection) connection.release()
  }
}
