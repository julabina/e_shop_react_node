const { Sequelize, DataTypes } = require('sequelize');
const CommentModel = require('../models/comment');
const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const ProductAttributeModel = require('../models/products_attribute');
const CategoryModel = require('../models/category');
const BrandModel = require('../models/brand');
const OculaireModelModel = require('../models/oculaireModel');
const TelescopeTypeModel = require('../models/telescopeType');
const MountTypeModel = require('../models/mountType');
const OrderTypeModel = require('../models/order');
const RestoreStockModel = require('../models/restoreStock');
const data = require('../db/mock-products');

/**
 * CONNECT TO DB
 */
const sequelize = new Sequelize(
    'react-Eshop',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        port: 3306,
        dialectOptions: {
            timezone: 'Etc/GMT-2',
            socketPath: '/opt/lampp/var/mysql/mysql.sock'
        },
        logging: false
    }
)

/**
 * FIRST INIT DB
 * CAREFULL
 * THE DATABASE WILL BE RESET
 */
const initDb = () => {
    return sequelize.sync({force: true}).then(() => {

        data.categories.map(el => {
            Category.create({
                id: el.id,
                name: el.name
            })
        })

        data.brands.map(el => {
            Brand.create({
                id: el.id,
                name: el.name
            })
        })

        data.oculaireModel.map(el => {
            OculaireCollection.create({
                id: el.id,
                name: el.name
            })
        })

        data.telescopeType.map(el => {
            TelescopeType.create({
                id: el.id,
                name: el.name
            })
        })

        data.mountType.map(el => {
            MountType.create({
                id: el.id,
                name: el.name
            })
        })

        data.products.map(el => {
            Product.create({
                id: el.id,
                categoryId: el.categoryId,
                name: el.name,
                pictures: el.pictures,
                price: el.price,
                stock: el.stock,
                realStock: el.stock,
                description1: el.description1,
                description2: el.description2,
                description3: el.description3,
                descriptionPicture: el.descriptionPicture,
                promo: el.promo,
                promoValue: el.promoValue
            })
        })

        data.productsAttributes.map(el => {
            ProductAttribute.create({
                productId : el.productId,
                telescopeTypeId: el.telescopeTypeId,
                brandId: el.brandId,
                mountTypeId: el.mountTypeId,
                capacity: el.capacity,
                goTo: el.goTo,
                oculaireModelId : el.oculaireModelId,
                coulant: el.coulant,
                fov: el.fov,
                eyeRelief: el.eyeRelief,
                diameter: el.diameter,
                focal: el.focal,
                fd: el. fd,
                mount: el.mount
            })
        })
        
        data.restoreStock.map(el => {
            RestoreStock.create({
                id: el.id
            })
        })
    })
}

const Comment = CommentModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const ProductAttribute = ProductAttributeModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Brand = BrandModel(sequelize, DataTypes);
const OculaireCollection = OculaireModelModel(sequelize, DataTypes);
const TelescopeType = TelescopeTypeModel(sequelize, DataTypes);
const MountType = MountTypeModel(sequelize, DataTypes);
const Order = OrderTypeModel(sequelize, DataTypes);
const RestoreStock = RestoreStockModel(sequelize, DataTypes);

module.exports= {
    Comment, User, Product, Order, ProductAttribute, Category, Brand, OculaireCollection, TelescopeType, MountType, RestoreStock, initDb
};