const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

sequelize.initDb();

require('./src/routes/findAllTelescope')(app);
require('./src/routes/findOneTelescope')(app);

app.listen(port, () => {
    console.log(`Server start on : http://localhost:${port}`);
});