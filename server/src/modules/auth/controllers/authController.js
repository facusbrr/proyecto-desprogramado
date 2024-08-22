import { registerUser, loginUser } from "../services/authServices.js";

export const registerUserController = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    const { user, token } = await registerUser({nombre, apellido, email, password });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({email, password});
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
