const { Monture } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/montures', (req, res) => {
        Monture.findAll()
        .then(monture => {
            const message = 'La liste des montures a bien été récupérée.';
            res.json({ message, data: monture })
        })
    })
}