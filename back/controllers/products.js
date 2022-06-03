const { Op } = require("sequelize");
const {Product, ProductAttribute, Brand, Category, TelescopeType, OculaireCollection, MountType,} = require("../db/sequelize");

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
        const message = "Une monture a bien été trouvé.";
        res.status(200).json({ message, data: monture });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

exports.findPromo = (req, res, next) => {
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);

  Product.findAll({
    include: {
        model: Category,
    },
    where: {
        promo: true,
    },
  })
    .then((promo) => {
        const message = "La liste des promotions a bien été trouvé.";
        res.status(200).json({ message, data: promo });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.findFilteredTelescopes = (req, res, next) => {
  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  if (req.body.brand !== "Sky-Watcher" && req.body.brand !== "Takahashi" && req.body.brand !== "Celestron" && req.body.brand !== "Unistellar") {
        req.body.brand = ["Sky-Watcher", "Takahashi", "Celestron", "Unistellar"];
  }
  if (req.body.type !== "lunette achromatique" && req.body.type !== "lunette apochromatique" && req.body.type !== "telescope Schmidt-Cassegrain" && req.body.type !== "telescope Newton" && req.body.type !== "telescope Maksutov" && req.body.type !== "telescope  edge HD") {
        req.body.type = [
        "lunette achromatique",
        "lunette apochromatique",
        "telescope Schmidt-Cassegrain",
        "telescope Newton",
        "telescope Maksutov",
        "telescope  edge HD",
        ];
  }

  Brand.findAll({
    where: {
        name: req.body.brand,
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
                        name: req.body.type,
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

exports.findFilteredOculaires = (req, res, next) => {
  Product.hasMany(ProductAttribute, { foreignKey: "productId"});
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  TelescopeType.hasMany(ProductAttribute, { foreignKey: "telescopeTypeId" });
  ProductAttribute.belongsTo(TelescopeType);

  let oculaireModel = undefined;

    if (req.body.brand === "Sky-Watcher" || req.body.brand === "TeleVue" || req.body.brand === "Celestron" || req.body.brand === "Orion" || req.body.brand === "Pentax" || req.body.brand === "Explore Scientific" || req.body.brand === "Baader") { 
        if (req.body.brand === "Sky-Watcher") {
            if (req.body.model === "Super Plössl") {
                oculaireModel = req.body.model;
            }
        } else if (req.body.brand === "TeleVue") {
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
        } else if (req.body.brand === "Celestron") {
            if (req.body.model === "X-cel") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Luminos") {
                oculaireModel = req.body.model;
            }
        } else if (req.body.brand === "Orion") {
            if (req.body.model === "edge-On") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "Lanthanum") {
                oculaireModel = req.body.model;
            }          
        } else if (req.body.brand === "Pentax") {
            if (req.body.model === "XW") {
                oculaireModel = req.body.model;
            }        
        } else if (req.body.brand === "Explore Scientific") {
            if (req.body.model === "68°") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "82°") {
                oculaireModel = req.body.model;
            } else if (req.body.model === "100°") {
                oculaireModel = req.body.model;
            }          
        } else if (req.body.brand === "Baader") {
            if (req.body.model === "Hyperion") {
                oculaireModel = req.body.model;
            }      
        }
    } else {
        req.body.brand = ["Sky-Watcher", "TeleVue", "Celestron", "Orion", "Pentax", "Explore Scientific", "Baader"];
    }

  Brand.findAll({
    where: {
        name: req.body.brand,
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
                console.log(modelOption);

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

exports.findFilteredMontures = (req, res, next) => {
  Product.hasMany(ProductAttribute, { foreignKey: "productId" });
  ProductAttribute.belongsTo(Product);
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  Brand.hasMany(ProductAttribute, { foreignKey: "brandId" });
  ProductAttribute.belongsTo(Brand);
  MountType.hasMany(ProductAttribute, { foreignKey: "mountTypeId" });
  ProductAttribute.belongsTo(MountType);
    console.log(req.body.brand);
    if (req.body.brand !== "Sky-Watcher" && req.body.brand !== "10Micron" && req.body.brand !== "Celestron" && req.body.brand !== "Orion") {
        req.body.brand = ["Sky-Watcher", "10Micron", "Celestron", "Orion"];
    }
    if (req.body.type !== "azimutale" && req.body.type !== "equatoriale") {
        req.body.type = ["azimutale", "equatoriale"];
    }
    console.log(req.body.brand);

  Brand.findAll({
    where: {
        name: req.body.brand,
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
                        name: req.body.type,
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
