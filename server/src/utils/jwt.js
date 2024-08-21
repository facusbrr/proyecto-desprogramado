import jwt from "jsonwebtoken";

// Generación del Token JWT
export const generarToken = (user) => {
  try {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    console.error("Error al generar el token: ", err);
    throw new Error("No se pudo generar el token");
  }
};

// Validación del Token JWT
export const vericarToken = (token) => {
  return jwt.verify(process.env.JWT_SECRET);
};
