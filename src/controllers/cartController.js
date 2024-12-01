const { getCart, modifyCart, clearProductsFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res){
    try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successful fetch the cart",
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function modifyProductToCart(req, res){
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");
        return res.status(200).json({
            success: true,
            message: "Successful added product to the cart",
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function clearCartById(req, res) {
    try {
        const cart = await clearProductsFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successful cleared all products from the cart",
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}