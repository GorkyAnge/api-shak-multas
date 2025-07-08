const db = require("../config/firebase");
const paymentService = require("../services/paymentService");
const { cifrarPayload } = require("../services/encryptionService");

const crearMulta = async (req, res) => {
  try {
    const { id, valor, descripcion } = req.body;
    const fecha = new Date().toISOString();
    const multaRef = db.collection("multas").doc();
    await multaRef.set({ id, valor, descripcion, fecha, pagada: false });
    res
      .status(201)
      .send({ id: multaRef.id, mensaje: "Multa creada con éxito" });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al crear la multa", error });
  }
};

const pagarMulta = async (req, res) => {
  try {
    const { multaId, paymentDetails } = req.body;
    const multaRef = db.collection("multas").doc(multaId);
    const multaDoc = await multaRef.get();

    if (!multaDoc.exists) {
      return res.status(404).send({ mensaje: "Multa no encontrada" });
    }

    const multa = multaDoc.data();

    if (multa.pagada) {
      return res.status(400).send({ mensaje: "La multa ya está pagada" });
    }

    const response = await paymentService.pagarConTarjeta(paymentDetails);

    if (response.status === 200) {
      await multaRef.update({ pagada: true });
      res.send({
        mensaje: "Pago realizado con éxito",
        response: response.data,
      });
    } else {
      res
        .status(400)
        .send({ mensaje: "Error en el pago", response: response.data });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al pagar la multa", error });
  }
};

const obtenerMultas = async (req, res) => {
  try {
    const { id } = req.params;
    const multasSnapshot = await db
      .collection("multas")
      .where("id", "==", id)
      .get();
    const multas = [];

    multasSnapshot.forEach((doc) => {
      multas.push({
        id: doc.id,
        identifier: doc.data().id, // Cambiamos 'id' a 'identifier'
        descripcion: doc.data().descripcion,
        fecha: doc.data().fecha,
        valor: doc.data().valor,
        pagada: doc.data().pagada,
      });
    });

    res.send(multas);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener las multas", error });
  }
};

const verificarMultas = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar multas sin pagar (pagada: false)
    const multasSnapshot = await db
      .collection("multas")
      .where("id", "==", id)
      .where("pagada", "==", false)
      .limit(1) // Solo necesitamos saber si existe al menos una sin pagar
      .get();

    const tieneMultasSinPagar = !multasSnapshot.empty;

    // Preparar el payload a cifrar
    const payload = {
      id,
      tieneMultasSinPagar,
      mensaje: tieneMultasSinPagar
        ? "El usuario tiene multas sin pagar"
        : "El usuario no tiene multas pendientes",
      timestamp: new Date().toISOString(),
    };

    // Cifrar el payload usando KMS
    const payloadCifrado = await cifrarPayload(payload);

    res.send({
      encrypted: true,
      data: payloadCifrado,
    });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al verificar las multas", error });
  }
};

module.exports = {
  crearMulta,
  pagarMulta,
  obtenerMultas,
  verificarMultas,
};
