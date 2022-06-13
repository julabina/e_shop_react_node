const { Order } = require('../db/sequelize');
const { v4 } = require('uuid');

exports.createOrder = (req, res, next) => {
    let instruction, deliveryInformation;

    if(req.body.instruction === "" || req.body.instruction === undefined) {
        instruction = null
    } else {
        instruction = req.body.instruction;
    }
    if(req.body.deliveryInformation === "" || req.body.deliveryInformation === undefined) {
        deliveryInformation = null
    } else {
        deliveryInformation = req.body.deliveryInformation;
    }

    const order = new Order({
        id: v4(),
        userId:  req.body.userId,
        order: req.body.order,
        products: req.body.products,
        count: req.body.count,
        names: req.body.names,
        status: 'En préparation',
        instruction: instruction,
        deliveryInformation: deliveryInformation
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