const { Product, ProductAttribute, Brand } = require('../db/sequelize');

exports.findAllTelescope = (req, res, next) => {
    
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    ProductAttribute.hasMany(Brand, {foreignKey: 'brandId'})
    

    Product.findAll({include : [
        {model: ProductAttribute},  
    ]

    })
    .then(data => {
        res.status(200).json({data})
    })
    .catch(error => {
        res.status(500).json({error})
    })
}