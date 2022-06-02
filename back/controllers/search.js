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