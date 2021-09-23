const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const IndexRoute = require('./routes/auth');
const app = express();

dotenv.config({ path: './config/.env' });
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 8000;

//ejs engine
app.set('view engine', 'ejs');

//middlewares
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
}

//session
app.use(session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
}));

//flash
app.use(flash());

//global vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.use('/', IndexRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));