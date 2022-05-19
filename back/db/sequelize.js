const { Sequelize, DataTypes } = require('sequelize');
const TelescopeModel = require('../models/telescope');
const OculaireModel = require('../models/oculaire');
const MontureModel = require('../models/monture');
const CommentModel = require('../models/comment');
const UserModel = require('../models/user');
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

const initDb = () => {
    return sequelize.sync({force: true}).then(() => {
        data.telescopes.map(el => {
            Telescope.create({
                name: el.name,
                productId: el.productId,
                type: el.type,
                brand: el.brand,
                pictures: el.pictures,
                diameter: el.diameter,
                focal: el.focal,
                fd: el.fd,
                mount: el.mount,
                price: el.price,
                stock: el.stock,
                description1: el.description1,
                description2: el.description2,
                description3: el.description3,
                descriptionPicture: el.descriptionPicture,
                promo: el.promo,
                promoValue: el.promoValue
            })
        })

        data.oculaires.map(el => {
            Oculaire.create({
                name: el.name,
                productId: el.productId,
                brand: el.brand,
                model: el.model,
                focal: el.focal,
                coulant: el.coulant,
                fov: el.fov,
                eyeRelief: el.eyeRelief,
                pictures: el.pictures,
                price: el.price,
                stock: el.stock,
                description1: el.description1,
                description2: el.description2,
                description3: el.description3,
                descriptionPicture: el.descriptionPicture,
                promo: el.promo,
                promoValue: el.promoValue
            })
        })

        data.montures.map(el => {
            Monture.create({
                name: el.name,
                productId: el.productId,
                type: el.type,
                brand: el.brand,
                capacity: el.capacity,
                goTo: el.goTo,
                pictures: el.pictures,
                price: el.price,
                stock: el.stock,
                description1: el.description1,
                description2: el.description2,
                description3: el.description3,
                descriptionPicture: el.descriptionPicture,
                promo: el.promo,
                promoValue: el.promoValue
            })
        })
    })
}

const Telescope = TelescopeModel(sequelize, DataTypes);
const Oculaire = OculaireModel(sequelize, DataTypes);
const Monture = MontureModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

module.exports= {
    Telescope, Oculaire, Monture, Comment, User, initDb
}