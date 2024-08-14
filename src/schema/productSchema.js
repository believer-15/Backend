const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    productName : {
        type: String,
        required: [true, "Product Name is required."],
        minLength: [5, "Product name must be at least 5 Character."],
        trim: true
    },
    description: {
        type: String,
        minLength: [5, "Product Description must be at least 5 characters."]
    },
    productImage: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 10
    },
    price: {
        type: Number,
        required: [true, "Product price is required."]
    },
    category: {
        type: String,
        enum: ['veg','non-veg','drinks', 'sides'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock status is required."],
        default: true
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;