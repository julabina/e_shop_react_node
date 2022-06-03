const { Sequelize, DataTypes } = require('sequelize');
const TelescopeModel = require('../models/telescope');
const OculaireModel = require('../models/oculaire');
const MontureModel = require('../models/monture');
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
        
    })
}

const Telescope = TelescopeModel(sequelize, DataTypes);
const Oculaire = OculaireModel(sequelize, DataTypes);
const Monture = MontureModel(sequelize, DataTypes);
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

module.exports= {
    Telescope, Oculaire, Monture, Comment, User, Product, Order, ProductAttribute, Category, Brand, OculaireCollection, TelescopeType, MountType, initDb
}