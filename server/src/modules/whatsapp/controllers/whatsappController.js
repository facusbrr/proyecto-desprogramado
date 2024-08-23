import { sendMessage } from "../services/whatsappServices";

export const sendWpsMessage = async (req, res) => {
  const { nombre, ticket, comprobante } = req.body;
  if (!nombre || !ticket || !comprobante) {
    console.error("");
  }
};
