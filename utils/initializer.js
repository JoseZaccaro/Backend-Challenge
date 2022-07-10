const User = require('../models/user')
const logger = require('../utils/logger')

exports.init = async function () {
    if (await User.countDocuments({"username": "test@koibanx.com"})) {
        return
    }

    let user = new User();
    user.username = "test@koibanx.com";
    user.password = "test123";
    await User.create(user);

    let userAdmin = new User();
    userAdmin.username = "test@koibanx.com";
    userAdmin.password = "admin";
    await User.create(userAdmin);

    logger.info("Test User and Admin User created")
}
