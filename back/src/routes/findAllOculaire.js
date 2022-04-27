const oculaire = require('../models/oculaire');
const { Oculaire } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/oculaires', (req, res) => {
        Oculaire.findAll()
        .then(oculaire => {
            const message = 'La liste des oculaires a bien été récupérée.';
            res.json({ message, data: oculaire })
        })
    })
}