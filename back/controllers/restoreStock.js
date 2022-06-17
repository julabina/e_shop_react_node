const { Product } = require('../db/sequelize');


exports.stockRestore = (req, res, next) => {

    Product.findAll()
        .then(products => {
                    
                for (let i = 0; i < products.length; i++) {
                    const stock = products[i].realStock;
                    products[i].stock = stock
                    products[i].save()                            
                }  
                                                
            return res.status(200).json({ message: "Stock restauré." })
          
        })  
        .catch(error => res.status(500).json({ error }))
};