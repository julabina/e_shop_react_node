const { Oculaire } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/oculaires/:id', (req, res) => {
        Oculaire.findByPk(req.params.id)
        .then(oculaire => {
            if(oculaire !== null) {
                const message = 'Un oculaire a bien été trouvé.';
                res.json({ message, data: oculaire })
            } else {
                const message = 'Aucun oculaire ne correspond à l\'id.';
                res.status(404).json({ message })
            }
        })
    })
}