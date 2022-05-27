const { Product, ProductAttribute, Brand } = require('../db/sequelize');

exports.findAllTelescope = (req, res, next) => {
    
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    

    Product.findAll({
        include : [
        {
            model: ProductAttribute,
            include: {
                model: Brand
            }
        },  
    ]

    })
    .then(data => {
        res.status(200).json({data})
    })
    .catch(error => {
        res.status(500).json({error})
    })
}