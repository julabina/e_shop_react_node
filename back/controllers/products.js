const { Product, ProductAttribute, Brand } = require('../db/sequelize');

exports.findAllTelescope = (req, res, next) => {
    /* 
    Product.hasMany(ProductAttribute, {foreignKey: 'ProductId'});
    ProductAttribute.belongsTo(Product); */
    Product.belongsToMany(ProductAttribute, {through: "ProductProductAttribute", foreignKey: 'ProductId'});
    ProductAttribute.belongsToMany(Product, {through: "ProductProductAttribute", foreignKey: 'ProductId'})
    Brand.belongsToMany(ProductAttribute, {through: "ProductAttributeBrand"})
z
    Product.findAll({include : [
        {model: ProductAttribute}
    ]})
    .then(data => {
        res.status(200).json({data})
    })
    .catch(error => {
        res.status(500).json({error})
    })
}