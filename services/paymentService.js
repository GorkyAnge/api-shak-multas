const axios = require("axios");

const pagarConTarjeta = async (paymentDetails) => {
  return await axios.post(
    "https://api-fake-paymentportal-cbea796d6f87.herokuapp.com/api/v1/payment/card",
    paymentDetails
  );
};

module.exports = {
  pagarConTarjeta,
};
