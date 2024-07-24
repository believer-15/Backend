const express = require('express');
const { login } = require('../controllers/authController');


// we have  to initialize a router object to add routes in a new file
const authRouter = express.Router();

authRouter.post('/login', login); // this is a route registration.

module.exports = authRouter; // exporting the router