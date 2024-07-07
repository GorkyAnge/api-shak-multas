const express = require('express');
const bodyParser = require('body-parser');
const multasRoutes = require('./routes/multas');

const app = express();
app.use(bodyParser.json());

app.use('/multas', multasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
