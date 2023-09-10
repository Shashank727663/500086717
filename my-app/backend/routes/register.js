const express = require('express');
const { model } = require('mongoose');

const { register , authUser} = require('../controllers/registercontroller');

const router = express.Router();

router.route('/register').post(register)
router.route('/auth').post(authUser);
module.exports= router;
