const mongoose = require('mongoose');

// const { performance } = require('perf_hooks');

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


// const vow = performance.now();

// console.log(`DB Execution ${vow}`);

module.exports = connectDB;