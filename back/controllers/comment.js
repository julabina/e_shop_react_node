const { Comment, Product, User } = require('../db/sequelize');
const { v4 } = require('uuid');
const { ValidationError, UniqueConstraintError } = require('sequelize');

/**
 * FIND ALL COMMENT FOR ONE PRODUCT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findProductComment = (req, res, next) => {

    Comment.findAndCountAll({ where: { productId: req.params.id } })
        .then(({count, rows}) => {
            if (count === 0) {
                const message = 'Aucun commentaire trouvé pour ce produit.';
                return res.status(404).json({ message });
            }
            const message = `${count} commentaires ont bien été trouvés.`;
            res.status(200).json({ message, data: rows });
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * ADD COMMENT 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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
        .catch(error => res.status(500).json({ error }));
};

/**
 * MODIFY ONE COMMENT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifyComment = (req, res, next) => {

    const comment = {comment: req.body.comment}

    Comment.update(comment, {
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            return User.findOne({ where: { userId : req.body.userId }})
                .then(user => {
                if(user !== null) {
                    const message = 'Commentaire bien modifié.';
                    res.status(200).json({ message });
                } else {
                    const message = 'Aucun commentaire trouvé.';
                    res.status(404).json({ message });
                }
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                res.status(500).json({ error });
            } )
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error});
            }
            res.status(500).json({ error });
        })
};

/**
 * DELETE ONE COMMENT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteComment = (req, res, next) => {

    Comment.findByPk(req.params.id)
        .then(comment => {
            if(comment === null) {
                const message = "Aucun commentaire trouvé.";
                return res.status(404).json({ message });
            }
            Comment.destroy({
                where: {id : comment.id}
            })
                .then(() => {
                    const message = "Le commentaire a bien été supprimé";
                    res.json({ message });
                })
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};