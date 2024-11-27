const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){
    // 1. we should check if ana image is coming to create the product, then we should first upload it on cloudinary.
    // console.log("Hitting product service");
    const imagePath = productDetails.imagePath;
    console.log(imagePath);
    if(imagePath){
        try {
            console.log("Hello from Try");
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;  
            await fs.unlink(process.cwd() + "/" + imagePath);
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
        
    }

    // 2. then use the url from cloudinary and other product details to add product in db.

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });
    
    return product;
    
}

async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId);
    if(!response){
        throw new NotFoundError('Product');
    }
    return response;
}

async function getAllProductsData(){
    const response = await ProductRepository.getAllProducts();
    if(!response){
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);
    if(!response){
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    getAllProductsData,
    deleteProductById
}