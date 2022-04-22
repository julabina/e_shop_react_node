const { Sequelize } = require("sequelize");
const ProductModel = require('../models/product');
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

const Product = ProductModel(sequelize, DataTypes);

module.exports = {
    Product
}