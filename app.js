const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const squadRouter = require('./router/squads');
const userRouter = require('./router/user');
const routesRouter = require('./router/routes');
const clientRouter = require('./router/client');
const multer = require('multer');

mongoose.set("strictQuery", false);

require('dotenv').config();

const authRouter = require('./router/auth');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@woliday.vteeobu.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB');
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 6000000000
    }
}));
app.use('/auth', authRouter);
app.use('/client', express.static(process.cwd() + "/client"));

app.use((req,res,next)=>{
    if(!(req.session.id && req.cookies.userId)){
        res.redirect('https://woliday-0yt9.onrender.com/client/login.html')
    }
    next();
})

app.use('/', clientRouter);
app.use('/squad', squadRouter);
app.use('/user', userRouter);
app.use('/route',routesRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
