const axios = require("axios");

const pagarConTarjeta = async (paymentDetails) => {
  return await axios.post(
    "https://api-fake-paymentportal-production.up.railway.app/api/v1/payment/card",
    paymentDetails
  );
};

module.exports = {
  pagarConTarjeta,
};
