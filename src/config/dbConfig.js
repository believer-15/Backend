const mongoose = require('mongoose');

const serverConfig = require('./serverConfig')

async function connectDB(){
    try{
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully Connected");
    } catch (error){
        console.log("Not Connected DB Server");
        console.log(error);
    }
}

module.exports = connectDB;