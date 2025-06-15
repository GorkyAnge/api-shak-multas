require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Agrega cors
const multasRoutes = require("./routes/multas");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Habilita CORS para cualquier origen
app.use(cors()); // Esto permite solicitudes desde cualquier origen

app.use(bodyParser.json());
// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de multas protegidas
app.use("/multas", authMiddleware, multasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
