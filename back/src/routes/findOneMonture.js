const { Monture } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/monture/:id', (req, res) => {
        Monture.findByPk(req.params.id)
        .then(monture => {
            if(monture !== null) {
                const message = 'Une monture a bien été trouvée.';
                res.json({ message, data: monture })
            } else {
                const message = 'Aucune monture ne correspond à l\'id.';
                res.status(404).json({ message })
            }
        })
    })
}