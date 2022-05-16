const { Comment, Telescope, Oculaire, Monture } = require('../db/sequelize');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

// FIND ALL COMMENT FOR ONE PRODUCT 
exports.findProductComment = (req, res, next) => {
    Comment.findAndCountAll({ where: { productId: req.params.productId } })
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
    let Category;
    if (req.body.category === 'telescope') {
        Category = Telescope;
    } else if (req.body.category === 'oculaire') {
        Category = Oculaire;      
    } else if (req.body.category === 'monture') {
        Category = Monture;
    };
    
    Category.findOne({ where: {productId : req.body.productId} })
    .then(product => {
        if (product === null) {
            const message = 'Aucun produit ne correspond à l\'id.';
            return res.status(404).json({ message });
        } else {
                const comment = new Comment({
                    productCat: req.body.category,
                    productId: req.body.productId,
                    commentId: v4(),
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