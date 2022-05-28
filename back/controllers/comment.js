const { Comment, Product } = require('../db/sequelize');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

// FIND ALL COMMENT FOR ONE PRODUCT 
exports.findProductComment = (req, res, next) => {
    Comment.findAndCountAll({ where: { productId: req.params.id } })
        .then(({count, rows}) => {
            if (count === 0) {
                const message = 'Aucun commentaire trouvé pour ce produit.';
                return res.status(404).json({ message });
            }
            const message = `${count} commentaires ont bien été trouvée.`;
            res.status(200).json({ message, data: rows })
        })
        .catch(error => res.status(500).json({ error }))
};

// ADD COMMENT 
exports.addComment = (req, res, next) => {
    
    
    Product.findOne({ where: {id : req.body.productId} })
    .then(product => {
        if (product === null) {
            const message = 'Aucun produit ne correspond à l\'id.';
            return res.status(404).json({ message });
        } else {
                const comment = new Comment({
                    productCat: req.body.category,
                    productId: req.body.productId,
                    id: v4(),
                    userId: req.body.userId,
                    comment: req.body.comment
                });
                comment.save()
                    .then(() => {
                        const message = 'Commentaire bien créé.';
                        res.status(201).json({ message });
                    })
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }))
};

// MODIFY ONE COMMENT
exports.modifyComment = (req, res, next) => {

};

// DELETE ONE COMMENT
exports.deleteComment = (req, res, next) => {

};