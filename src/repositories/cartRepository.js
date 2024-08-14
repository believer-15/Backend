const cart = require('../schema/cartSchema');
const InternalServerError = require('../utils/internalServerError');


async function createCart(userId) {
    try {
        const newCart = await cart.create({
            user: userId,
        });
        return newCart;
    } catch(error) {
        if(error.name === 'ValidationError') {

            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }  
        console.log(error);
        throw new InternalServerError();
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await cart.findOne({
            user: userId
        }).populate('items.product');
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCartByUserId
}