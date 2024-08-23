document.addEventListener('DOMContentLoaded', function () {
  const creditRadio = document.getElementById('credit')
  const debitRadio = document.getElementById('debit')
  const mercadopagoRadio = document.getElementById('mercadopago')
  const creditCardDetails = document.getElementById('credit-card-details')
  const mercadopagoButton = document.getElementById('mercadopago-button')

  function togglePaymentDetails() {
    if (creditRadio.checked || debitRadio.checked) {
      creditCardDetails.style.display = 'block'
      mercadopagoButton.style.display = 'none'
    } else if (mercadopagoRadio.checked) {
      creditCardDetails.style.display = 'none'
      mercadopagoButton.style.display = 'block'
    }
  }

  creditRadio.addEventListener('change', togglePaymentDetails)
  debitRadio.addEventListener('change', togglePaymentDetails)
  mercadopagoRadio.addEventListener('change', togglePaymentDetails)

  // Initial call to set the correct display on page load
  togglePaymentDetails()
})
