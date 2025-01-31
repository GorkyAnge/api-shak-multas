const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Agrega cors
const multasRoutes = require("./routes/multas");

const app = express();

// Habilita CORS para cualquier origen
app.use(cors()); // Esto permite solicitudes desde cualquier origen

app.use(bodyParser.json());

app.use("/multas", multasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
