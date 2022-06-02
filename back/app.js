const express = require('express');
const morgan = require('morgan');
const telescopeRoute = require('./routes/telescope');
const oculaireRoute = require('./routes/oculaire');
const montureRoute = require('./routes/monture');
const userRoute = require('./routes/user');
const commentRoute = require('./routes/comment');
const productsRoute = require('./routes/products');
const orderRoute = require('./routes/order');
const searchRoute = require('./routes/search');
const { initDb } = require('./db/sequelize');

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

app.use('/api/telescopes', telescopeRoute);
app.use('/api/oculaires', oculaireRoute);
app.use('/api/montures', montureRoute);
app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', orderRoute);
app.use('/api/search', searchRoute);


module.exports = app;