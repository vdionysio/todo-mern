const express = require('express');
const controller = require('../controllers/UserController');

const router = express.Router();

router.post('/', controller.create);

module.exports = router;
