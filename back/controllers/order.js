const { Order } = require('../db/sequelize');
const { v4 } = require('uuid');

exports.createOrder = (req, res, next) => {
    console.log(req.body.products);
    const order = new Order({
        id: v4(),
        userId:  req.body.userId,
        order: req.body.order,
        products: req.body.products,
        status: 'En préparation'
    });
    order.save()
        .then(() => {
            const message = 'Commande bien créée.';
            res.status(201).json({ message });
        })
        .catch(error => res.status(401).json({ error }));

};