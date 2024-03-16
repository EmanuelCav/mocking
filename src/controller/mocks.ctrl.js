const { statusMessage, nameMessage } = require('../helper/statusMessage');
const CustomErrors = require('../lib/errors');

const { generateProducts } = require('../lib/mocks');

const mocks = async (req, res) => {

    try {

        let products = []

        for (let i = 0; i < 100; i++) {
            products.push(generateProducts())
        }

        return res.status(statusMessage.OK).json(products)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

module.exports = {
    mocks
}