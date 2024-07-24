const express = require('express');

// const bodyParser = require('body-parser');

const ServerConfig = require('./config/serverConfig');

const connectDB = require('./config/dbConfig');

const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');


const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));


//Routing middleware
app.use('/users', userRouter); // connects the router to the server 
app.use('/carts', cartRouter);
app.use('/auth', authRouter);


app.post('/pong', (req, res) => {
    console.log(req.body);
    return res.json({Message: "Success"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Port started at ${ServerConfig.PORT}`);
})

// localhost:3000 -> socket address
