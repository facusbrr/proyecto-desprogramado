import { readData } from "../../utils/fileUtils";
import { sendTicketDetails } from "../services/twilioService";

const processTicket = async () => {
  const data = readData("src/data/ventas.json");

  if (data) {
    const {
      customer_phonenumber,
      customer_name,
      customer_lastname,
      customer_dni,
    } = data.usuario;
    const { seat_number, total_price, payment_method } = data.ticket;

    const movieTitle = "Avengers: Endgame"; // Asegúrate de tener este dato
    const paymentReceipt = "https://example.com/receipt/12345"; // Asegúrate de tener este dato

    await sendTicketDetails(
      customer_phonenumber,
      movieTitle,
      seat_number,
      customer_dni,
      paymentReceipt
    );
  }
};

export default { processTicket };
