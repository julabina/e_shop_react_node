const { Op } = require('sequelize');
const { Product, Category } = require('../db/sequelize');

exports.searchProducts = (req, res, next) => {
    Category.hasMany(Product, { foreignKey: "categoryId" });
    Product.belongsTo(Category);
    const query = req.query.query;

    Product.findAndCountAll({
        include: {
            model: Category
        },
        where: {
            name: {
                [Op.like] : `%${query}%`
            }
        },
    })
        .then(({count, rows}) => {
            console.log(rows)
            res.status(200).json({ count,rows })
        })
    };
    
exports.searchProductsFiltered = (req, res, next) => {
    Category.hasMany(Product, { foreignKey: "categoryId" });
    Product.belongsTo(Category);
    const query = req.query.query;

    let categoriesQuery = [];

    if(req.body.categories === undefined) {
        categoriesQuery = ["telescope", "oculaire", "monture"];
    } else if(req.body.categories.length === 0) {
        categoriesQuery = ["telescope", "oculaire", "monture"];
    } else {
        for (let i = 0; i < req.body.categories.length; i++) {
            if(req.body.categories[i] === "telescope" || req.body.categories[i] === "oculaire" || req.body.categories[i] === "monture") {
                categoriesQuery.push(req.body.categories[i]);
            }
        }
    }

    let options;

    if (req.body.onStock === true) {
        options = {
            name: {
                [Op.like] : `%${query}%`
            },
            stock: {
                [Op.ne]: 0
            }
        }
    } else {
        options = {
            name: {
                [Op.like] : `%${query}%`
            }
        }   
    } 

    Product.findAndCountAll({
        where : options,
        include: {
            model: Category,
            where: {
                name : categoriesQuery
            }
        },
    })
        .then(({count, rows}) => {
            res.status(200).json({ count,rows })
        })
};