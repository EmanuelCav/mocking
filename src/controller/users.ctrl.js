const passport = require('passport');
const MongoUserManager = require('../dao/MongoUserManager');
const { statusMessage, nameMessage } = require('../helper/statusMessage');
const CustomErrors = require('../lib/errors');

const userManager = new MongoUserManager()

const users = async (req, res) => {

    try {

        const result = await userManager.getUsers()

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const login = passport.authenticate('login', {
    failureRedirect: '/login',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

const register = passport.authenticate('register', {
    failureRedirect: '/register',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

module.exports = {
    users,
    login,
    register
}