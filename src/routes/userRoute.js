const express = require('express');
const { createUser } = require('../controllers/userController');


// we have  to initialize a router object to add routes in a new file
const userRouter = express.Router();

userRouter.post('/', createUser); // this is a route registration.

module.exports = userRouter; // exporting the router