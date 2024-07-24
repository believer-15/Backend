const { findUser } = require('../repositories/userRepository');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.plainPassword;

    // 1. Check if there is registered user.

    const user = await findUser({ email });

    console.log(user.password);

    if(!user){
        throw{ message: "No, user is found", statusCode: 404};
    }

    // 2. If user is found we need to compare incoming password with hashedPass

    const isPasswordValidated = bcrypt.compare(plainPassword, user.password);

    // console.log(isPasswordValidated);


    if(!isPasswordValidated){
        throw{ message: "Invalid password, please try again", statusCode: 401 };
    }

    // if the password is validated, create the token and return it

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // console.log(token);

    return token;

}

module.exports = {
    loginUser
}