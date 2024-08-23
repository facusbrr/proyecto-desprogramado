const mp = new MercadoPago("APP_USR-68ba3ec3-be35-472a-a6a3-0bffca141fe3", {
  locale: "es-AR",
});

document
  .getElementById("mercadopago-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        title: "wolve",
        quantity: 1,
        price: 2500,
      };

      const response = await fetch(
        "http://localhost:3000/payment/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const preference = await response.json();

      if (preference.id) {
        createCheckoutButton(preference.id);
      } else {
        console.error(
          "No se recibió un preferenceId en la respuesta del servidor"
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

const createCheckoutButton = async (preferenceId) => {
  const bricksBuilder = mp.bricks();

  try {
    // Desmontar el botón existente si está presente
    if (window.checkoutButton) {
      window.checkoutButton.unmount();
    }

    // Crear el nuevo botón de pago
    window.checkoutButton = await bricksBuilder.create(
      "wallet",
      "wallet_container",
      {
        initialization: {
          preferenceId: preferenceId,
        },
        onSubmit: (event) => {
          // Maneja el evento de envío aquí
          console.log("Formulario enviado", event);
        },
      }
    );
  } catch (error) {
    console.error("Error al crear el botón de pago:", error.message);
  }
};
