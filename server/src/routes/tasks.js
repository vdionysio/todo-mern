const express = require('express');
const controller = require('../controllers/TaskController');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.create);
router.get('/', validateJWT, controller.getAll);

module.exports = router;
