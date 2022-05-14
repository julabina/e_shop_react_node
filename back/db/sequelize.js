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

const Telescope = TelescopeModel(sequelize, DataTypes);
const Oculaire = OculaireModel(sequelize, DataTypes);
const Monture = MontureModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

module.exports= {
    Telescope, Oculaire, Monture, Comment, User
}