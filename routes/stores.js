const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const dataValidator = require('../config/storeValidator')

const { validateUser } = userControllers = require('../controllers/userControllers')
const { getStores, postOneStore, poblateStores, resetStores } = storeControllers = require('../controllers/storeControllers')

router.route('/stores')
  .get(validateUser, getStores)
  .post(validateUser, dataValidator, postOneStore);

router.route('/seeder')
  .post(validateUser,poblateStores)
  .delete(validateUser,resetStores)

module.exports = router;
