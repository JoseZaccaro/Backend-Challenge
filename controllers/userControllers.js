const User = require('../models/user')
const logger = require('../utils/logger');

const userController = {

    validateUser: async (req, res, next) => {

        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            logger.error("No authorization header")
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }

        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        
        const [username, password] = credentials.split(':');

        const registeredUser = await User.findOne({ username: username});
        const userVerified = registeredUser.verifyPassword(password);
        if (!userVerified) {
            logger.error("Invalid password");
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }
        req.user = {username, password};
        
        next();
    }

}

module.exports = userController;