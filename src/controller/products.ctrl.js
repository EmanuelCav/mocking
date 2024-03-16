const MongoProductManager = require('../dao/MongoProductManager');
const { ProductDTO } = require('../dto/product.dto');
const { statusMessage, nameMessage } = require('../helper/statusMessage');
const CustomErrors = require('../lib/errors');

const ProductManager = new MongoProductManager()

const products = async (req, res) => {

    const { limit } = req.query

    try {

        const result = await ProductManager.getProducts(limit)

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const productGet = async (req, res) => {

    const { pid } = req.params

    try {

        const result = await ProductManager.getProductsId(pid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const productCreate = async (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body

    try {

        if (!title || !description || !code || !price || !stock || !category) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "There are empty fields. Please complete", statusMessage.BAD_REQUEST)
        }

        let routeImages = []

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                routeImages.push(req.files[i].path)
            }
        }

        const result = await ProductManager.createProducts(new ProductDTO({
            title,
            description,
            code,
            price,
            status: status === undefined ? true : status,
            stock,
            category,
            thumbnails: req.files ? routeImages : []
        }))

        return res.status(statusMessage.OK).json({
            message: "Product added successfully",
            product: result
        })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const productUpdate = async (req, res) => {

    const { pid } = req.params

    try {

        const result = await ProductManager.updateProduct(pid, req.body)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.CREATED).json({
            message: "Product updated succesfully",
            product: result
        })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const productDelete = async (req, res) => {

    const { pid } = req.params

    try {

        const result = await ProductManager.removeProduct(pid)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "Product does not exists", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({ message: "Product removed sucessfully" })

    } catch (error) {
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

module.exports = {
    products,
    productGet,
    productCreate,
    productUpdate,
    productDelete
}