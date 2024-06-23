const dotenv = require('dotenv');
dotenv.config();


// Here we define the exporting the env variables that the project uses.
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}


// db password : 7pTbmA43jpfi6MeL