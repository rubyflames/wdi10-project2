const express = require('express');
const restaurantController = require('../controllers/restaurant');

const router = express.Router();

router.get('/', restaurantController.getAll)

module.exports = router
