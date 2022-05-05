const { Op } = require('sequelize');
const { Oculaire } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/oculaires', (req, res) => {
        if (req.query.search) {
            const search = req.query.search;

            if (search.length < 2) {
                const message = 'Le terme de la recherche doit contenir au moin 2 caractères.';
                return res.status(400).json({ message })
            }

            return Oculaire.findAndCountAll({where : {
                    name: {
                        [Op.like] : `%${search}%`
                    }
                },
                order: ['name']
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} oculaires qui correspondent à la recherche.`;
                res.json({message, data: rows})
            })
        }







        Oculaire.findAll()
        .then(oculaire => {
            const message = 'La liste des oculaires a bien été récupérée.';
            res.json({ message, data: oculaire })
        })
    })
}