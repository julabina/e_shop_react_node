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

exports.getOrders = (req, res, next) => {
    Order.findAll({
        where: {
            userId : req.params.id
        }
    })
        .then(orders => {
            if(orders !== null) {
                const message = "La liste des commandes a bien été récupérée.";
                return res.status(200).json({ message, data: orders })
            }
            const message = "Aucune commande trouvée.";
            return res.status(404).json({ message })
        })
        .catch(error => res.status(500).json({ error }))
};