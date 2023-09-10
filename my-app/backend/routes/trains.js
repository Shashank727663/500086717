const express = require('express');
const { listTrains,getTrainByName  } = require('../controllers/trainscontroller')
const router = express.Router();

router.route('/').get(listTrains);
router.route('/:trainNumber').get(getTrainByName);

module.exports = router;