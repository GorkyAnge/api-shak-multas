const express = require('express');
const router = express.Router();
const multaController = require('../controllers/multaController');

router.post('/', multaController.crearMulta);
router.post('/pagar', multaController.pagarMulta);
router.get('/:id', multaController.obtenerMultas);

module.exports = router;
