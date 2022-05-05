const { Op } = require('sequelize');
const { Monture } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/montures', (req, res) => {

        if (req.query.search) {
            const search = req.query.search;

            if (search.length < 2) {
                const message = 'Le terme de la recherche doit contenir au moin 2 caractères.';
                return res.status(400).json({ message })
            }

            return Monture.findAndCountAll({where : {
                    name: {
                        [Op.like] : `%${search}%`
                    }
                },
                order: ['name']
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} montures qui correspondent à la recherche.`;
                res.json({message, data: rows})
            })
        }






        Monture.findAll()
        .then(monture => {
            const message = 'La liste des montures a bien été récupérée.';
            res.json({ message, data: monture })
        })
    })
}