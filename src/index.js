const express = require('express');

// const bodyParser = require('body-parser');

const ServerConfig = require('./config/serverConfig');

const connectDB = require('./config/dbConfig');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));


app.post('/pong', (req, res) => {
    console.log(req.body);
    return res.json({Message: "Success"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Port started at ${ServerConfig.PORT}`);
})

// localhost:3000 -> socket address
