const express = require('express');
const controller = require('../controllers/TaskController');

const router = express.Router();

router.post('/', controller.login);

module.exports = router;
