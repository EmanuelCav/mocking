const MongoCartManager = require('../dao/MongoCartManager');
const { statusMessage, nameMessage } = require('../helper/statusMessage');
const CustomErrors = require('../lib/errors');

const CartManager = new MongoCartManager()


const createCart = async (req, res) => {

    try {

        const result = await CartManager.createCart(req.user._id)

        return res.status(statusMessage.OK).json({
            message: "Cart added successfully",
            cart: result
        })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const getCart = async (req, res) => {

    const { cid } = req.params

    try {

        const result = await CartManager.getCartById(cid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Cart does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }


}

const addProductCart = async (req, res) => {

    const { quantity } = req.body
    const { cid, pid } = req.params

    try {

        const result = await CartManager.addProduct(quantity, cid, pid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product or cart does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({
            message: "Product added successfully",
            cart: result
        })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const removeProductCart = async (req, res) => {

    const { cid, pid } = req.params

    try {

        const result = await CartManager.removeProductFromCart(cid, pid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product or cart does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({
            message: "Product removed successfully"
        })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const quantityProductCart = async (req, res) => {

    const { cid, pid } = req.params
    const { quantity } = req.body

    try {

        const result = await CartManager.updateQuantityProducts(quantity, cid, pid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product or cart does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.CREATED).json({
            message: "Quantity updated successfully",
            cart: result
        })


    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const removeAllProducts = async (req, res) => {

    const { cid } = req.params

    try {

        const result = CartManager.removeAllProductsFromCart(cid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Cart does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({
            message: "Products removed successfully"
        })


    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const purchaseCart = async (req, res) => {

    const { cid } = req.params

    try {

        const result = CartManager.purchaseCartProducts(cid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Error to generate ticket", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }


}

module.exports = {
    createCart,
    getCart,
    addProductCart,
    removeProductCart,
    quantityProductCart,
    removeAllProducts,
    purchaseCart
}