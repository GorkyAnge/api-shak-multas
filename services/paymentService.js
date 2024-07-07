const axios = require('axios');

const pagarConTarjeta = async (paymentDetails) => {
  return await axios.post('https://fake-paymentportal.onrender.com/api/v1/payment/card', paymentDetails);
};

module.exports = {
  pagarConTarjeta
};
