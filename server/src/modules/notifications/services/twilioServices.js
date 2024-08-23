import twilio from 'twilio';
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendTicketDetails = async (phoneNumber, movieTitle, seatNumber, dni, paymentReceipt) => {
  const messageBody = `
    Hola,
    Tu compra de boletos para la película ${movieTitle} ha sido confirmada.
    Asiento: ${seatNumber}
    DNI: ${dni}
    Comprobante de Pago: ${paymentReceipt}
    
    ¡Gracias por tu compra!
  `;

  try {
    await client.messages.create({
      body: messageBody,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${phoneNumber}`
    });
    console.log('Mensaje enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};

export default { sendTicketDetails };
