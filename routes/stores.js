const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();

const { validateUser } = userControllers = require('../controllers/userControllers')
const { getStores, postOneStore } = storeControllers = require('../controllers/storeControllers')


router.route('/stores')
  .get(validateUser, getStores)
  .post(validateUser, postOneStore)


module.exports = router;
