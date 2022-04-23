const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb();

require('./src/routes/findAllTelescope')(app);
require('./src/routes/findOneTelescope')(app);

app.listen(port, () => {
    console.log(`Server start on : http://localhost:${port}`);
});