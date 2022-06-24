const cron = require('node-cron');
const { Product } = require('../db/sequelize');

const restoreStock = () => {

    cron.schedule('* * * * 0,3', () => {
       
       Product.findAll()
       .then(products => {
           
           for (let i = 0; i < products.length; i++) {
               const stock = products[i].realStock;
               products[i].stock = stock
               products[i].save()                            
            }  
            
            return console.log('Stock restoré.');
        })  
        .catch(error => console.error(error));
        
    });

};


module.exports = { restoreStock };
