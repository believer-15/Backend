const express = require('express');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const { performance } = require('perf_hooks');

// const bodyParser = require('body-parser');

const ServerConfig = require('./config/serverConfig');

const connectDB = require('./config/dbConfig');

const cloudinary = require('./config/cloudinaryConfig');

const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middleware/multerMiddleware');

const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoutes');


const app = express();


app.use(cors({
    origin: 'https://pizzaw.netlify.app',
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));



//Routing middleware
app.use('/users', userRouter); // connects the router to the server 
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);





app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({Message: "Pong"});
});

app.post('/photo', uploader.single('IncomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({ message: 'ok'})
});


app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Port started at ${ServerConfig.PORT}`);
})




// Performance Checkpoint

const start = performance.now();
console.log(`Execution start time: ${start}ms`);






// localhost:3000 -> socket address
