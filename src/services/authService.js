const { findUser } = require('../repositories/userRepository');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. Check if there is registered user.

    const user = await findUser({ email });


    if(!user){
        throw { message: "No, user is found with the given email", statusCode: 404 };
    }

    // 2. If user is found we need to compare incoming password with hashedPass

    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);


    if(!isPasswordValidated){
        throw{ message: "Invalid password, please try again", statusCode: 401 };
    }

    const userRole = user.role ? user.role : "USER";
    // if the password is validated, create the token and return it

    const token = jwt.sign({ email: user.email, id: user._id, role: userRole }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    return {token, userRole, userData: {
        email: user.email,
        firstName: user.firstName,
    }};

}
// const vow = performance.now();

// console.log(`Auth Execution ${vow}`);

module.exports = {
    loginUser
}