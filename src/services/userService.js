const { findUser, createUser } = require("../repositories/userRepository");
const { createCart } = require("../repositories/cartRepository");


    async function registerUser(userDetails){
        console.log("Hitting Service Layer");
        //It'll create brand new user

        // 1. we need to check if the user with this email and mobile number already exist or not

        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if(user){
            // we found the user
            throw { reason: 'User with given mobile number already exist', statusCode: 400 }
        }
            // 2. if not then create the user in the database 

        const newUser = await createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        }); 

        if(!newUser){
            throw {reason : 'Something went wrong, cannot create user', statusCode: 500}
        }

        await createCart(newUser._id);

        // 3. return th details of created user

        return newUser;
        
    }
    // const vow = performance.now();

    // console.log(`User Execution ${vow}`);

module.exports = {
    registerUser
}