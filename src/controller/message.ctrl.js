const MessageDAO = require('../dao/MongoMessageManager');
const { statusMessage, nameMessage } = require('../helper/statusMessage');
const CustomErrors = require('../lib/errors');

const messageDAO = new MessageDAO()

const createMessages = async (req, res) => {

    const { message } = req.body

    try {

        const showMessage = await messageDAO.createMessage(req.user._id, message)

        if(!showMessage) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Message field is empty. Please complete", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json(showMessage)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const getAllMessages = async (req, res) => {

    try {

        const messages = await messageDAO.getMessages()

        return res.status(statusMessage.OK).json(messages)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

module.exports = {
    createMessages,
    getAllMessages
}