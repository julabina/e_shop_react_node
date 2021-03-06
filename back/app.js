const express = require('express');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const commentRoute = require('./routes/comment');
const productsRoute = require('./routes/products');
const orderRoute = require('./routes/order');
const searchRoute = require('./routes/search');
const contactRoute = require('./routes/contact');
const { initDb } = require('./db/sequelize');
const { restoreStock } = require('./cron/cron-restore');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(morgan('dev'));

/* initDb(); */
restoreStock();

app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', orderRoute);
app.use('/api/search', searchRoute);
app.use('/api/contact', contactRoute);
app.use('/img', express.static('assets'));


module.exports = app;