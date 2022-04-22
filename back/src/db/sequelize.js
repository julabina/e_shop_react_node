const { Sequelize, DataTypes } = require("sequelize");
const TelescopeModel = require('../models/telescope');
const CommentModel = require('../models/comment');
const data = require('../db/mock-products');

const sequelize = new Sequelize(
    'react-Eshop',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

const Telescope = TelescopeModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

module.exports = {
    Telescope, Comment
}