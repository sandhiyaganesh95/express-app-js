const express = require('express');
const UserController = require('../controller/user');
const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findUser);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
