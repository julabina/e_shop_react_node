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

const initDb = () => {
    return sequelize.sync({force: true}).then(() => {
        data.telescopes.map(el => {
            Telescope.create({
                name: el.name,
                type: el.type,
                pictures: el.pictures,
                diameter: el.diameter,
                focal: el.focal,
                fd: el.fd,
                mount: el.mount,
                price: el.price,
                stock: el.price,
                stock: el.stock,
                description1: el.description1,
                description2: el.description2,
                description3: el.description3,
                descriptionPicture: el.descriptionPicture,
                promo: el.promo,
                promoValue: 0
            })
        })
    })
}

module.exports = {
    Telescope, Comment, initDb
}