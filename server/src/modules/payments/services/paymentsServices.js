import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-2211223018269656-082313-38105eba208d59f2821912270e70a31a-1960480678",
});
export const createPreference = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: req.body.quantity,
          unit_price: req.body.price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://93cb-138-121-113-27.ngrok-free.app/success",
        failure: "https://93cb-138-121-113-27.ngrok-free.app/failure",
        pending: "https://93cb-138-121-113-27.ngrok-free.app/pending",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (err) {
    console.error("Fallo al crear la referencia", err.message);
  }
};
