const { Comment, Telescope, Oculaire, Monture } = require('../db/sequelize');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');


exports.findComment = (req, res, next) => {

};

exports.addComment = (req, res, next) => {
    let Category;
    if (req.body.category === 'telescope') {
        Category = Telescope;
    } else if (req.body.category === 'oculaire') {
        Category = Oculaire;      
    } else if (req.body.category === 'monture') {
        Category = Monture;
    };

    const comment = new Comment({
        productCat: req.body.category,
        productId: req.body.productId,
        commentId: v4(),
        userId: req.body.userId,
        comment: req.body.comment
    });
    Category.findOne({ where: {productId : req.body.productId} })
        .then(product => {
            if (product === null) {
                const message = 'Aucun produit ne correspond à l\'id.';
                return res.status(404).json({ message });
            } else {
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

exports.modifyComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};