const { Product, ProductAttribute, Brand, Category, TelescopeType, OculaireCollection, MountType } = require('../db/sequelize');

exports.findAllTelescope = (req, res, next) => {
    
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    TelescopeType.hasMany(ProductAttribute, {foreignKey: 'telescopeTypeId'})
    ProductAttribute.belongsTo(TelescopeType);
    

    Product.findAll({
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand,
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: TelescopeType,
                }
            }, 
            {
                model: Category,
                where : {
                    name: "telescope"
                }
            } 
        ]        
    })
    .then(data => {
        const message = "La liste des telescopes a bien été récupéré."
        res.status(200).json({message, data})
    })
    .catch(error => {
        res.status(500).json({error})
    })
};

exports.findAllOculaire = (req, res, next) => {
       
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    OculaireCollection.hasMany(ProductAttribute, {foreignKey: 'oculaireModelId'})
    ProductAttribute.belongsTo(OculaireCollection);
    

    Product.findAll({
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: OculaireCollection
                }
            }, 
            {
                model: Category,
                where : {
                    name: "oculaire"
                }
            } 
        ]        
    })
    .then(data => {
        const message = "La liste des oculaires a bien été récupéré."
        res.status(200).json({message, data})
    })
    .catch(error => {
        res.status(500).json({error})
    }) 
};

exports.findAllMonture = (req, res, next) => {
    
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    MountType.hasMany(ProductAttribute, {foreignKey: 'mountTypeId'})
    ProductAttribute.belongsTo(MountType);
    

    Product.findAll({
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: MountType
                }
            }, 
            {
                model: Category,
                where : {
                    name: "monture"
                }
            } 
        ]        
    })
    .then(data => {
        const message = "La liste des montures a bien été récupéré."
        res.status(200).json({message, data})
    })
    .catch(error => {
        res.status(500).json({error})
    })
};

exports.findOneTelescope = (req, res, next) => {
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    TelescopeType.hasMany(ProductAttribute, {foreignKey: 'telescopeTypeId'})
    ProductAttribute.belongsTo(TelescopeType);

    Product.findByPk(req.params.id, {
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand,
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: TelescopeType,
                }
            }, 
            {
                model: Category,
                where : {
                    name: "telescope"
                }
            } 
        ]        
    })
    .then(telescope => {
        const message = "Un telescope a bien été trouvé."
        res.status(200).json({message, data: telescope})
    })
    .catch(error => {
        res.status(500).json({error})
    })
};

exports.findOneOculaire = (req, res, next) => {

    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    OculaireCollection.hasMany(ProductAttribute, {foreignKey: 'oculaireModelId'})
    ProductAttribute.belongsTo(OculaireCollection);
    

    Product.findByPk(req.params.id, {
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: OculaireCollection
                }
            }, 
            {
                model: Category,
                where : {
                    name: "oculaire"
                }
            } 
        ]        
    })
    .then(oculaire => {
        const message = "Un oculaire a bien été trouvé."
        res.status(200).json({message, data: oculaire})
    })
    .catch(error => {
        res.status(500).json({error})
    })
};

exports.findOneMonture = (req, res, next) => {
   
    Product.hasMany(ProductAttribute, {foreignKey: 'productId'});
    ProductAttribute.belongsTo(Product);
    Category.hasMany(Product, {foreignKey: 'categoryId'})
    Product.belongsTo(Category);
    Brand.hasMany(ProductAttribute, {foreignKey: 'brandId'})
    ProductAttribute.belongsTo(Brand);
    MountType.hasMany(ProductAttribute, {foreignKey: 'mountTypeId'})
    ProductAttribute.belongsTo(MountType);
    

    Product.findByPk(req.params.id, {
        include : [
            {
                model: ProductAttribute,
                include: {
                    model: Brand
                }
            }, 
            {
                model: ProductAttribute,
                include: {
                    model: MountType
                }
            }, 
            {
                model: Category,
                where : {
                    name: "monture"
                }
            } 
        ]        
    })
    .then(monture => {
        const message = "Une monture a bien été trouvé."
        res.status(200).json({message, data: monture})
    })
    .catch(error => {
        res.status(500).json({error})
    })
};