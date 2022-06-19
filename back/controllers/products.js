const { Op } = require("sequelize");
const {Product, ProductAttribute, Brand, Category, TelescopeType, OculaireCollection, MountType,} = require("../db/sequelize");

/**
 * GET ALL TELESCOPES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findAllTelescope = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  Product.findAll({
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: TelescopeType,
        },
      },
      {
        model: Category,
        where: {
            name: "telescope",
        },
      },
    ],
  })
        .then((data) => {
            const message = "La liste des telescopes a bien été récupéré.";
            res.status(200).json({ message, data });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

/**
 * GET ALL OCULAIRES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findAllOculaire = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  OculaireCollection.hasMany(ProductAttribute, {foreignKey: "oculaireModelId"});
  ProductAttribute.belongsTo(OculaireCollection);

  Product.findAll({
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: OculaireCollection,
        },
      },
      {
        model: Category,
        where: {
            name: "oculaire",
        },
      },
    ],
  })
    .then((data) => {
        const message = "La liste des oculaires a bien été récupéré.";
        res.status(200).json({ message, data });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

/**
 * GET ALL MONTURES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findAllMonture = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  MountType.hasMany(ProductAttribute, { foreignKey: "mountTypeId" });
  ProductAttribute.belongsTo(MountType);

  Product.findAll({
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: MountType,
        },
      },
      {
        model: Category,
        where: {
            name: "monture",
        },
      },
    ],
  })
    .then((data) => {
        const message = "La liste des montures a bien été récupéré.";
        res.status(200).json({ message, data });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

/**
 * GET ONE TELESCOPE PRODUCT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findOneTelescope = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  Product.findByPk(req.params.id, {
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: TelescopeType,
        },
      },
      {
        model: Category,
        where: {
            name: "telescope",
        },
      },
    ],
  })
    .then((telescope) => {
        const message = "Un telescope a bien été trouvé.";
        res.status(200).json({ message, data: telescope });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

/**
 * GET ONE OCULAIRE PRODUCT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findOneOculaire = (req, res, next) => {
    
  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  OculaireCollection.hasMany(ProductAttribute, {foreignKey: "oculaireModelId"});
  ProductAttribute.belongsTo(OculaireCollection);

  Product.findByPk(req.params.id, {
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: OculaireCollection,
        },
      },
      {
        model: Category,
        where: {
            name: "oculaire",
        },
      },
    ],
  })
    .then((oculaire) => {
        const message = "Un oculaire a bien été trouvé.";
        res.status(200).json({ message, data: oculaire });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

/**
 * GET ONE MONTURE PRODUCT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findOneMonture = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  MountType.hasMany(ProductAttribute, { foreignKey: "mountTypeId" });
  ProductAttribute.belongsTo(MountType);

  Product.findByPk(req.params.id, {
    include: [
      {
        model: ProductAttribute,
        include: {
            model: Brand,
        },
      },
      {
        model: ProductAttribute,
        include: {
            model: MountType,
        },
      },
      {
        model: Category,
        where: {
            name: "monture",
        },
      },
    ],
  })
    .then((monture) => {
        const message = "Une monture a bien été trouvée.";
        res.status(200).json({ message, data: monture });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

/**
 * GET ALL PROMOTION PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findPromo = (req, res, next) => {

    Category.hasMany(Product, { foreignKey: "categoryId" });
    Product.belongsTo(Category);

    let catArr = [], includeOption;

    if(req.body.telescope) {
        catArr.push("telescope")
    }
    if(req.body.oculaire) {
        catArr.push("oculaire")
    }
    if(req.body.monture) {
        catArr.push("monture")
    }

    if (catArr.length !== 0) {
        includeOption = {
            model: Category,
            where: {
                name : catArr
            }      
        }
    } else {
        includeOption = {
            model: Category,
            where: {
                name : ["telescope", "oculaire", "monture"]
            }      
        }
    }

    let options;

    if (req.body.onStock === true) {
        options = {
            promo: true,
            stock: {
            [Op.ne]: 0
            }
        }
    } else {
        options = {
            promo: true,
        }   
    } 

    Product.findAll({
        include: includeOption,
        where: options,
    })
        .then((promo) => {
            const message = "La liste des promotions a bien été trouvé.";
            res.status(200).json({ message, data: promo });
        })
        .catch((error) => res.status(500).json({ error }));
};

/**
 * GET FILTERED TELESCOPES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findFilteredTelescopes = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  let brandQuery = [], typeQuery = [];

  if (req.body.brand === undefined) {
        brandQuery = ["Sky-Watcher", "Takahashi", "Celestron", "Unistellar"];
  } else if (req.body.brand.length === 0) {
        brandQuery = ["Sky-Watcher", "Takahashi", "Celestron", "Unistellar"];
  } else {
        for (let i = 0; i < req.body.brand.length; i++) {
            if(req.body.brand[i] === "Sky-Watcher" || req.body.brand[i] === "Takahashi" || req.body.brand[i] === "Celestron" || req.body.brand[i] === "Unistellar") {
                brandQuery.push(req.body.brand[i]);
            }
        }
  }
  
  if(req.body.type === undefined) {
      typeQuery = [
      "lunette achromatique",
      "lunette apochromatique",
      "telescope Schmidt-Cassegrain",
      "telescope Newton",
      "telescope Maksutov",
      "telescope  edge HD",
      ];
  } else if(req.body.type.length === 0) {
      typeQuery = [
      "lunette achromatique",
      "lunette apochromatique",
      "telescope Schmidt-Cassegrain",
      "telescope Newton",
      "telescope Maksutov",
      "telescope  edge HD",
      ];
  } else {
      for(let i = 0; i < req.body.type.length; i++) {
          if(req.body.type[i] === "lunette achromatique" || req.body.type[i] === "lunette apochromatique" || req.body.type[i] === "telescope Schmidt-Cassegrain" || req.body.type[i] === "telescope Newton" || req.body.type[i] === "telescope Maksutov" || req.body.type[i] === "telescope  edge HD") {
            typeQuery.push(req.body.type[i])
         }
      }
  }

  Brand.findAll({
    where: {
        name: brandQuery,
    },
    attributes: ["id"],
    raw: true,
  })
    .then((brand) => {
        let selectedBrandId = brand.map(el => el.id);
        
        return ProductAttribute.findAll({
            where: {
                    brandId: selectedBrandId,
            },
            attributes: ["productId"],
            raw: true
        })
            .then((brandId) => {
                let brandIdArray = brandId.map((el) => el.productId);

                return TelescopeType.findAll({
                    where: {
                        name: typeQuery,
                    },
                    attributes: ['id'],
                    raw: true
                })
                    .then((typeFilteredId) => {
                        selectedTypeId = typeFilteredId.map((el) => el.id);

                        return ProductAttribute.findAll({
                        where: {
                                telescopeTypeId: selectedTypeId,
                        },
                        attributes: ['productId'],
                        raw: true
                        })
                            .then((typeId) => {
                                const typeIdArray = typeId.map((el) => el.productId);
                               
                                const productIdFiltered = brandIdArray.filter(el => typeIdArray.includes(el));
                                
                                let options;

                                if (req.body.onStock === true) {
                                        options = {
                                            id: productIdFiltered,
                                            stock: {
                                                [Op.ne]: 0
                                            }
                                        }
                                    } else {
                                    options = {
                                        id: productIdFiltered
                                    }   
                                } 

                                return Product.findAndCountAll({
                                    where: options,
                                    include: {
                                        model: Category,
                                        where: {
                                            name: "telescope",
                                        },
                                    },
                                })
                                    .then(({ count, rows }) => {                                       
                                        res.status(200).json({ message: `${count} telescopes trouvées.`, data: rows });
                                    });
                        });
                });
        });
  });
};

/**
 * GET FILTERED OCULAIRES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findFilteredOculaires = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId"});
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  let oculaireModel = undefined, brandQuery = [];

    if (req.body.brand === undefined) {
        brandQuery = ["Sky-Watcher", "TeleVue", "Celestron", "Orion", "Pentax", "Explore Scientific", "Baader"];
    } else if (req.body.brand.length === 0) {
        brandQuery = ["Sky-Watcher", "TeleVue", "Celestron", "Orion", "Pentax", "Explore Scientific", "Baader"];
    } else {
        for (let i = 0; i < req.body.brand.length; i++) {
            if(req.body.brand[i] === "Sky-Watcher" || req.body.brand[i] === "TeleVue" || req.body.brand[i] === "Celestron" || req.body.brand[i] === "Orion" || req.body.brand[i] === "Pentax" || req.body.brand[i] === "Explore Scientific" || req.body.brand[i] === "Baader") {
                brandQuery.push(req.body.brand[i]);
            }
        }
    }


  if(req.body.model !== undefined) {
 
        if (req.body.brand[0] === "Sky-Watcher") {
            if (req.body.model === "Super Plössl") {
                oculaireModel = req.body.model;
            }
        } else if (req.body.brand[0] === "TeleVue") {
            if (req.body.model === "Plössl") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "DeLite") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Ethos") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Nagler") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Delos") {
                oculaireModel = req.body.model;
            }
        } else if (req.body.brand[0] === "Celestron") {
            if (req.body.model === "X-cel") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Luminos") {
                oculaireModel = req.body.model;
            }
        } else if (req.body.brand[0] === "Orion") {
            if (req.body.model === "edge-On") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Lanthanum") {
                oculaireModel = req.body.model;
            }          
        } else if (req.body.brand[0] === "Pentax") {
            if (req.body.model === "XW") {
                oculaireModel = req.body.model;
            }        
        } else if (req.body.brand[0] === "Explore Scientific") {
            if (req.body.model === "68°") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "82°") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "100°") {
                oculaireModel = req.body.model;
            }          
        } else if (req.body.brand[0] === "Baader") {
            if (req.body.model === "Hyperion") {
                oculaireModel = req.body.model;
            }      
        }
  }
 
  Brand.findAll({
    where: {
        name: brandQuery,
    },
    attributes: ['id'],
    raw: true
  })
    .then((brand) => {
        let selectedBrandId = brand.map((el) => el.id);
        
        return ProductAttribute.findAll({
            where: {
                    brandId: selectedBrandId,
            },
            attributes: ['productId'],
            raw: true
        })
            .then((brandId) => {
                let brandIdArray = brandId.map((el) => el.productId);

                let modelOption;
                if(oculaireModel !== undefined) {
                    modelOption = {
                        name : oculaireModel
                    }
                } else {
                    modelOption = {}
                }

                return OculaireCollection.findAll({
                    where: modelOption,
                    attributes: ['id'],
                    raw: true
                })
                    .then((modelFilteredId) => {
                        selectedModelId = modelFilteredId.map((el) => el.id);

                        return ProductAttribute.findAll({
                            where: {
                                    oculaireModelId: selectedModelId,
                            },
                            attributes: ['productId'],
                            raw: true
                        })
                            .then((modelId) => {
                                let modelIdArray = modelId.map((el) => el.productId);
                                
                                let productIdFiltered = brandIdArray.filter(el => modelIdArray.includes(el));

                                let options;

                                if (req.body.onStock === true) {
                                        options = {
                                            id: productIdFiltered,
                                            stock: {
                                                [Op.ne]: 0
                                            }
                                        }
                                    } else {
                                    options = {
                                        id: productIdFiltered
                                    }   
                                } 

                                return Product.findAndCountAll({
                                    where: options,
                                    include: {
                                        model: Category,
                                        where: {
                                            name: "oculaire",
                                        },
                                    },
                                })
                                    .then(({ count, rows }) => {                                       
                                        res.status(200).json({ message: `${count} oculaires trouvées.`, data: rows });
                                    });
                        });
                });
        });
  });
};

/**
 * GET FILTERED MONTURES PRODUCTS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findFilteredMontures = (req, res, next) => {

  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  MountType.hasMany(ProductAttribute, { foreignKey: "mountTypeId" });
  ProductAttribute.belongsTo(MountType);

  let brandQuery = [], typeQuery = [];

  if (req.body.brand === undefined) {
        brandQuery = ["Sky-Watcher", "10Micron", "Celestron", "Orion"];
  } else if (req.body.brand.length === 0) {
        brandQuery = ["Sky-Watcher", "10Micron", "Celestron", "Orion"];
  } else {
        for (let i = 0; i < req.body.brand.length; i++) {
            if(req.body.brand[i] === "Sky-Watcher" || req.body.brand[i] === "10Micron" || req.body.brand[i] === "Celestron" || req.body.brand[i] === "Orion") {
                brandQuery.push(req.body.brand[i]);
            }
        }
  }

if(req.body.type === undefined) {
    typeQuery = ["azimutale", "equatoriale"];
} else if(req.body.type.length === 0) {
    typeQuery = ["azimutale", "equatoriale"];
} else {
    for(let i = 0; i < req.body.type.length; i++) {
        if(req.body.type[i] === "azimutale" || req.body.type[i] === "equatoriale") {
          typeQuery.push(req.body.type[i])
       }
    }
}

  Brand.findAll({
    where: {
        name: brandQuery,
    },
    attributes: ['id'],
    raw: true
  })
    .then((brand) => {
        let selectedBrandId = brand.map((el) => el.id);

        let goToOption;
        if (req.body.goTo === true) {
            goToOption = {
                brandId: selectedBrandId,
                goTo : true
            }
        } else if (req.body.goTo === false) {
            goToOption = {
                brandId: selectedBrandId,
                goTo : false
            }
        } else {
            goToOption = {
                brandId: selectedBrandId,
            }
        }
        
        
        return ProductAttribute.findAll({
            where: goToOption,
            attributes: ['productId']
        })
            .then((brandId) => {
                let brandIdArray = brandId.map((el) => el.productId);

                return MountType.findAll({
                    where: {
                        name: typeQuery,
                    },
                    attributes: ['id'],
                    raw: true
                })
                    .then((typeFilteredId) => {
                        selectedTypeId = typeFilteredId.map((el) => el.id);

                        return ProductAttribute.findAll({
                            where: {
                                    mountTypeId: selectedTypeId,
                            },
                            attributes: ['productId'],
                            raw: true
                        })
                            .then((typeId) => {
                                let typeIdArray = typeId.map((el) => el.productId);
                                
                                let productIdFiltered = brandIdArray.filter(el => typeIdArray.includes(el));

                                let options;

                                if (req.body.onStock === true) {
                                        options = {
                                            id: productIdFiltered,
                                            stock: {
                                                [Op.ne]: 0
                                            }
                                        }
                                    } else {
                                    options = {
                                        id: productIdFiltered
                                    }   
                                } 

                                return Product.findAndCountAll({
                                    where: options,
                                    include: {
                                        model: Category,
                                        where: {
                                            name: "monture",
                                        },
                                    },
                                })
                                    .then(({ count, rows }) => {                                       
                                        res.status(200).json({ message: `${count} montures trouvées.`, data: rows });
                                    });
                        });
                });
        });
  });
};

/**
 * DECREASE STCOK TO ONE PRODUCT 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.removeStock = (req, res, next) => {

    if(req.body.id) {
        req.body.id = null
    }
    if(req.body.categoryId) {
        req.body.categoryId = null
    }
    if(req.body.name) {
        req.body.name = null
    }
    if(req.body.price) {
        req.body.price = null
    }
    if(req.body.realStock) {
        req.body.realStock = null
    }
    if(req.body.pictures) {
        req.body.pictures = null
    }
    if(req.body.desciption1) {
        req.body.desciption1 = null
    }
    if(req.body.description2) {
        req.body.description2 = null
    }
    if(req.body.description3) {
        req.body.description3 = null
    }
    if(req.body.descriptionPicture) {
        req.body.descriptionPicture = null
    }
    if(req.body.promo) {
        req.body.promo = null
    }
    if(req.body.promoValue) {
        req.body.promoValue = null
    }
    
    Product.findByPk(req.params.id)
        .then(product => {
            if(product !== null) {

                let newStock;

                if (req.body.stock > product.stock) {
                    return res.status(401).json({message: "Le stock ne peut pas etre inférieur au stock disponible."});
                } else {
                    newStock = product.stock - req.body.stock;
                }

                return product.update({
                    stock: newStock
                })
                    .then(() => {
                       res.status(200).json({ message : "Le stock a bien été mis à jour.", data: product });
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};