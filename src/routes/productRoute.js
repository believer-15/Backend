const express = require('express');
const { addProduct, deleteProduct, getProduct } = require('../controllers/productController');
const uploader = require('../middleware/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');



const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn,
    isAdmin,
    uploader.single('productImage'), 
    addProduct
);
productRouter.get('/:id', getProduct);
productRouter.get('/', getProduct);
productRouter.delete('/:id', deleteProduct);


module.exports = productRouter;