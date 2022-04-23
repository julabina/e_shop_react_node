const { Telescope } = require("../db/sequelize")

module.exports = (app) => {
    app.get('/api/telescopes/:id', (req, res) => {
        Telescope.findByPk(req.params.id)
        .then(telescope => {
            if(telescope !== null) {
                const message = 'Un téléscope a bien été trouvé.'
                res.json({message, data: telescope })
            } else {
                const message = 'Aucun téléscope ne correspond à l\'id'
                res.status(404).json({message})
            }
        })
    })
}